import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { AlertCircle, Search, X } from "lucide-react"

import { fetchUsers, getErrorMessage } from "@/api/users"
import { Input } from "../ui/input"
import AddTestUsersButton from "./AddTestUsersButton"
import AddUserDialog from "./AddUserDialog"
import UpdateUsersButton from "./UpdateUsersButton"
import UsersGrid from "./UsersGrid"

const UsersSection = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", searchTerm],
    queryFn: () => fetchUsers(searchTerm),
  })

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-9"
            placeholder="Search by name or email..."
            aria-label="Search users"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <AddUserDialog />
          <AddTestUsersButton />
          <UpdateUsersButton />
        </div>
      </div>

      {isError && (
        <div className="flex items-center gap-2 p-4 text-sm text-destructive border border-destructive/20 bg-destructive/10 rounded-lg">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{getErrorMessage(error, "Could not connect to backend service.")}</span>
        </div>
      )}

      <UsersGrid users={users} isLoading={isLoading} />
    </div>
  )
}

export default UsersSection
