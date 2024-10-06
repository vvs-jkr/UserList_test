import { User } from './types'
import { ADD_USER } from './actions'

interface UserState {
  users: User[]
}

const initialState: UserState = {
  users: [],
}

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      }
    default:
      return state
  }
}
