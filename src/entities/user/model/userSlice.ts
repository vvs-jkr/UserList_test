import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './types'

interface UserState {
  users: User[]
  favorites: User[]
}

const initialState: UserState = {
  users: [],
  favorites: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload
    },
    addFavorite(state, action: PayloadAction<User>) {
      if (!state.favorites.some((user) => user.id === action.payload.id)) {
        state.favorites.push(action.payload)
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(
        (user) => user.id !== action.payload
      )
    },
  },
})

export const { setUsers, addFavorite, removeFavorite } = userSlice.actions

export default userSlice.reducer
