import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { name: '', email: '', avatar: '' },
  token: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,

  reducers: {
    registerUser(state, action) {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.isLoggedIn = true;
    },

    logInUser(state, action) {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.isLoggedIn = true;
    },
    logOutUser(state) {
      state.user = { name: '', email: '' };
      state.token = null;
      state.isLoggedIn = false;
    },

    fetchUser(state, action) {
      state.user = action.payload.data;
      state.isLoggedIn = true;
    },

    updateUserAvatar(state, action) {
      state.user.avatar = action.payload.data.avatar;
    },
  },
});

export const {
  logInUser,
  registerUser,
  logOutUser,
  fetchUser,
  updateUserAvatar,
} = authSlice.actions;
