import { Trash } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { userContext } from "@/context/userContext"
import { useContext } from "react"
import { deleteUser } from "@/api/actions"

interface DeleteUserDialogProps {
  id: number
}

const DeleteUserDialog = ({ id }: DeleteUserDialogProps) => {

  const { update, setUpdate } = useContext(userContext)!

  const submitAction = async () => {
    const response = await deleteUser(id)
    if (!response) return;
    setUpdate(!update)
  }

  return (
    <>
      <Dialog>
        <DialogTrigger render={<Button variant={"destructive"}><Trash /></Button>} />
        <DialogContent className="sm:max-w-sm">
          <form action={submitAction}>
            <DialogHeader>
              <DialogTitle>¿Are you sure you want to delete this user?</DialogTitle>
              <DialogDescription>
                This change can't be undone
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <DialogClose
                render={
                  <Button type="submit" variant={"destructive"}>Delete user</Button>
                } />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DeleteUserDialog