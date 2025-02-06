import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8050/api/auth"; // Hardcoded localhost URL
axios.defaults.withCredentials = true;

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  isCheckingAuth: true,
  error: null,
  message: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error registering user");
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verify-email",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/verify-email`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error verifying email");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error logging in");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/logout`);
      return {};
    } catch (error) {
      return rejectWithValue("Error logging out");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async ({ email }, { rejectWithValue }) => {
    console.log("Sending forgot password request with email:", email); // Debug log - email value

    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      console.log("Axios response:", response.data); // Debug log - server response
      return response.data;
    } catch (error) {
      console.log("Error response:", error.response?.data); // Debug log - error response
      return rejectWithValue(error.response?.data?.message || "Error sending reset email");
    }
  }
);




export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async ({ token, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error resetting password");
    }
  }
);

// export const checkAuth = createAsyncThunk(
//   "auth/check-auth",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_URL}/check-auth`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(null);
//     }
//   }
// );
export const checkAuth = createAsyncThunk(
  "auth/check-auth",
  async (_, { rejectWithValue, dispatch }) => {
    const token = sessionStorage.getItem("token");  // Check sessionStorage for the token

    if (token) {
      try {
        // Optionally, you can validate the token by making an API call
        const response = await axios.get(`${API_URL}/check-auth`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUser(response.data.user));  // Set the user in the state if token is valid
        return response.data;  // Proceed as authenticated
      } catch (error) {
        return rejectWithValue("Token validation failed");
      }
    }

    return rejectWithValue(null);  // No valid token, mark as unauthenticated
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = action.payload.success;
        sessionStorage.setItem("token", action.payload.token);
      })
      
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message; 
        
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      
      })
      
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
