import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './types'
import React from 'react'
import { useDispatch } from 'react-redux'

interface UserState {
  users: User[]
  favorites: User[]
  searchTerm:string
}

const initialState: UserState = {
  users: [],
  favorites: [],
  searchTerm:''
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

	 setSearchTermFavorite(state, action: PayloadAction<string>) {
		state.searchTerm = action.payload; 
	 },
  },
})

export const loadInitialUsers = (): User[] => {
  const storedUsers = localStorage.getItem('users')
  return storedUsers ? JSON.parse(storedUsers) : []
}

export const rootReducer = combineReducers({
  user: userSlice.reducer,
})

export const { setUsers, addUser, updateUser, addFavorite, removeFavorite,setSearchTermFavorite } =
  userSlice.actions

export default userSlice.reducer
