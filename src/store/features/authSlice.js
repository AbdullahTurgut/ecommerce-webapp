import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../component/services/api";
import { jwtDecode } from "jwt-decode";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const response = await api.post("/auth/login", { email, password });
    console.log("Login response:", response);
    console.log("Login response: 1", response.data);
    return response.data;
  }
);

const initialState = {
  isAuthenticated: !!localStorage.getItem("authToken"),
  token: localStorage.getItem("authToken") || null,
  roles: JSON.parse(localStorage.getItem("userRoles")) || [],
  errorMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const decodedToken = jwtDecode(action.payload.accessToken);
        state.isAuthenticated = true;
        state.token = action.payload.accessToken;
        state.roles = decodedToken.roles;
        state.errorMessage = null;

        localStorage.setItem("authToken", action.payload.accessToken);
        localStorage.setItem("userRoles", JSON.stringify(decodedToken.roles));
        localStorage.setItem("userId", decodedToken.id);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.token = null;
        state.errorMessage = action.error.message;
      });
  },
});

export default authSlice.reducer;
