import { userContext } from '@/context/userContext'
import { useContext } from 'react'
import { Button } from '../ui/button'
import { RefreshCwIcon } from 'lucide-react'

const UpdateUsersButton = () => {
  const { update, setUpdate } = useContext(userContext)!

  const handleUpdate = () => {
    setUpdate(!update)
  }

  return (
    <Button onClick={handleUpdate}>
      <RefreshCwIcon />
    </Button>
  )
}

export default UpdateUsersButton