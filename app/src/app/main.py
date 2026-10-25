from contextlib import asynccontextmanager
from typing import Annotated
from fastapi import Depends, FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import engine, get_db
import app.models as models
from app.router import router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure database schema exists
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(
    title="Simple CRUD API",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS configuration
allowed_origins = {
    settings.FRONTEND_URL.rstrip("/"),
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(allowed_origins),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/health", tags=["Health"])
@app.get("/test-db", tags=["Health"], include_in_schema=False)
async def health_check(db: Annotated[AsyncSession, Depends(get_db)]):
    try:
        result = await db.execute(text("SELECT 1"))
        return {
            "status": "healthy",
            "database": "connected",
            "result": result.scalar(),
        }
    except Exception as exc:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(exc),
        }
