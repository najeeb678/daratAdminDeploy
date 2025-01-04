import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAdminApi,
  getAdminDetailsApi,
  getDoctorDetailsApi,
  getNotificationByRoleApi,
  loginApi,
  markAllAdminNotificationAsReadApi,
  markAllDoctorNotificationAsReadApi,
  markAsReadAdminNotificationsApi,
  markAsReadDoctorNotificationsApi,
  resendEmailOTPApi,
  resetForgottenPasswordApi,
  UpdateAdminApi,
  UpdateDoctorApi,
  verifyUserOTPApi,
} from "../api/authApi";

const initialState = {
  role: "",
  token: null,
  notifications: [],
  unreadNotificationCount: 0,
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
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await UpdateAdminApi({ id, data }); // Pass id and data
      return res.data;
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
export const getDoctorDetails = createAsyncThunk(
  "auth/getDoctorDetails",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await getDoctorDetailsApi(id);

      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const UpdateDoctor = createAsyncThunk(
  "auth/UpdateDoctor",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await UpdateDoctorApi({ id, data }); // Pass id and data
      return res.data;
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
  async ({ role, doctorId }: { role: string; doctorId?: string }, { rejectWithValue }) => {

    try {
      const res = await getNotificationByRoleApi(role, doctorId);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

// export const getNotificationByRole = createAsyncThunk(
//   "auth/getNotificationByRole",
//   async (data: any, { rejectWithValue }) => {
//     try {
//       const res = await getNotificationByRoleApi(data);

//       return res;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data || "Something went wrong");
//     }
//   }
// );
export const markAsReadAdminNotifications = createAsyncThunk(
  "auth/markAsReadAdminNotifications",
  async (data: any, { rejectWithValue }) => {
    try {

      const res = await markAsReadAdminNotificationsApi(data);

      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const markAsReadDoctorNotifications = createAsyncThunk(
  "auth/markAsReadDoctorNotifications",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await markAsReadDoctorNotificationsApi(data);

      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const markAllAdminNotificationAsRead = createAsyncThunk(
  "auth/markAllAdminNotificationAsRead",
  async (_, { rejectWithValue }) => {
    try {
      const res = await markAllAdminNotificationAsReadApi();

      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
); 
export const markAllDoctorNotificationAsRead = createAsyncThunk(
  "auth/markAllDoctorNotificationAsRead",
  async (_, { rejectWithValue }) => {
    try {
      const res = await markAllDoctorNotificationAsReadApi();

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

      .addCase(loginUser.rejected, (state, action) => {})
      .addCase(getNotificationByRole.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.unreadNotificationCount = action.payload.filter(
          (notif: any) => notif && notif.read === false
        ).length;
      })
      .addCase(markAsReadAdminNotifications.fulfilled, (state, action) => {
        state.unreadNotificationCount = state.unreadNotificationCount - 1;
      })
      .addCase(markAsReadDoctorNotifications.fulfilled, (state, action) => {
        state.unreadNotificationCount = state.unreadNotificationCount - 1;
      });
  },
});

export default authSlice.reducer;
