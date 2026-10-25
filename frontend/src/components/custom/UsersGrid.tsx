import type { User } from "@/types/user"
import UserCard from "./UserCard"
import { Users } from "lucide-react"

interface UsersGridProps {
  users: User[]
  isLoading?: boolean
}

const UsersGrid = ({ users, isLoading }: UsersGridProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-44 rounded-xl border border-border bg-card/50 p-4 animate-pulse space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted" />
              <div className="space-y-1.5 flex-1">
                <div className="h-4 w-28 bg-muted rounded" />
                <div className="h-3 w-40 bg-muted rounded" />
              </div>
            </div>
            <div className="h-4 w-20 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed rounded-xl border-border bg-card/30">
        <div className="p-3 bg-muted rounded-full text-muted-foreground mb-3">
          <Users className="h-6 w-6" />
        </div>
        <h3 className="font-medium text-base">No users found</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          There are no users matching your search. Try another query or add a new user.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}

export default UsersGrid
