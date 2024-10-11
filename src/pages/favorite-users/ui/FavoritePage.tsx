import { useDispatch, useSelector } from 'react-redux'
import {
  removeFavorite,
  updateUser,
} from '../../../entities/user/model/userSlice'
import { RootState } from '../../../app/store'
import { Button, Flex, Layout } from 'antd'
import { User } from '../../../entities/user/model/types'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import EditUserModal from '../../../widgets/Modal/EditUserModal'
import FavoriteUserList from '../../../features/user/ui/FavoriteUserList'

const FavoritePage: React.FC = () => {
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.user.favorites)
  const searchTerm = useSelector((state: RootState) => state.user.searchTerm)

  const [isEditModalVisible, setIsEditModalVisible] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)

  const filteredFavorites = favorites.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleUpdateUser = (updatedUser: User) => {
    dispatch(updateUser(updatedUser))
    setCurrentUser(null)
    setIsEditModalVisible(false)
  }

  const handleRemove = (userId: number) => {
    dispatch(removeFavorite(userId))
  }

  const handleEdit = (user: User) => {
    setCurrentUser(user)
    setIsEditModalVisible(true)
  }

  const navigate = useNavigate()
  const handleNavigateToMainPage = () => {
    navigate('/')
  }

  return (
    <>
      <Layout.Content
        style={{
          padding: '20px',
          backgroundColor: '#e6f7ff',
        }}
      >
        <Button onClick={handleNavigateToMainPage}>Back to main page</Button>
        <Flex gap="middle" align="center" vertical>
          <FavoriteUserList
            favorites={filteredFavorites}
            onRemove={handleRemove}
            onEdit={handleEdit}
          />
        </Flex>
        <EditUserModal
          visible={isEditModalVisible}
          user={currentUser}
          onSubmit={handleUpdateUser}
          onCancel={() => {
            setIsEditModalVisible(false)
          }}
        />
      </Layout.Content>
    </>
  )
}

export default FavoritePage
