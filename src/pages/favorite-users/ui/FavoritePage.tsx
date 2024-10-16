import { useDispatch, useSelector } from 'react-redux'
import {
  removeFavorite,
  updateUser,
} from '../../../entities/user/model/userSlice'
import React from 'react'
import { RootState } from '../../../shared/store/store'
import { Button, Flex, Layout } from 'antd'
import { useNavigate } from 'react-router-dom'
import { EditUserModal } from '../../../features/user/EditUserModal'
import { User } from '../../../entities/user/model/types'
import { UserCard } from '../../../entities/user'

const contentStyle = {
  minHeight: 'calc(100vh - 100px)',
  backgroundColor: '#e6f7ff',
  justifyContent: 'center',
}

const FavoritePage: React.FC = () => {
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.user.favorites)
  const users = useSelector((state: RootState) => state.user.users)
  const [isEditModalVisible, setIsEditModalVisible] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)
  const searchTerm = useSelector((state: RootState) => state.user.searchTerm)

  const filteredUsers = users.filter(
    (user) =>
      favorites.includes(user.id) &&
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRemoveFavorite = (userId: number) => {
    dispatch(removeFavorite(userId))
  }

  const openEditModal = (user: User) => {
    setCurrentUser(user)
    setIsEditModalVisible(true)
  }

  const handleUpdateUser = (updatedUser: User) => {
    dispatch(updateUser(updatedUser))
    setIsEditModalVisible(false)
  }

  const navigate = useNavigate()
  const handleNavigateToMainPage = () => {
    navigate('/')
  }

  return (
    <>
      <Layout.Content style={contentStyle}>
        <Flex gap="middle" align="center" vertical style={{ margin: '20' }}>
          <Button onClick={handleNavigateToMainPage}>Back to main page</Button>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={() => openEditModal(user)}
                onFavoriteChange={() => handleRemoveFavorite(user.id)}
                isFavorited={true}
              />
            ))}
          </div>

          <EditUserModal
            visible={isEditModalVisible}
            user={currentUser}
            onSubmit={handleUpdateUser}
            onCancel={() => {
              setIsEditModalVisible(false)
            }}
          />
        </Flex>
      </Layout.Content>
    </>
  )
}

export default FavoritePage
