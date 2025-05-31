import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../component/services/api";

export const placeOrders = createAsyncThunk(
  "order/placeOrders",
  async (userId) => {
    const response = await api.post(`/orders/user/${userId}/place-order`);
    console.log("response data from order slice", response.data);
    console.log("response data from order slice", response.data.data);
    return response.data;
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
    builder.addCase(placeOrders.fulfilled, (state, action) => {
      state.orders.push(action.payload);
      state.isLoading = false;
      state.successMessage = action.payload.message;
    });
  },
});

export default orderSlice.reducer;
