import { configureStore } from '@reduxjs/toolkit'
import { userApi } from '../entities/user/api/userApi'
import userReducer from '../entities/user/model/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
