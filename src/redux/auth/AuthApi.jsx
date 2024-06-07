// File: AuthApi.jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://project-ssback01.onrender.com';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: builder => ({
    register: builder.mutation({
      query: values => ({
        url: '/users/register',
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['User'],
    }),
    logIn: builder.mutation({
      query: values => ({
        url: '/users/login',
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['User'],
    }),
    logOut: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    updateAvatar: builder.mutation({
      query: avatar => {
        const formData = new FormData();
        formData.append('avatar', avatar);

        return {
          url: '/users/avatar',
          method: 'PATCH',
          body: formData,
        };
      },
      invalidatesTags: ['User'],
    }),
    fetchCurrentUser: builder.query({
      query: () => ({
        url: '/users/current',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLogInMutation,
  useLogOutMutation,
  useFetchCurrentUserQuery,
  useUpdateAvatarMutation,
} = authApi;

export default authApi;
