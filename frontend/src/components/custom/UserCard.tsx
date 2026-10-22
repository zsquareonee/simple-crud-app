import type { User } from "@/mocks/UserMock"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import user_default from "@/assets/user-default.svg"
import EditUserDialog from "./EditUserDialog"
import DeleteUserDialog from "./DeleteUserDialog"

const UserCard = (Props: User) => {
  return (
    <>
      <Card>
        <CardHeader>
          <Avatar>
            <AvatarImage src={user_default} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <CardTitle>{Props.name} - id#{Props.id}</CardTitle>
          <CardAction className="flex flex-col gap-2">
            <EditUserDialog
              name={Props.name}
              id={Props.id}
              email={Props.email}
              age={Props.age}
              bio={Props.bio} />
            <DeleteUserDialog
              id={Props.id} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Badge>{Props.age} years old</Badge>
            <p>{Props.bio}</p>

          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default UserCard