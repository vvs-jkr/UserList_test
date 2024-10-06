import { User } from '../../../../entities/user/model/types'

export interface HeaderProps {
  onSearch: (searchTerm: string) => void
  hideCreateUserButton?: boolean
  onCreateUser: (newUser: User) => void
  setFilteredUsers: React.Dispatch<React.SetStateAction<User[]>>
}
