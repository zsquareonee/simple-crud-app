import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Field, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { useContext } from "react"
import { userContext } from "@/context/userContext"
import { PlusIcon } from "lucide-react"
import { createUser } from "@/api/actions"

const AddUserDialog = () => {

  const { update, setUpdate } = useContext(userContext)!

  const submitAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const age = formData.get("age") as unknown as number;
    const bio = formData.get("bio") as string;

    const response = await createUser({ name, email, age, bio })
    if (!response) return;
    setUpdate(!update)
  }

  return (
    <Dialog>
      <DialogTrigger render={<Button type="button">Add user <PlusIcon /></Button>} />
      <DialogContent className="sm:max-w-sm">
        <form action={submitAction}>
          <DialogHeader>
            <DialogTitle>Create a new user</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <div className="flex flex-col sm:flex-row gap-5">
              <Field>
                <Label htmlFor="name-newuser">Name</Label>
                <Input id="name-newuser" name="name" />
              </Field>
              <Field className="sm:w-20">
                <Label htmlFor="age-newuser">Age</Label>
                <Input type="number" min={0} max={120} id="age-newuser" name="age" />
              </Field>
            </div>
            <Field>
              <Label htmlFor="email-newuser">Email</Label>
              <Input id="email-newuser" name="email" />
            </Field>
            <Field>
              <Label htmlFor="bio-newuser">bio</Label>
              <Textarea id="bio-newuser" name="bio" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <DialogClose
              render={
                <Button type="submit">Save changes</Button>
              } />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddUserDialog