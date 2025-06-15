import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../component/services/api";
import axios from "axios";

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId) => {
    const response = await api.get(`/users/user/${userId}`);
    return response.data;
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

// rest call for countries api
export const getCountryNames = createAsyncThunk(
  "user/getCountryNames",
  async () => {
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name"
    );
    const countryNames = response.data.map((country) => country.name.common);
    countryNames.sort((a, b) => a.localeCompare(b));
    return countryNames;
  }
);

const initialState = {
  user: null,
  isLoading: true,
  errorMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.errorMessage = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.errorMessage = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export default userSlice.reducer;
