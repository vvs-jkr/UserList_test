import React from 'react'
import { useGetUsersQuery } from '../../../entities/user/api/userApi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../shared/store/store'
import UserList from '../../../widgets/UserList/ui/UserList/UserList'
import {
  addFavorite,
  removeFavorite,
  setUsers,
  updateUser,
} from '../../../entities/user/model/userSlice'
import { Flex, Layout, Spin } from 'antd'
import { EditUserModal } from '../../../features/user/EditUserModal'
import { User } from '../../../entities/user/model/types'

const contentStyle = {
  minHeight: 'calc(100vh - 100px)',
  backgroundColor: '#e6f7ff',
  justifyContent: 'center',
}

const MainPage: React.FC = () => {
  const dispatch = useDispatch()
  const { data: users, isLoading, error } = useGetUsersQuery()
  const searchTerm = useSelector((state: RootState) => state.user.searchTerm)
  const [isEditModalVisible, setIsEditModalVisible] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)

  const handleFavoriteChange = (userId: number, isFavorited: boolean) => {
    if (isFavorited) {
      dispatch(addFavorite(userId))
    } else {
      dispatch(removeFavorite(userId))
    }
  }

  const filteredUsers = useSelector(
    (state: RootState) => state.user.users
  )?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const favorites = useSelector((state: RootState) => state.user.favorites)

  const handleUpdateUser = (updatedUser: User) => {
    dispatch(updateUser(updatedUser))
    setIsEditModalVisible(false)
  }

  const openEditModal = (user: User) => {
    setCurrentUser(user)
    setIsEditModalVisible(true)
  }

  React.useEffect(() => {
    if (users) {
      dispatch(setUsers(users))
    }
  }, [dispatch, users])

  if (isLoading) return <Spin fullscreen />
  if (error) return <div>Ошибка: {String(error)}</div>

  return (
    <>
      <Layout.Content style={contentStyle}>
        <Flex gap="middle" align="center" vertical style={{ margin: '20' }}>
          <UserList
            onEditUser={openEditModal}
            users={filteredUsers || []}
            favorites={favorites}
            onFavoriteChange={handleFavoriteChange}
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

export default MainPage
