import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { RefreshCw } from "lucide-react"
import { toast } from "sonner"

import { Button } from "../ui/button"

const UpdateUsersButton = () => {
  const queryClient = useQueryClient()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.info("User list refreshed")
    } finally {
      setTimeout(() => setIsRefreshing(false), 400)
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleRefresh}
      disabled={isRefreshing}
      title="Refresh user list"
      aria-label="Refresh user list"
    >
      <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
    </Button>
  )
}

export default UpdateUsersButton
