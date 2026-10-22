import { addTestUsers } from "@/api/actions"
import { userContext } from "@/context/userContext"
import { UserPlusIcon } from "lucide-react"
import { useContext } from "react"
import { Button } from "../ui/button"

const AddTestUsersButton = () => {

  const { update, setUpdate } = useContext(userContext)!

  const handleAddTestUsers = async () => {
    const response = await addTestUsers()
    if (!response) return;
    setUpdate(!update)
  }

  return (
    <Button onClick={handleAddTestUsers}>
      Add test Users
      <UserPlusIcon />
    </Button>
  )
}

export default AddTestUsersButton