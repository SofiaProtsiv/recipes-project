import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// waiting for the back
export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://project-ssback01.onrender.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Recipe'],
  endpoints: builder => ({
    getRecipes: builder.query({
      query: () => '/recipes',
      providesTags: ['Recipe'],
    }),
    addRecipe: builder.mutation({
      query: value => ({
        url: '/recipes',
        method: 'POST',
        body: value,
      }),
      invalidatesTags: ['Recipe'],
    }),
    removeRecipe: builder.mutation({
      query: id => ({
        url: `/recipes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recipe'],
    }),
    updateRecipe: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/recipes/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Recipe'],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useAddRecipeMutation,
  useRemoveRecipeMutation,
  useUpdateRecipeMutation,
} = recipesApi;
