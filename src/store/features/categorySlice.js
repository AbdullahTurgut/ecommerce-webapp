import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../component/services/api";

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async () => {
    const response = await api.get("/categories/all");
    return response.data.data;
  }
);

const initialState = {
  categories: [],
  errorMessage: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.errorMessage = null;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.errorMessage = action.error.message;
      });
  },
});

export default categorySlice.reducer;
