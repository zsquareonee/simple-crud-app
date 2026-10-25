# Simple CRUD API

FastAPI backend providing RESTful endpoints to manage users, backed by PostgreSQL and SQLAlchemy 2.0 (asyncpg).

## Requirements

- Python >= 3.12
- [uv](https://docs.astral.sh/uv/) for package management

## Local Setup

1. Install dependencies:
   ```bash
   uv sync
   ```

2. Run local server:
   ```bash
   uv run uvicorn app.main:app --reload --port 8000
   ```

## REST API Endpoints

- `GET /health` - Database connection and service health
- `GET /users` - Retrieve all users (supports optional `?search=` query parameter)
- `GET /users/{id}` - Retrieve user by ID
- `POST /users` - Create a new user (HTTP 201)
- `PUT /users/{id}` - Update an existing user
- `DELETE /users/{id}` - Delete a user by ID
- `POST /users/testusers` - Seed sample test users
