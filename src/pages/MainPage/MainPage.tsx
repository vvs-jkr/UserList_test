import React from 'react'
import { useGetUsersQuery } from '../../entities/user/model/userApi'
import { useDispatch, useSelector } from 'react-redux'
import {
  addFavorite,
  removeFavorite,
  setUsers,
} from '../../entities/user/model/userSlice'
import { RootState } from '../../app/store'
import { EditOutlined } from '@ant-design/icons'
import { User } from '../../entities/user/model/types'
import { Spin, Layout, Card, Rate, Avatar, Flex } from 'antd'
import AppHeader from '../../shared/ui/AppHeader/ui/AppHeader'
import EditUserModal from '../EditModal/EditModal'

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
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)

  const handleEditUser = (user: User) => {
    setCurrentUser(user)
    setIsModalVisible(true)
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    setCurrentUser(null) // Очищаем текущего пользователя после закрытия
  }

  const handleFavoriteChange = (user: User, isFavorited: boolean) => {
    if (isFavorited) {
      // Добавить в избранные пользователей
      dispatch(addFavorite(user))
      alert('Пользователь добавлен в список избранных')
    } else {
      // Удалить из избранных пользователей
      dispatch(removeFavorite(user.id))
      alert('Пользователь удалён из списка избранных')
    }
  }

  const handleCreateUser = (newUser: User) => {
    // Логика добавления нового пользователя
    console.log('Новый пользователь:', newUser)
  }

  const handleSearch = (searchTerm: string) => {
    const filtered: User[] = (users || []).filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(filtered)
  }

  const handleUpdateUser = (updatedUser: User) => {
    console.log('Update user: ', updatedUser)

    setFilteredUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    )
    setIsModalVisible(false) // Закрываем модальное окно после обновления
    setCurrentUser(null) // Очищаем текущего пользователя после обновления
  }

  React.useEffect(() => {
    if (users) {
      dispatch(setUsers(users))
      setFilteredUsers(users)
      localStorage.setItem('users', JSON.stringify(users))
    }
  }, [users, dispatch])

  if (isLoading) return <Spin fullscreen />
  if (error) return <div>Ошибка: {String(error)}</div>

  return (
    <>
      <AppHeader onAddUser={handleCreateUser} onSearch={handleSearch} />
      <Layout.Content style={contentStyle}>
        <Flex gap="middle" align="center" vertical>
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              actions={[
                <EditOutlined
                  key="edit"
                  title="Edit"
                  onClick={() => handleEditUser(user)}
                />,
                <Rate
                  key="favorite"
                  count={1}
                  value={
                    favorites.some((fav: User) => fav.id === user.id) ? 1 : 0
                  } // Проверка, является ли пользователь избранным
                  onChange={(value) => handleFavoriteChange(user, value === 1)} // Управление избранными пользователями
                />,
              ]}
              style={{ width: 500 }}
            >
              <Card.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user.id}`}
                    style={{ width: 100, height: 100 }}
                  />
                }
                title={user.username}
                description={
                  <>
                    <p>
                      <b>Name:</b> {user.name}
                    </p>
                    <p>
                      <b>Email:</b> {user.email}
                    </p>
                    <p>
                      <b>City:</b> {user.address.city}
                    </p>
                  </>
                }
              />
            </Card>
          ))}
        </Flex>
        <EditUserModal
          visible={isModalVisible}
          user={currentUser}
          onCancel={handleModalCancel}
          onSubmit={handleUpdateUser}
        />
      </Layout.Content>
    </>
  )
}

export default MainPage
