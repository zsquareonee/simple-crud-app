import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Loader2, PlusIcon } from "lucide-react"

import { createUser, getErrorMessage } from "@/api/users"
import { userFormSchema, type UserFormValues } from "@/schemas/userSchema"
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

const AddUserDialog = () => {
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
      name: "",
      email: "",
      age: 25,
      bio: "",
    },
  })

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      toast.success(`User "${data.name}" successfully created!`)
      queryClient.invalidateQueries({ queryKey: ["users"] })
      reset()
      setOpen(false)
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to create user. Please try again."))
    },
  })

  const onSubmit = (values: UserFormValues) => {
    mutation.mutate(values)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset()
    }
    setOpen(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button type="button">
            Add user <PlusIcon className="ml-1 h-4 w-4" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create a new user</DialogTitle>
            <DialogDescription>
              Enter the user&apos;s personal details below.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Field className="flex-1">
                <Label htmlFor="add-user-name">Name</Label>
                <Input
                  id="add-user-name"
                  placeholder="e.g. Jane Doe"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                />
                {errors.name?.message && (
                  <FieldError>{errors.name.message}</FieldError>
                )}
              </Field>

              <Field className="sm:w-28">
                <Label htmlFor="add-user-age">Age</Label>
                <Input
                  id="add-user-age"
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
              <Label htmlFor="add-user-email">Email</Label>
              <Input
                id="add-user-email"
                type="email"
                placeholder="jane@example.com"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email?.message && (
                <FieldError>{errors.email.message}</FieldError>
              )}
            </Field>

            <Field>
              <Label htmlFor="add-user-bio">Bio</Label>
              <Textarea
                id="add-user-bio"
                placeholder="Write a brief bio..."
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
                "Save user"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddUserDialog
