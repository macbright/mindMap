

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getJwtToken, getUserId} from "../hooks";

const baseUrl = "https://waprojjourneyapi.azurewebsites.net/";

export const documentApi = createApi({
  reducerPath: "documents",
  baseQuery: fetchBaseQuery({
    baseUrl,
    "Content-Type": 'application/merge-patch+json'
  }),
  tagTypes: ["Document"],
  endpoints: (builder) => ({
    createDocument: builder.mutation({
        query: (payload) => ({
        url: `/api/document/${getUserId()}`,
        headers: {
          Authorization: `Bearer ${getJwtToken()}`
        },
        method: 'POST',
        body: payload
        }),
        providesTags: ["Document"]
    }),
    
  })
});

export const { useCreateDocumentMutation } = documentApi;

