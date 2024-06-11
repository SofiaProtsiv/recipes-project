import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  tagTypes: ['Ingredient'],
  endpoints: builder => ({
    getIngredients: builder.query({
      query: () => '/ingredients',
      providesTags: ['Ingredient'],
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
