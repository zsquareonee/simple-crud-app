import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Loader2, Pencil } from "lucide-react"

import { getErrorMessage, updateUser } from "@/api/users"
import { userFormSchema, type UserFormValues } from "@/schemas/userSchema"
import type { User } from "@/types/user"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Field, FieldError, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

interface EditUserDialogProps {
  user: User
}

const EditUserDialog = ({ user }: EditUserDialogProps) => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      age: user.age,
      bio: user.bio,
    },
  })

  const mutation = useMutation({
    mutationFn: (values: UserFormValues) => updateUser(user.id, values),
    onSuccess: (updatedUser) => {
      toast.success(`User "${updatedUser.name}" updated!`)
      queryClient.invalidateQueries({ queryKey: ["users"] })
      setOpen(false)
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to update user. Please try again."))
    },
  })

  const onSubmit = (values: UserFormValues) => {
    mutation.mutate(values)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      reset({
        name: user.name,
        email: user.email,
        age: user.age,
        bio: user.bio,
      })
    }
    setOpen(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="outline" size="icon" aria-label={`Edit ${user.name}`}>
            <Pencil className="h-4 w-4" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit User #{user.id}</DialogTitle>
            <DialogDescription>
              Update information for {user.name}. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Field className="flex-1">
                <Label htmlFor={`edit-name-${user.id}`}>Name</Label>
                <Input
                  id={`edit-name-${user.id}`}
                  {...register("name")}
                  aria-invalid={!!errors.name}
                />
                {errors.name?.message && (
                  <FieldError>{errors.name.message}</FieldError>
                )}
              </Field>

              <Field className="sm:w-28">
                <Label htmlFor={`edit-age-${user.id}`}>Age</Label>
                <Input
                  id={`edit-age-${user.id}`}
                  type="number"
                  min={0}
                  max={120}
                  {...register("age", { valueAsNumber: true })}
                  aria-invalid={!!errors.age}
                />
                {errors.age?.message && (
                  <FieldError>{errors.age.message}</FieldError>
                )}
              </Field>
            </div>

            <Field>
              <Label htmlFor={`edit-email-${user.id}`}>Email</Label>
              <Input
                id={`edit-email-${user.id}`}
                type="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email?.message && (
                <FieldError>{errors.email.message}</FieldError>
              )}
            </Field>

            <Field>
              <Label htmlFor={`edit-bio-${user.id}`}>Bio</Label>
              <Textarea
                id={`edit-bio-${user.id}`}
                rows={3}
                {...register("bio")}
                aria-invalid={!!errors.bio}
              />
              {errors.bio?.message && (
                <FieldError>{errors.bio.message}</FieldError>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditUserDialog
