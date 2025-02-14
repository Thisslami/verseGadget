
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8050/api/admin"; // Make sure this API is accessible

export const fetchVerifiedUserCount = createAsyncThunk(
  "admin/fetchVerifiedUserCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/verified-users`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch verified users count");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    verifiedUserCount: 0,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVerifiedUserCount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVerifiedUserCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.verifiedUserCount = action.payload.verifiedUserCount;
      })
      .addCase(fetchVerifiedUserCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
