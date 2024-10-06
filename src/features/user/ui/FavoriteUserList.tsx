import React from 'react'
import { User } from '../../../entities/user/model/types'
import FavoriteUserCard from './FavoriteUserCard'

interface FavoriteUserListProps {
  favorites: User[]
  onRemove: (userId: number) => void
}

const FavoriteUserList: React.FC<FavoriteUserListProps> = ({
  favorites,
  onRemove,
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
        />
      ))
    )}
  </>
)

export default FavoriteUserList
