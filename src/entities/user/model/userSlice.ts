import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './types'

interface UserState {
  users: User[]
  favorites: number[]
  searchTerm: string
}

const initialState: UserState = {
  users: [],
  favorites: [],
  searchTerm: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload
    },

    addUser(state, action: PayloadAction<User>) {
      if (!state.users.some((user) => user.id === action.payload.id)) {
        const updatedUsers = [...state.users, action.payload]
        state.users = updatedUsers

        localStorage.setItem('users', JSON.stringify(state.users))
      }
    },

    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      )
      if (index !== -1) {
        state.users[index] = action.payload
        localStorage.setItem('users', JSON.stringify(state.users))
      }
    },

    editUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      )
      if (index !== -1) {
        state.users[index] = action.payload
      }
    },

    addFavorite(state, action: PayloadAction<number>) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload)
      } else {
      }
    },

    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter((id) => id !== action.payload)
    },

    setSearchTermFavorite(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload
    },
  },
})

export const {
  addUser,
  editUser,
  setUsers,
  updateUser,
  addFavorite,
  removeFavorite,
  setSearchTermFavorite,
} = userSlice.actions
export default userSlice.reducer
