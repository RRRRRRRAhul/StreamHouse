import { fetchFromApi } from "../../services/api";
import {
  fetchCategoriesStart,
  fetchCategoriesFailure,
  fetchCategoriesSuccess,
  createCategoryFailure,
  createCategoryStart,
  createCategorySuccess,
} from "./categorySlice";

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(fetchCategoriesStart());

    const data = await fetchFromApi("/videos/categories/");

    if (!data) {
      throw new Error("Invalid response from server");
    }

    dispatch(fetchCategoriesSuccess(data));
  } catch (error) {
    const message =
      error?.data?.detail ||
      error?.message ||
      "Failed to fetch categories. Please refresh the page and try again.";
    dispatch(fetchCategoriesFailure(message));
  }
};

export const createCategory = (name) => async (dispatch) => {
  try {
    dispatch(createCategoryStart());

    const data = await fetchFromApi("/videos/categories/", {
      method: "POST",
      body: { name },
    });

    if (!data) {
      throw new Error("Invalid response from server");
    }

    dispatch(createCategorySuccess(data));
  } catch (error) {
    const message =
      error?.data?.detail ||
      error?.message ||
      "Failed to create category. Please try again.";
    dispatch(createCategoryFailure(message));
  }
};
