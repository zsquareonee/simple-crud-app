import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from typing import Annotated

from app.database import engine, get_db
import app.models as models

from app.router import router

@asynccontextmanager
async def lifespan(app: FastAPI):
    #create the tables
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)
    yield
    await engine.dispose()

app = FastAPI(lifespan=lifespan)

#cors
FRONTEND_URL= os.getenv("FRONTEND_URL", "http://localhost:8080")

origins = [
    "http://localhost:5173",
    FRONTEND_URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/test-db")
async def test_connection(db: Annotated[AsyncSession, Depends(get_db)]):
    # Execute a simple SQL query to verify the connection
    result = await db.execute(text("SELECT 1"))
    return {"message": "Database connected successfully!", "result": result.scalar()}


