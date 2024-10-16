import React from 'react'
import { User } from '../../../../entities/user/model/types'
import { UserCard } from '../../../../entities/user'

interface UserListProps {
  users: User[]
  favorites: number[]
  onEditUser: (user: User) => void
  onFavoriteChange: (userId: number, isFavorited: boolean) => void
}

const UserList: React.FC<UserListProps> = ({
  users,
  favorites,
  onEditUser,
  onFavoriteChange,
}) => {
  const handleFavoriteChange = (userId: number, isFavorited: boolean) => {
    onFavoriteChange(userId, isFavorited)
  }

  return (
    <>
      {users.map((user) => {
        const isFavorited = favorites.includes(user.id)
        return (
          <UserCard
            key={user.id}
            user={user}
            isFavorited={isFavorited}
            onEdit={() => onEditUser(user)}
            onFavoriteChange={(isFavorited) =>
              handleFavoriteChange(user.id, isFavorited)
            }
          />
        )
      })}
    </>
  )
}

export default UserList
