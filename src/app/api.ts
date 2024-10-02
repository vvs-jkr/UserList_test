import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Базовая настройка RTK Query для работы с пользователями
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
    }),
  }),
})

export const { useGetUsersQuery } = usersApi
