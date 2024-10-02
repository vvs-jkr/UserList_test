import { Input } from 'antd'
import React from 'react'
import { User } from '../../../entities/user/model/types'
import { debounce } from '../../../shared/lib/utils/debounce'

interface UserSearchProps {
  users: User[]
  onFilteredUsers: React.Dispatch<React.SetStateAction<User[]>>
}

const UserSearch: React.FC<UserSearchProps> = ({ users, onFilteredUsers }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('')

  const debouncedSearch = React.useCallback(
    debounce((value: string) => {
      const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      )
      onFilteredUsers(filteredUsers)
    }, 1000),
    [users]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    debouncedSearch(value)
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
