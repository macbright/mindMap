import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl,

  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
        query: (payload) => ({
        url: '/user',
        method: 'POST',
        data: payload,
        }),
    }),
  })
});

export const { useCreateUserMutation } = usersApi;