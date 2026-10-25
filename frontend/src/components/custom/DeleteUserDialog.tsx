import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Loader2, Trash2 } from "lucide-react"

import { deleteUser, getErrorMessage } from "@/api/users"
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

interface DeleteUserDialogProps {
  id: number
  userName: string
}

const DeleteUserDialog = ({ id, userName }: DeleteUserDialogProps) => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      toast.success(`User "${userName}" has been deleted`)
      queryClient.invalidateQueries({ queryKey: ["users"] })
      setOpen(false)
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Could not delete the user."))
    },
  })

  const handleDelete = () => {
    mutation.mutate()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="destructive"
            size="icon"
            aria-label={`Delete ${userName}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{userName}</strong> (ID: #{id})?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Confirm Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteUserDialog
