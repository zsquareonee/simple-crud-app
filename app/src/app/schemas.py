from pydantic import BaseModel

class UserCreate(BaseModel):
  email: str
  name: str
  bio: str
  age: int

class UserEdit(UserCreate):
  id: int

class UserDelete(UserCreate):
  id: int

class UserResponse(UserCreate):
  id: int