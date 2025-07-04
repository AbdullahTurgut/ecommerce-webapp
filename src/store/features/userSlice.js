import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../component/services/api";
import axios from "axios";

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId) => {
    const response = await api.get(`/users/user/${userId}`);
    return response.data.data;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ user, addresses }) => {
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      addressList: addresses,
    };
    const response = await api.post("/users/create-user", payload);
    return response.data;
  }
);

export const getCountryNames = createAsyncThunk(
  "user/getCountryNames",
  async () => {
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,cca2"
    );
    const countryNames = response.data.map((country) => ({
      name: country.name.common,
      code: country.cca2,
    }));
    countryNames.sort((a, b) => a.name.localeCompare(b.name));
    return countryNames;
  }
);
/* Add CRUD for address api */
// Add Address Thunk
export const addAddress = createAsyncThunk(
  "user/addAddress",
  async ({ userId, address }) => {
    const response = await api.post(`/addresses/${userId}/create`, [address]);
    return response.data;
  }
);

// Fetch User Addresses Thunk
export const fetchAddresses = createAsyncThunk(
  "user/fetchAddresses",
  async (userId) => {
    const response = await api.get(`/addresses/address/user/${userId}`);
    return response.data;
  }
);

// Update Address Thunk
export const updateAddress = createAsyncThunk(
  "user/updateAddress",
  async ({ id, address }) => {
    const response = await api.put(`/addresses/address/${id}/update`, address);
    return response.data;
  }
);

// Delete Address Thunk
export const deleteAddress = createAsyncThunk(
  "user/deleteAddress",
  async ({ id }) => {
    const response = await api.delete(`/addresses/address/${id}/delete`);
    return response.data;
  }
);

const initialState = {
  user: null,
  countryNames: [],
  loading: false,
  errorMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserAddresses(state, action) {
      state.user.addressList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.loading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.loading = false;
      });
  },
});

export const { setUser, setUserAddresses } = userSlice.actions;

export default userSlice.reducer;
