import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCategory: { name: 'all', _id: '' },
  categories: [],
};

export const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,

  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    updateCategory(state, action) {
      console.log(action);
      state.category = action.payload;
    },

    setCategories(state, action) {
      console.log(action);
      state.categories = action.payload;
    },
    updateCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export const { setCategory, updateCategory, setCategories, updateCategories } =
  categoriesSlice.actions;
