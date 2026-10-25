import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Loader2, UserPlus } from "lucide-react"

import { addTestUsers, getErrorMessage } from "@/api/users"
import { Button } from "../ui/button"

const AddTestUsersButton = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: addTestUsers,
    onSuccess: (data) => {
      toast.success(data.message || "Test users added!")
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to load test users."))
    },
  })

  return (
    <Button
      variant="outline"
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
      title="Seed database with sample test users"
    >
      {mutation.isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <UserPlus className="mr-2 h-4 w-4" />
      )}
      Add Test Users
    </Button>
  )
}

export default AddTestUsersButton
