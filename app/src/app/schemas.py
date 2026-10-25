from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Full name")
    email: EmailStr = Field(..., description="Valid email address")
    age: int = Field(..., ge=0, le=120, description="Age in years (0-120)")
    bio: str = Field(default="", max_length=500, description="Bio up to 500 characters")


class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=100)
    email: EmailStr | None = None
    age: int | None = Field(default=None, ge=0, le=120)
    bio: str | None = Field(default=None, max_length=500)


class UserEdit(UserBase):
    id: int


class UserResponse(UserBase):
    id: int
    created_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)


class MessageResponse(BaseModel):
    message: str
