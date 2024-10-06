import React from 'react'
import { User } from '../../../entities/user/model/types'
import UserCard from './UserCard'

interface UserListProps {
  users: User[]
  favorites: User[]
  onEditUser: (user: User) => void
  onFavoriteChange: (user: User, isFavorited: boolean) => void
}

const UserList: React.FC<UserListProps> = ({
  users,
  favorites,
  onEditUser,
  onFavoriteChange,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    {users.map((user) => (
      <UserCard
        key={user.id}
        user={user}
        isFavorited={favorites.some((fav) => fav.id === user.id)}
        onEdit={() => onEditUser(user)}
        onFavoriteChange={(isFavorited) => onFavoriteChange(user, isFavorited)}
      />
    ))}
  </div>
)

export default UserList
