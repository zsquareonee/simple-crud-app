import { z } from "zod"

export const userFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address (e.g. user@example.com)"),
  age: z
    .number({ message: "Age must be a valid number" })
    .int("Age must be a whole number")
    .min(0, "Age cannot be negative")
    .max(120, "Age must be 120 or less"),
  bio: z
    .string()
    .max(500, "Bio must be 500 characters or fewer"),
})

export type UserFormValues = z.infer<typeof userFormSchema>
