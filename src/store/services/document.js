

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
    saveDocumentShapes: builder.mutation({
        query: ({payload, documentId}) => ({
        url: `/api/documentShape/${documentId}/multiple`,
        headers: {
          Authorization: `Bearer ${getJwtToken()}`
        },
        method: 'POST',
        body: payload
        }),
        providesTags: ["Document"]
    }),
    saveDocumentShapesRelation: builder.mutation({
        query: ({payload, documentId}) => ({
        url: `/api/shapeRelation/${documentId}/multiple`,
        headers: {
          Authorization: `Bearer ${getJwtToken()}`
        },
        method: 'POST',
        body: payload
        }),
        providesTags: ["Document"]
    }),
    getDocumentById: builder.query({
      query: (documentId) => ({
      url: `/api/document/${getUserId()}/${documentId}`,
      headers: {
        Authorization: `Bearer ${getJwtToken()}`
      },
      method: 'GET',

      }),
      providesTags: ["Document"]
  }),
  getAllUsersDocuments: builder.query({
    query: () => ({
    url: `/api/document/${getUserId()}/all`,
    headers: {
      Authorization: `Bearer ${getJwtToken()}`
    },
    method: 'GET',

    }),
    providesTags: ["Document"]
  }),
  deleteDocument: builder.mutation({
    query: (id) => ({
    url: `/api/document/${getUserId()}/${id}`,
    headers: {
      Authorization: `Bearer ${getJwtToken()}`
    },
    method: 'DELETE',
    }),
    invalidatesTags: ["Document"]
  }),
  changeDocumentName: builder.mutation({
    query: ({payload, id}) => ({
    url: `/api/document/${getUserId()}/${id}`,
    headers: {
      Authorization: `Bearer ${getJwtToken()}`
    },
    method: 'PUT',
    body: payload
    }),
    invalidatesTags: ["Document"]
  }),
  exportingToJson: builder.query({
    query: (id) => ({
    url: `/api/${id}/export/json`,
    headers: {
      Authorization: `Bearer ${getJwtToken()}`
    },
    method: 'GET',
    }),
    providesTags: ["Document"]
  }),
  })
});

export const { useCreateDocumentMutation,  useSaveDocumentShapesMutation, 
  useSaveDocumentShapesRelationMutation, useGetDocumentByIdQuery,  
  useGetAllUsersDocumentsQuery, 
  useDeleteDocumentMutation,
  useChangeDocumentNameMutation,
  useExportingToJsonQuery,
} = documentApi;


