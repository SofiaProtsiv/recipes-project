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
  // public endpoints
  endpoints: builder => ({
    getRecipes: builder.query({
      query: () => '/recipes',
      providesTags: ['Recipe'],
    }),
    getPopularRecipes: builder.query({
      query: () => '/recipes/popular/list',
      providesTags: ['Recipe'],
    }),
    getRecipeById: builder.query({
      query: id => `/recipes/${id}`,
      providesTags: ['Recipe'],
    }),
    //private endpoints
    addRecipe: builder.mutation({
      query: ({
        time,
        title,
        category,
        area,
        description,
        ingredients,
        instructions,
        thumb,
      }) => {
        const formData = new FormData();
        formData.append('time', time);
        formData.append('title', title);
        formData.append('category', category);
        formData.append('area', area);
        formData.append('description', description);
        ingredients.forEach((ingredient, index) => {
          formData.append(`ingredients[${index}][id]`, ingredient.id);
          formData.append(`ingredients[${index}][measure]`, ingredient.measure);
        });
        formData.append('instructions', instructions);
        formData.append('thumb', thumb);
        return { url: '/recipes/personal', method: 'POST', body: formData };
      },
      invalidatesTags: ['Recipe'],
    }),
    getOwnRecipes: builder.query({
      query: () => '/recipes/personal/data',
      providesTags: ['Recipe'],
    }),

    removeRecipe: builder.mutation({
      query: id => ({
        url: `/recipes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recipe'],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetPopularRecipesQuery,
  useGetRecipeByIdQuery,
  useAddRecipeMutation,
  useGetOwnRecipesQuery,
  useRemoveRecipeMutation,
} = recipesApi;
