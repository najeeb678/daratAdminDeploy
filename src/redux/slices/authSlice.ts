import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAdminApi,
  getAdminDetailsApi,
  getNotificationByRoleApi,
  loginApi,
  markAsReadAdminNotificationsApi,
  markAsReadDoctorNotificationsApi,
  resendEmailOTPApi,
  resetForgottenPasswordApi,
  UpdateAdminApi,
  verifyUserOTPApi,
} from "../api/authApi";

const initialState = {
  role: "",
  token: null,
};

// AsyncThunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { username: string; password: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await loginApi(credentials);

      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const createAdmin = createAsyncThunk(
  "auth/createAdmin",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await createAdminApi(data);

      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const UpdateAdmin = createAsyncThunk(
  "auth/UpdateAdmin",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await UpdateAdminApi(data);

      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const getAdminDetails = createAsyncThunk(
  "auth/getAdminDetails",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await getAdminDetailsApi(id);

      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const resendEmailOTP = createAsyncThunk(
  "auth/resendEmailOTP",
  async (credentials: { email: string }, { rejectWithValue }) => {
    try {
      const data = await resendEmailOTPApi(credentials);

      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const verifyUserOTP = createAsyncThunk(
  "auth/verifyUserOTP",
  async (credentials: any, { rejectWithValue }) => {
    try {
      const data = await verifyUserOTPApi(credentials);

      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const resetForgottenPassword = createAsyncThunk(
  "auth/resetForgottenPassword",
  async (credentials: any, { rejectWithValue }) => {
    try {
      const data = await resetForgottenPasswordApi(credentials);

      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const getNotificationByRole = createAsyncThunk(
  "auth/getNotificationByRole",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await getNotificationByRoleApi(data);

      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const markAsReadAdminNotifications = createAsyncThunk(
  "auth/markAsReadAdminNotifications",
  async (data: any, { rejectWithValue }) => {
    try {
      console.log("id", data);
      const res = await markAsReadAdminNotificationsApi(data);

      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const markAsReadDoctorNotifications = createAsyncThunk(
  "auth/markAsReadAdminNotifications",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await markAsReadDoctorNotificationsApi(data);

      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {});
  },
});

export default authSlice.reducer;
