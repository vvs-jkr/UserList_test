import React from 'react'
import { useGetUsersQuery } from '../entities/user/api/userApi'
import { useDispatch, useSelector } from 'react-redux'
import {
  addFavorite,
  addUser,
  removeFavorite,
  setUsers,
} from '../entities/user/model/userSlice'
import { RootState } from '../app/store'
import { User } from '../entities/user/model/types'
import { Spin, Layout, Flex } from 'antd'
import EditUserModal from './EditUserModal'
import UserList from '../features/user/ui/UserList'
import { AppHeader } from '../widgets/Header'

const contentStyle = {
  minHeight: 'calc(100vh - 100px)',
  backgroundColor: '#e6f7ff',
  justifyContent: 'center',
}

const MainPage: React.FC = () => {
  const dispatch = useDispatch()
  const { data: users, isLoading, error } = useGetUsersQuery()
  const favorites = useSelector((state: RootState) => state.user.favorites)
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>([])

  const [isEditModalVisible, setIsEditModalVisible] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)

  const handleCreateUser = (newUser: User) => {
    console.log('New user :', newUser)
    dispatch(addUser(newUser))
    setFilteredUsers((prev) => [...prev, { ...newUser, id: Date.now() }])
    alert('Пользователь успешно добавлен')
  }

  const handleSearch = React.useCallback(
    (searchTerm: string) => {
      const filtered: User[] = (users || []).filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUsers(filtered)
    },
    [users]
  )

  React.useEffect(() => {
    if (users) {
      dispatch(setUsers(users))
      setFilteredUsers(users)
    }
  }, [users, dispatch])

  const handleEditUser = (user: User) => {
    setCurrentUser(user)
    setIsEditModalVisible(true)
  }

  const handleModalCancel = () => {
    setIsEditModalVisible(false)
    setCurrentUser(null)
  }

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
    setFilteredUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    )
    setCurrentUser(null)
  }

  if (isLoading) return <Spin fullscreen />
  if (error) return <div>Ошибка: {String(error)}</div>

  return (
    <>
      <AppHeader
        onSearch={handleSearch}
        onCreateUser={handleCreateUser}
        setFilteredUsers={setFilteredUsers}
      />
      <Layout.Content style={contentStyle}>
        <Flex gap="middle" align="center" vertical style={{ margin: '20' }}>
          <UserList
            users={filteredUsers}
            favorites={favorites}
            onEditUser={handleEditUser}
            onFavoriteChange={handleFavoriteChange}
          />
        </Flex>
        <EditUserModal
          visible={isEditModalVisible}
          user={currentUser}
          onCancel={handleModalCancel}
          onSubmit={handleUpdateUser}
        />
      </Layout.Content>
    </>
  )
}

export default MainPage
