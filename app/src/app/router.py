from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import delete, or_, select, update
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import User
from app.schemas import MessageResponse, UserCreate, UserEdit, UserResponse, UserUpdate
from app.testdb import testUsers

router = APIRouter(prefix="/users", tags=["Users"])

DbSession = Annotated[AsyncSession, Depends(get_db)]


@router.get("", response_model=list[UserResponse])
@router.get("/all", response_model=list[UserResponse], include_in_schema=False)
async def get_all_users(
    db: DbSession,
    search: str | None = Query(default=None, description="Filter by name or email"),
):
    query = select(User).order_by(User.id.desc())
    if search:
        search_filter = f"%{search}%"
        query = query.where(
            or_(
                User.name.ilike(search_filter),
                User.email.ilike(search_filter),
            )
        )
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/{id}", response_model=UserResponse)
async def get_user_by_id(id: int, db: DbSession):
    result = await db.execute(select(User).where(User.id == id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {id} not found",
        )
    return user


@router.post("", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
@router.post("/new", response_model=UserResponse, status_code=status.HTTP_201_CREATED, include_in_schema=False)
async def create_new_user(user: UserCreate, db: DbSession):
    db_user = User(
        name=user.name,
        email=user.email,
        age=user.age,
        bio=user.bio,
    )
    db.add(db_user)

    try:
        await db.commit()
        await db.refresh(db_user)
        return db_user
    except IntegrityError:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email is already registered",
        )
    except Exception as exc:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating user: {str(exc)}",
        )


@router.put("/edit", response_model=UserResponse, include_in_schema=False)
async def edit_user_legacy(user: UserEdit, db: DbSession):
    return await update_user_by_id(
        id=user.id,
        user=UserUpdate(name=user.name, email=user.email, age=user.age, bio=user.bio),
        db=db,
    )


@router.put("/{id}", response_model=UserResponse)
async def update_user_by_id(id: int, user: UserUpdate, db: DbSession):
    result = await db.execute(select(User).where(User.id == id))
    existing_user = result.scalar_one_or_none()
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {id} not found",
        )

    update_data = user.model_dump(exclude_unset=True)
    if not update_data:
        return existing_user

    stmt = update(User).where(User.id == id).values(**update_data)

    try:
        await db.execute(stmt)
        await db.commit()
        await db.refresh(existing_user)
        return existing_user
    except IntegrityError:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email is already registered",
        )
    except Exception as exc:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating user: {str(exc)}",
        )


@router.delete("/delete/{id}", response_model=MessageResponse, include_in_schema=False)
async def delete_user_legacy(id: int, db: DbSession):
    return await delete_user_by_id(id=id, db=db)


@router.delete("/{id}", response_model=MessageResponse)
async def delete_user_by_id(id: int, db: DbSession):
    result = await db.execute(delete(User).where(User.id == id))
    if result.rowcount == 0:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {id} not found",
        )

    await db.commit()
    return MessageResponse(message=f"User with id {id} successfully deleted")


@router.post("/testusers", response_model=MessageResponse)
async def create_test_users(db: DbSession):
    inserted_count = 0
    try:
        # Check existing emails to avoid collisions
        existing_result = await db.execute(select(User.email))
        existing_emails = set(existing_result.scalars().all())

        for user_data in testUsers:
            if user_data["email"] not in existing_emails:
                db.add(User(**user_data))
                existing_emails.add(user_data["email"])
                inserted_count += 1

        await db.commit()
        return MessageResponse(
            message=f"{inserted_count} new test users added ({len(testUsers) - inserted_count} skipped as duplicates)"
        )
    except Exception as exc:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to load test users: {str(exc)}",
        )
