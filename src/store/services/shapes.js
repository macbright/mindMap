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
    getShapes: builder.query({
        query: () => ({
        url: `/api/shape/all`,
        headers: {
          Authorization: `Bearer ${getJwtToken()}`
        },
        method: 'POST',
        body: {
            pageSize: 25,
            continuationToken: null,
        }
        }),
        providesTags: ["Shape"]
    }),
    
  })
});

export const { useGetShapesQuery } = shapesApi;

