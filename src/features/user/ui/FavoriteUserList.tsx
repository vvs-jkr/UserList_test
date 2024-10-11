import React from 'react'
import { User } from '../../../entities/user/model/types'
import FavoriteUserCard from '../../../entities/user/ui/FavoriteUserCard'

interface FavoriteUserListProps {
  favorites: User[]
  onRemove: (userId: number) => void
  onEdit: (user: User) => void
}

const FavoriteUserList: React.FC<FavoriteUserListProps> = ({
  favorites,
  onRemove,
  onEdit,
}) => (
  <>
    {favorites.length === 0 ? (
      <p>Favorite users list is empty</p>
    ) : (
      favorites.map((user) => (
        <FavoriteUserCard
          key={user.id}
          user={user}
          onRemove={() => onRemove(user.id)}
          onEdit={() => onEdit(user)}
        />
      ))
    )}
  </>
)

export default FavoriteUserList
