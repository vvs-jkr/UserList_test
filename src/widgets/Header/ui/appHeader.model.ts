import { User } from '../../../entities/user/model/types'

export interface HeaderProps {
  onSearch: (searchTerm: string) => void
  hideCreateUserButton: boolean
  onCreateUser: (newUser: User) => void
  searchTerm: string 
}
