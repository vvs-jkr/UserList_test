import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../model/types'

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

export const { useGetUsersQuery } = userApi
