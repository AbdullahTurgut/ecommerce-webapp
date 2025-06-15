import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, privateApi } from "../../component/services/api";

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    const response = await api.get("/products/all-products");
    return response.data.data;
  }
);

export const addNewProduct = createAsyncThunk(
  "product/addNewProduct",
  async (product) => {
    const response = await privateApi.post("/products/add-product", product);
    return response.data.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ productId, updatedProduct }) => {
    const response = await privateApi.put(
      `/products/${productId}/update`,
      updatedProduct
    );
    return response.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId) => {
    const response = await privateApi.delete(`/products/${productId}/delete`);

    return response.data;
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

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (productId) => {
    const response = await api.get(`/products/product/${productId}`);
    return response.data.data;
  }
);

export const getProductsByCategoryId = createAsyncThunk(
  "product/getProductsByCategoryId",
  async (categoryId) => {
    const response = await api.get(`/products/category/${categoryId}/products`);
    return response.data.data;
  }
);

const initialState = {
  products: [],
  product: null,
  distinctProducts: [],
  brands: [],
  selectedBrands: [],
  quantity: 1,
  errorMessage: null,
  isLoading: true,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterByBrands: (state, action) => {
      const { brand, isChecked } = action.payload;
      if (isChecked) {
        state.selectedBrands.push(brand);
      } else {
        state.selectedBrands = state.selectedBrands.filter((b) => b !== brand);
      }
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    addBrand: (state, action) => {
      state.brands.push(action.payload);
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
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.quantity = 1;
        state.isLoading = false;
      })
      .addCase(getProductsByCategoryId.fulfilled, (state, action) => {
        state.products = action.payload;
        state.errorMessage = null;
        state.isLoading = false;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.errorMessage = null;
        state.isLoading = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.product = action.payload.data;
        state.errorMessage = null;
        state.isLoading = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload.data
        );
      });
  },
});

export const { filterByBrands, setQuantity, addBrand } = productSlice.actions;
export default productSlice.reducer;
