import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getJwtToken} from "../hooks";

const baseUrl = "https://waprojjourneyapi.azurewebsites.net/";

export const shapesApi = createApi({
  reducerPath: "shapes",
  baseQuery: fetchBaseQuery({
    baseUrl,
    "Content-Type": 'application/merge-patch+json'
  }),
  tagTypes: ["Shape"],
  endpoints: (builder) => ({
    getShapes: builder.mutation({
        query: (payload) => ({
        url: `/api/shape/all`,
        headers: {
          Authorization: `Bearer ${getJwtToken()}`
        },
        method: 'POST',
        body: payload
        }),
        providesTags: ["Shape"]
    }),
    
  })
});

export const { useGetShapesMutation } = shapesApi;

