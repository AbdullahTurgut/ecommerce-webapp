import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../component/services/api";

export const uploadImages = createAsyncThunk(
  "image/uploadImages",
  async ({ productId, files }) => {
    const formData = new FormData();
    if (Array.isArray(files)) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    } else {
      formData.append("files", files);
    }
    formData.append("productId", productId);
    console.log("the formdata from the image slice: ", formData);
    const response = await api.post("/images/upload", formData);
    console.log("the response from the image slice 1", response);
    console.log("the response from the image slice 2", response.data);
    console.log("the response from the image slice 3", response.data.data);
    return response.data;
  }
);

const initialState = {};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default imageSlice.reducer;
