from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update, delete, insert
from app.database import get_db
from app.models import User
from app.schemas import UserCreate, UserResponse, UserEdit
from app.testdb import testUsers


from typing import Annotated

router = APIRouter(prefix="/users", tags=["Users"])

dbdep = Annotated[AsyncSession, Depends(get_db)]

@router.get("/all", response_model=list[UserResponse])
async def get_all_users(db: dbdep):
  result = await db.execute(select(User))
  return result.scalars().all()

@router.post("/new", response_model=UserResponse)
async def create_new_user(user: UserCreate, db: dbdep):
  db_user = User(name=user.name, email=user.email, age=user.age, bio=user.bio)
  db.add(db_user)

  try:
    await db.commit()
    await db.refresh(db_user)
    return db_user
  except Exception:
    await db.rollback()
    raise HTTPException(status_code=400, detail="Email already registered")

@router.delete("/delete/{id}", response_model=dict[str, str])
async def delete_user_by_id(id: int, db: dbdep):
  stmt = delete(User).where(User.id == id)
  
  try:
    await db.execute(stmt)
    await db.commit()
    return {
      "message": f"User with id {id} deleted"
    }
  except Exception:
    await db.rollback()
    raise HTTPException(status_code=400, detail="Couldn't delete the user")

@router.put("/edit", response_model=UserResponse)
async def edit_user_by_id(user: UserEdit, db: dbdep):
  stmt= (
    update(User)
    .where(User.id == user.id)
    .values(name=user.name, age=user.age, email=user.email, bio=user.bio)
  )

  try:
    await db.execute(stmt)
    await db.commit()
    return user
  except Exception:
    await db.rollback()
    raise HTTPException(status_code=400, detail="Couldn't update the user")


@router.post("/testusers")
async def create_test_users(db: dbdep):
  users_data = testUsers
  try:
    await db.execute(insert(User), users_data)
    await db.commit()
    return {
      "message": "Test Users loaded" 
    }
  except:
    await db.rollback()
    raise HTTPException(status_code=400, detail="Couldn't load the test users")