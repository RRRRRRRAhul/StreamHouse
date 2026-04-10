import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchCategoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createCategoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createCategorySuccess: (state, action) => {
      state.loading = false;
      state.categories.push(action.payload);
    },
    createCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCategoriesFailure,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  createCategoryFailure,
  createCategoryStart,
  createCategorySuccess
} = categorySlice.actions;
const categoryReducer = categorySlice.reducer;
export default categoryReducer;