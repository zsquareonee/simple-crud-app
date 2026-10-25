# Simple CRUD App

A modern full-stack CRUD application built with **FastAPI**, **React 19**, **PostgreSQL**, **Tailwind CSS**, and **Docker**.

## Architecture & Tech Stack

- **Backend**:
  - Python 3.12 + [FastAPI](https://fastapi.tiangolo.com/)
  - [SQLAlchemy 2.0](https://www.sqlalchemy.org/) (Async with asyncpg)
  - [Pydantic v2](https://docs.pydantic.dev/) for data validation & settings management
  - [uv](https://docs.astral.sh/uv/) for high-speed dependency management
- **Frontend**:
  - React 19 + TypeScript + [Vite](https://vite.dev/)
  - [TanStack Query v5](https://tanstack.com/query) for asynchronous data fetching and cache invalidation
  - [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for client-side form validation
  - [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
  - Theme provider with dark/light mode toggle
- **Infrastructure**:
  - Docker Compose with persistent PostgreSQL volume
  - Hardened non-root containers (`USER nonroot` / `USER nginx`)
  - Nginx reverse-proxy and SPA fallback router

## Running with Docker Compose

To spin up the entire stack (PostgreSQL, FastAPI API, and Nginx React frontend):

```bash
docker compose up --build
```

- **Frontend**: [http://localhost:8080](http://localhost:8080)
- **API Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Health Check**: [http://localhost:8000/health](http://localhost:8000/health)

## Local Development

### 1. Database

Start PostgreSQL (e.g. using docker):
```bash
docker run -d --name crud-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=fastapicrud -p 5432:5432 postgres:15-alpine
```

### 2. Backend

```bash
cd app
uv sync
uv run uvicorn app.main:app --reload --port 8000
```

### 3. Frontend

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

App runs on [http://localhost:5173](http://localhost:5173).
