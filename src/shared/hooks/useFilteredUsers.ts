import { useState, useEffect } from 'react'
import { User } from '../../entities/user/model/types'
import { useDebounce } from './useDebounce'
import { RootState } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTermFavorite } from '../../entities/user/model/userSlice'

export const useFilteredUsers = () => {
  const dispatch = useDispatch()
  const users = useSelector((state: RootState) => state.user.users)
  const searchTerm = useSelector((state: RootState) => state.user.searchTerm)
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (users && users.length > 0) {
      setFilteredUsers(users)
    }
  }, [users])

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(users)
    }
  }, [debouncedSearchTerm, users])

  const handleSearchChange = (searchTerm: string) => {
    dispatch(setSearchTermFavorite(searchTerm))
  }

  return {
    filteredUsers,
    searchTerm,
    handleSearchChange,
  }
}
