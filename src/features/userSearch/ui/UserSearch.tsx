import { Input } from 'antd'
import React from 'react'
import { User } from '../../../entities/user/model/types'
import useDebounce from '../../../shared/lib/utils/useDebounce'

interface UserSearchProps {
  users: User[]
  onFilteredUsers: React.Dispatch<React.SetStateAction<User[]>>
}

const UserSearch: React.FC<UserSearchProps> = ({ users, onFilteredUsers }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('')

  const debouncedSearchTerm = useDebounce(searchTerm, 1000)

  React.useEffect(() => {
    if (debouncedSearchTerm) {
      const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
      onFilteredUsers(filteredUsers)
    } else {
      onFilteredUsers(users) // Если строка поиска пустая, возвращаем всех пользователей
    }
  }, [debouncedSearchTerm, users, onFilteredUsers])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  return (
    <Input
      placeholder="Search users"
      value={searchTerm}
      onChange={handleChange}
    />
  )
}

export default UserSearch
