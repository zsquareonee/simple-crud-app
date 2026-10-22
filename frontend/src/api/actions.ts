import axios from "axios"
import { type User } from "@/mocks/UserMock"
import type { Dispatch, SetStateAction } from "react"

const BASE_URL = import.meta.env.USERS_API || "http://127.0.0.1:8000"

export const fetchUsers = async (setUsers: Dispatch<SetStateAction<User[]>>) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/all`, {
      timeout: 5000
    })
    setUsers(response.data)
    console.log("users fetched: ", response.data)
  } catch (err) {
    console.log(err)
  }
}

interface CreateUserProps {
  name: string,
  email: string,
  age: number,
  bio: string
}

interface editUserProps extends CreateUserProps {
  id: number
}

export const createUser = async ({ name, email, age, bio }: CreateUserProps) => {
  const response = await axios.post(
    `${BASE_URL}/users/new`,
    {
      name: name,
      email: email,
      age: age,
      bio: bio,
    }
  ).catch(err => alert(err.message))
  return response
}

export const editUser = async ({ name, email, age, bio, id }: editUserProps) => {
  const response = await axios.put(
    `${BASE_URL}/users/edit`,
    {
      name: name,
      email: email,
      age: age,
      bio: bio,
      id: id
    }
  ).catch(err => alert(err.message))
  return response
}

export const deleteUser = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}/users/delete/${id}`)
    .catch(err => alert(err))
  return response
}

export const addTestUsers = async () => {
  const response = await axios.post(`${BASE_URL}/users/testusers`)
    .catch(err => alert(err.message))
  return response
}