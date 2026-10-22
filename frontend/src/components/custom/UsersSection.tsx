import AddUserDialog from "./AddUserDialog"
import UsersGrid from "./UsersGrid"
import { useContext, useEffect } from "react"
import { userContext } from "@/context/userContext"
import { fetchUsers } from "@/api/actions"
import { Input } from "../ui/input"
import UpdateUsersButton from "./UpdateUsersButton"
import AddTestUsersButton from "./AddTestUsersButton"


const UsersSection = () => {

  const { users, setUsers, update } = useContext(userContext)!

  useEffect(() => {
    fetchUsers(setUsers)
  }, [update])

  return (
    <div className="llcontainer w-full flex flex-col py-5 gap-5">
      <div className="flex gap-2 justify-between">
        <Input className="" placeholder="Search for a user..." />
        <AddUserDialog />
        <AddTestUsersButton />
        <UpdateUsersButton />
      </div>
      <UsersGrid users={users} />
    </div>
  )
}

export default UsersSection