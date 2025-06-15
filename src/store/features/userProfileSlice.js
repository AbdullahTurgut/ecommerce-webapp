import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../component/services/api";

export const getUserProfile = createAsyncThunk(
  "userProfile/getUserProfile",
  async (userId) => {
    const response = await api.get(`/users/user/${userId}`);
    return response.data;
  }
);

export const getUserAddresses = createAsyncThunk(
  "userProfile/getUserAddresses",
  async (userId) => {
    const response = await api.get(`/addresses/address/user/${userId}`);
    return response.data;
  }
);

export const deleteUserAddress = createAsyncThunk(
  "userProfile/deleteUserAddress",
  async (addressId) => {
    const response = await api.delete(`/addresses/address/${addressId}/delete`);
    return response.data;
  }
);

export const updateUserAddress = createAsyncThunk(
  "userProfile/updateUserAddress",
  async ({ id, addressData }) => {
    const response = await api.put(
      `/addresses/address/${id}/update`,
      addressData
    );
    return response.data;
  }
);

const initialState = {
  userProfile: null,
  addresses: [],
  isLoading: false,
  errorMessage: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload.data;
        state.isLoading = false;
        state.errorMessage = null;
      })
      .addCase(getUserAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload.data;
        state.isLoading = false;
        state.errorMessage = null;
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (address) => address.id !== action.payload.data.id
        );
        state.isLoading = false;
        state.errorMessage = null;
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        const updatedAddress = action.payload.data;
        state.addresses = state.addresses.map((address) =>
          address.id === updatedAddress.id ? updatedAddress : address
        );
        state.isLoading = false;
        state.errorMessage = null;
      });
  },
});

export default userProfileSlice.reducer;
