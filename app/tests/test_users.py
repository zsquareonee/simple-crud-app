import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_health_check(client: AsyncClient):
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"


@pytest.mark.asyncio
async def test_create_and_get_user(client: AsyncClient):
    # 1. Create a user
    payload = {
        "name": "Alice Smith",
        "email": "alice@example.com",
        "age": 28,
        "bio": "Bio for Alice",
    }
    create_res = await client.post("/users", json=payload)
    assert create_res.status_code == 201
    created_user = create_res.json()
    assert created_user["name"] == "Alice Smith"
    assert created_user["email"] == "alice@example.com"
    user_id = created_user["id"]

    # 2. Get user by ID
    get_res = await client.get(f"/users/{user_id}")
    assert get_res.status_code == 200
    assert get_res.json()["name"] == "Alice Smith"

    # 3. Duplicate email returns 409
    dup_res = await client.post("/users", json=payload)
    assert dup_res.status_code == 409


@pytest.mark.asyncio
async def test_get_nonexistent_user_returns_404(client: AsyncClient):
    res = await client.get("/users/999999")
    assert res.status_code == 404
    assert "not found" in res.json()["detail"].lower()


@pytest.mark.asyncio
async def test_update_user(client: AsyncClient):
    # Create user
    create_res = await client.post(
        "/users",
        json={"name": "Bob", "email": "bob@example.com", "age": 30, "bio": "Initial"},
    )
    user_id = create_res.json()["id"]

    # Update user
    update_res = await client.put(
        f"/users/{user_id}",
        json={"name": "Bob Updated", "age": 31},
    )
    assert update_res.status_code == 200
    updated_user = update_res.json()
    assert updated_user["name"] == "Bob Updated"
    assert updated_user["age"] == 31
    assert updated_user["email"] == "bob@example.com"

    # Update non-existent user returns 404
    missing_res = await client.put("/users/99999", json={"name": "Nobody"})
    assert missing_res.status_code == 404


@pytest.mark.asyncio
async def test_delete_user(client: AsyncClient):
    # Create user
    create_res = await client.post(
        "/users",
        json={"name": "Charlie", "email": "charlie@example.com", "age": 40, "bio": "Del"},
    )
    user_id = create_res.json()["id"]

    # Delete user
    del_res = await client.delete(f"/users/{user_id}")
    assert del_res.status_code == 200

    # Delete non-existent user returns 404
    missing_res = await client.delete("/users/99999")
    assert missing_res.status_code == 404


@pytest.mark.asyncio
async def test_search_users(client: AsyncClient):
    await client.post(
        "/users",
        json={"name": "David Miller", "email": "david@corp.com", "age": 22, "bio": ""},
    )
    await client.post(
        "/users",
        json={"name": "Eva Davis", "email": "eva@corp.com", "age": 25, "bio": ""},
    )

    # Search for David
    res = await client.get("/users?search=David")
    assert res.status_code == 200
    users = res.json()
    assert len(users) == 1
    assert users[0]["name"] == "David Miller"

    # Search by email domain
    res_corp = await client.get("/users?search=corp.com")
    assert res_corp.status_code == 200
    assert len(res_corp.json()) == 2


@pytest.mark.asyncio
async def test_seed_test_users(client: AsyncClient):
    res = await client.post("/users/testusers")
    assert res.status_code == 200
    assert "test users" in res.json()["message"].lower()

    # Re-running does not crash, skips duplicates
    res_repeat = await client.post("/users/testusers")
    assert res_repeat.status_code == 200
