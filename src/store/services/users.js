import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {getUserId, getJwtToken} from "../hooks";

const baseUrl = "https://waprojjourneyapi.azurewebsites.net/";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl,
    "Content-Type": 'application/merge-patch+json'

  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
        query: (payload) => ({
        url: 'api/account/register',
        method: 'POST',
        body: payload
        }),
    }),
    loginUser: builder.mutation({
      query: (payload) => ({
      url: 'api/account/login',
      method: 'POST',
      body: payload
      }),
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
      url: 'api/account/changepassword',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getJwtToken()}`
      },
      body: payload
      }),
    }),
    updateUser: builder.mutation({
      query: ({payload, userId}) => ({
      url: `api/user/${userId}`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getJwtToken()}`
      },
      body: payload
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
      url: `/api/user/${id}`,
      headers: {
        Authorization: `Bearer ${getJwtToken()}`
      },
      method: 'GET',
      }),
    }),
  })
});

export const { useCreateUserMutation, useLoginUserMutation, 
  useChangePasswordMutation, useUpdateUserMutation } = usersApi;
const { useGetUserByIdQuery } = usersApi;


export const useGetUserInfo = () => {
  const id = getUserId();
  return useGetUserByIdQuery(id, { skip: !id });
};
