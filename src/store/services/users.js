import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://waprojjourneyapi.azurewebsites.net/api/account";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl,
    "Content-Type": 'application/merge-patch+json'

  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
        query: (payload) => ({
        url: '/register',
        method: 'POST',
        body: payload
        }),
    }),
    loginUser: builder.mutation({
      query: (payload) => ({
      url: '/login',
      method: 'POST',
      body: payload
      }),
  }),
  })
});

export const { useCreateUserMutation, useLoginUserMutation } = usersApi;