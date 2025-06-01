import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../component/services/api";

export const placeOrders = createAsyncThunk(
  "order/placeOrders",
  async (userId) => {
    const response = await api.post(`/orders/user/${userId}/place-order`);

    return response.data;
  }
);

export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (userId) => {
    const response = await api.get(`/orders/user/${userId}/order`);
    return response.data.data;
  }
);

const initialState = {
  orders: [],
  isLoading: true,
  errorMessage: null,
  successMessage: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrders.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      });
  },
});

export default orderSlice.reducer;
