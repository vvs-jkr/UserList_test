import { User } from '../../../entities/user/model/types'

export const ADD_USER = 'ADD_USER'

export const addUser = (user: User) => ({
  type: ADD_USER,
  payload: user,
})
