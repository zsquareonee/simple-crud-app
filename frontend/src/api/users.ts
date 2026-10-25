import axios from "axios"
import type { CreateUserInput, UpdateUserInput, User } from "@/types/user"

// Determine base URL: uses VITE_API_URL or defaults to localhost in dev, and /api in production
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:8000" : "/api")

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

export const getErrorMessage = (
  error: unknown,
  fallback = "An unexpected error occurred."
): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.detail || error.message || fallback
  }
  if (error instanceof Error) {
    return error.message
  }
  return fallback
}

export const fetchUsers = async (search?: string): Promise<User[]> => {
  const params = search && search.trim() !== "" ? { search: search.trim() } : {}
  const response = await apiClient.get<User[]>("/users", { params })
  return response.data
}

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${id}`)
  return response.data
}

export const createUser = async (data: CreateUserInput): Promise<User> => {
  const response = await apiClient.post<User>("/users", data)
  return response.data
}

export const updateUser = async (
  id: number,
  data: UpdateUserInput
): Promise<User> => {
  const response = await apiClient.put<User>(`/users/${id}`, data)
  return response.data
}

export const deleteUser = async (id: number): Promise<{ message: string }> => {
  const response = await apiClient.delete<{ message: string }>(`/users/${id}`)
  return response.data
}

export const addTestUsers = async (): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>("/users/testusers")
  return response.data
}
