import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeFavorite } from '../entities/user/model/userSlice'
import { RootState } from '../app/store'
import { Button, Flex, Layout } from 'antd'
import { User } from '../entities/user/model/types'
import React from 'react'
import '../app/index.css'
import { useNavigate } from 'react-router-dom'
import FavoriteUserList from '../features/user/ui/FavoriteUserList'
import { AppHeader } from '../widgets/Header'

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
    setFilteredFavorites(favorites)
  }, [favorites])

  const handleNavigateToMainPage = () => {
    navigate('/')
  }

  const handleCreateUser = (newUser: User) => {
    dispatch(addUser(newUser))
  }

  return (
    <>
      <AppHeader
        onSearch={handleSearch}
        hideCreateUserButton
        onCreateUser={handleCreateUser}
        setFilteredUsers={setFilteredFavorites}
      />
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
          />
        </Flex>
      </Layout.Content>
    </>
  )
}

export default FavoritePage
