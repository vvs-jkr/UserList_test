import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { User } from '../entities/user/model/types'
import { AppHeader } from '../widgets/Header'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import {
  addUser,
  setSearchTermFavorite,
} from '../entities/user/model/userSlice'
import useDebounce from '../shared/lib/utils/useDebounce'

const Layout: React.FC = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const users = useSelector((state: RootState) => state.user.users)
  const searchTerm = useSelector((state: RootState) => state.user.searchTerm)
  const isFavoritePage = location.pathname === '/favorites'

  const [filteredUsers, setFilteredUsers] = React.useState<User[]>([])
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  React.useEffect(() => {
    if (users && users.length > 0) {
      setFilteredUsers(users)
    }
  }, [users])

  React.useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered: User[] = users.filter((user) =>
        user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(users)
    }
  }, [debouncedSearchTerm, users])

  const handleCreateUser = (newUser: User) => {
    dispatch(addUser(newUser))
    setFilteredUsers((prev) => [...prev, { ...newUser }])
    alert('Пользователь успешно добавлен')
  }

  const handleSearchChange = (searchTerm: string) => {
    dispatch(setSearchTermFavorite(searchTerm))
  }

  return (
    <>
      <AppHeader
        hideCreateUserButton={isFavoritePage}
        onSearch={handleSearchChange}
        searchTerm={searchTerm}
        onCreateUser={handleCreateUser}
      />
      <Outlet context={{ filteredUsers }} />
    </>
  )
}

export default Layout
