import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice";
import categoryReducer from "./features/categorySlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    category: categoryReducer,
  },
});
