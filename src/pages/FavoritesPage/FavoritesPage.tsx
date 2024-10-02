import { useDispatch, useSelector } from 'react-redux'
import { removeFavorite } from '../../entities/user/model/userSlice'
import { RootState } from '../../app/store'
import { Avatar, Button, Card, Flex, Layout } from 'antd'
import { User } from '../../entities/user/model/types'
import React from 'react'
import AppHeader from '../../shared/ui/AppHeader/ui/AppHeader'
import '../../index.css'
import { useNavigate } from 'react-router-dom'

const FavoritePage: React.FC = () => {
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.user.favorites)
  const [filteredFavorites, setFilteredFavorites] =
    React.useState<User[]>(favorites)
  const navigate = useNavigate()

  const handleRemove = (userId: number) => {
    dispatch(removeFavorite(userId))
  }

  const handleSearch = (searchTerm: string) => {
    const filtered = favorites.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredFavorites(filtered)
  }

  React.useEffect(() => {
    setFilteredFavorites(favorites) // Обновляем список избранных при изменении favorites
  }, [favorites])

  const handleNavigateToMainPage = () => {
    navigate('/')
  }

  return (
    <>
      <AppHeader onSearch={handleSearch} hideCreateUserButton />
      <Layout.Content
        style={{
          padding: '20px',
          backgroundColor: '#e6f7ff',
        }}
      >
        <Button onClick={handleNavigateToMainPage}>Вернуться на главную</Button>
        <Flex gap="middle" align="center" vertical>
          {filteredFavorites.length === 0 ? (
            <p>Список избранных пользователей пуст.</p>
          ) : (
            filteredFavorites.map((user: User) => (
              <Card key={user.id} style={{ margin: '10px 0', width: 500 }}>
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
                      <Button
                        color="danger"
                        variant="solid"
                        onClick={() => handleRemove(user.id)}
                        style={{ marginTop: '25px' }}
                      >
                        Delete
                      </Button>
                    </>
                  }
                />
              </Card>
            ))
          )}
        </Flex>
      </Layout.Content>
    </>
  )
}

export default FavoritePage
