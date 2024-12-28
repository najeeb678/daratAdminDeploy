import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  changeAppointmentStatusApi,
  getAnalyticsApi,
  getRecentPatientsApi,
  getTopDepartmentsApi,
  getUpcomingAppointmentsApi,
} from "../api/AdminDashboardApi";

interface DashboardState {
  analytics: any | null;
  upcomingAppointments: any[] | null;
  recentPatients: any[] | null;
  topDepartments: any[] | null;
  appointmentStatus: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  analytics: null,
  upcomingAppointments: null,
  recentPatients: null,
  appointmentStatus: null,
  topDepartments: null,
  loading: false,
  error: null,
};

export const fetchUpcomingAppointments = createAsyncThunk<
  any[],
  string,
  { rejectValue: string }
>(
  "dashboard/fetchUpcomingAppointments",
  async (filter: string, { rejectWithValue }) => {
    try {
      const data = await getUpcomingAppointmentsApi(filter);
      return data;
    } catch (error: any) {
      console.error("Error fetching upcoming appointments:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch upcoming appointments"
      );
    }
  }
);

export const fetchDashboardAnalytics = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("dashboard/fetchAnalytics", async (_, { rejectWithValue }) => {
  try {
    const data = await getAnalyticsApi();
    return data;
  } catch (error: any) {
    console.error("Error fetching dashboard analytics:", error);
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch analytics"
    );
  }
});

export const fetchRecentPatients = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>(
  "dashboard/fetchRecentPatients",
  async (timeFrame: string, { rejectWithValue }) => {
    try {
      const data = await getRecentPatientsApi(timeFrame);
      return data;
    } catch (error: any) {
      console.error("Error fetching Recent Patients:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to recent Patients"
      );
    }
  }
);

export const fetchTopDepartments = createAsyncThunk<
  any[],
  void,
  { rejectValue: string }
>("dashboard/fetchTopDepartments", async (_, { rejectWithValue }) => {
  try {
    const data = await getTopDepartmentsApi();
    return data;
  } catch (error: any) {
    console.error("Error fetching Top Departments:", error);
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch Top Departments"
    );
  }
});

export const changeAppointmentStatus = createAsyncThunk(
  "appointments/changeAppointmentStatus",
  async (
    payload: { appointmentId: string; status: string }, // Combine doctorId and filter into a single payload
    { rejectWithValue }
  ) => {
    try {
      const data = await changeAppointmentStatusApi(payload);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Analytics API Cases
    builder
      .addCase(fetchDashboardAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDashboardAnalytics.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.analytics = action.payload;
        }
      )
      .addCase(
        fetchDashboardAnalytics.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An unknown error occurred";
        }
      );

    // change appointment status api

    builder
      .addCase(changeAppointmentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        changeAppointmentStatus.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.appointmentStatus = action.payload;
        }
      )
      .addCase(changeAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An unknown error occurred";
      });

    // Top Departments API Cases
    builder
      .addCase(fetchTopDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTopDepartments.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.topDepartments = action.payload;
        }
      )
      .addCase(
        fetchTopDepartments.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An unknown error occurred";
        }
      );

    // Recent Patients API Cases
    builder
      .addCase(fetchRecentPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRecentPatients.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.recentPatients = action.payload;
        }
      )
      .addCase(
        fetchRecentPatients.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An unknown error occurred";
        }
      );

    // Upcoming Appointments API Cases
    builder
      .addCase(fetchUpcomingAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUpcomingAppointments.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.upcomingAppointments = action.payload;
        }
      )
      .addCase(
        fetchUpcomingAppointments.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An unknown error occurred";
        }
      );
  },
});

export default dashboardSlice.reducer;
