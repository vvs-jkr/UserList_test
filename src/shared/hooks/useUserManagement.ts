import { useDispatch } from 'react-redux'
import { User } from '../../entities/user/model/types'
import { addUser } from '../../entities/user/model/userSlice'

export const useUserManagement = () => {
  const dispatch = useDispatch()

  const handleCreateUser = (newUser: User) => {
    dispatch(addUser(newUser))
    alert('Пользователь успешно добавлен')
  }

  return {
    handleCreateUser,
  }
}
