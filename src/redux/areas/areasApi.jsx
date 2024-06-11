import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const areasApi = createApi({
  reducerPath: 'areasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  tagTypes: ['Area'],
  endpoints: builder => ({
    getAreas: builder.query({
      query: () => '/areas',
      providesTags: ['Area'],
    }),
  }),
});

export const { useGetAreasQuery } = areasApi;
