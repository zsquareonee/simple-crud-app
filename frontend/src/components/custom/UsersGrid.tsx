import UserCard from './UserCard'
import type { User } from '@/mocks/UserMock'

interface UsersGridProps {
  users: User[]
}

const UsersGrid = ({ users }: UsersGridProps) => {

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {users.map(user => (
        <UserCard
          name={user.name}
          id={user.id}
          email={user.email}
          age={user.age}
          bio={user.bio}
          key={user.id} />
      ))}
    </div>
  )
}

export default UsersGrid