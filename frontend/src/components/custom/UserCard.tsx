import type { User } from "@/types/user"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import user_default from "@/assets/user-default.svg"
import EditUserDialog from "./EditUserDialog"
import DeleteUserDialog from "./DeleteUserDialog"
import { Mail } from "lucide-react"

interface UserCardProps {
  user: User
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Card className="flex flex-col justify-between transition-all hover:shadow-sm">
      <CardHeader>
        <div className="flex items-start gap-3 min-w-0">
          <Avatar>
            <AvatarImage src={user_default} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <CardTitle className="truncate text-base">{user.name}</CardTitle>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5 truncate">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate" title={user.email}>
                {user.email}
              </span>
            </div>
          </div>
        </div>
        <CardAction className="flex items-center gap-1.5">
          <EditUserDialog user={user} />
          <DeleteUserDialog id={user.id} userName={user.name} />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{user.age} years old</Badge>
          <span className="text-xs text-muted-foreground">User #{user.id}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {user.bio || "No biography provided."}
        </p>
      </CardContent>
    </Card>
  )
}

export default UserCard
