import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from './types'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
  }),
})

// Экспортируем хуки для использования в компонентах
export const { useGetUsersQuery } = userApi
