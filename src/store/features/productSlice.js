import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../component/services/api";

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    const response = await api.get("/products/all-products");
    return response.data.data;
  }
);

export const getDistinctProductsByName = createAsyncThunk(
  "product/getDistinctProductsByName",
  async () => {
    const response = await api.get("/products/distinct/products");
    return response.data.data;
  }
);

export const getAllBrands = createAsyncThunk(
  "product/getAllBrands",
  async () => {
    const response = await api.get("/products/distinct/brands");
    return response.data.data;
  }
);

const initialState = {
  products: [],
  distinctProducts: [],
  brands: [],
  selectedBrands: [],
  errorMessage: null,
  isLoading: true,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterByBrands(state, action) {
      const { brand, isChecked } = action.payload;
      if (isChecked) {
        state.selectedBrands.push(brand);
      } else {
        state.selectedBrands = state.selectedBrands.filter((b) => b !== brand);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.errorMessage = null;
        state.isLoading = false;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.errorMessage = action.error.message;
      })
      .addCase(getDistinctProductsByName.fulfilled, (state, action) => {
        state.distinctProducts = action.payload;
        state.errorMessage = null;
        state.isLoading = false;
      })
      .addCase(getDistinctProductsByName.rejected, (state, action) => {
        state.errorMessage = action.error.message;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.isLoading = false;
      });
  },
});

export const { filterByBrands } = productSlice.actions;
export default productSlice.reducer;
