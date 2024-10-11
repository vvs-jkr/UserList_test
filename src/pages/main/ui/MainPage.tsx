import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addFavorite,
  removeFavorite,
  setUsers,
  updateUser,
} from '../../../entities/user/model/userSlice'
import { RootState } from '../../../app/store'
import { User } from '../../../entities/user/model/types'
import { Spin, Layout, Flex } from 'antd'
import UserList from '../../../features/user/ui/UserList'
import EditUserModal from '../../../widgets/Modal/EditUserModal'
import { useGetUsersQuery } from '../../../entities/user/api/userApi'
import { useOutletContext } from 'react-router-dom'

const contentStyle = {
  minHeight: 'calc(100vh - 100px)',
  backgroundColor: '#e6f7ff',
  justifyContent: 'center',
}

const MainPage: React.FC = () => {
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.user.favorites)
  const usersFromRedux = useSelector((state: RootState) => state.user.users)
  const { filteredUsers } = useOutletContext<{ filteredUsers: User[] }>() // Извлечение filteredUsers из контекста

  const { data: users, isLoading, error } = useGetUsersQuery()

  const [isEditModalVisible, setIsEditModalVisible] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)

  React.useEffect(() => {}, [usersFromRedux])

  React.useEffect(() => {
    if (users && users.length > 0) {
      dispatch(setUsers(users))
    }
  }, [users, dispatch])

  const handleFavoriteChange = (user: User, isFavorited: boolean) => {
    if (isFavorited) {
      dispatch(addFavorite(user))
      alert('Пользователь добавлен в список избранных')
    } else {
      dispatch(removeFavorite(user.id))
      alert('Пользователь удалён из списка избранных')
    }
  }

  const handleUpdateUser = (updatedUser: User) => {
    dispatch(updateUser(updatedUser))
    setCurrentUser(null)
    setIsEditModalVisible(false)
  }

  const openEditModal = (user: User) => {
    setCurrentUser(user)
    setIsEditModalVisible(true)
  }

  if (isLoading) return <Spin fullscreen />
  if (error) return <div>Ошибка: {String(error)}</div>

  return (
    <>
      <Layout.Content style={contentStyle}>
        <Flex gap="middle" align="center" vertical style={{ margin: '20' }}>
          <UserList
            users={filteredUsers}
            favorites={favorites}
            onEditUser={openEditModal}
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
