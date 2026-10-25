export interface User {
  id: number
  name: string
  email: string
  age: number
  bio: string
  created_at?: string
}

export interface CreateUserInput {
  name: string
  email: string
  age: number
  bio: string
}

export interface UpdateUserInput {
  name?: string
  email?: string
  age?: number
  bio?: string
}
