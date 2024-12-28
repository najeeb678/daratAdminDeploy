import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getDoctorAnalyticsApi,
  getDoctorAppointmentsApi,
  getDoctorNextAppointmentApi,
  getDoctorsRecentPatientsApi,
  getDoctorTopDepartmentsApi,
} from "../api/doctorDashboardApi";

interface DashboardState {
  doctorAnalytics: any | null;
  doctorNextAppointment: any | null;
  doctorUpcomingAppointments: any[] | null;
  doctorTopDepartments: any[] | null;
  doctorsRecentPatients: any[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  doctorAnalytics: null,
  doctorNextAppointment: null,
  doctorUpcomingAppointments: null,
  doctorTopDepartments: null,
  doctorsRecentPatients: null,
  loading: false,
  error: null,
};

export const fetchDoctorDashboardAnalytics = createAsyncThunk(
  "auth/fetchDoctorDashboardAnalytics",
  async (credentials: { doctorId: string }, { rejectWithValue }) => {
    try {
      const data = await getDoctorAnalyticsApi(credentials);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const fetchDoctorTopDepartments = createAsyncThunk(
  "auth/fetchDoctorTopDepartments",
  async (credentials: { doctorId: string }, { rejectWithValue }) => {
    try {
      const data = await getDoctorTopDepartmentsApi(credentials);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const fetchDoctorNextAppointment = createAsyncThunk(
  "auth/fetchDoctorNextAppointment",
  async (credentials: { doctorId: string }, { rejectWithValue }) => {
    try {
      const data = await getDoctorNextAppointmentApi(credentials);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const fetchDoctorUpcomingAppointments = createAsyncThunk(
  "appointments/fetchDoctorUpcomingAppointments",
  async (
    payload: { doctorId: string; filter: string; search: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await getDoctorAppointmentsApi(payload);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const fetchDoctorsRecentPatients = createAsyncThunk(
  "appointments/fetchDoctorsRecentPatients",
  async (
    payload: { doctorId: string; timeFrame: string }, // Combine doctorId and filter into a single payload
    { rejectWithValue }
  ) => {
    try {
      const data = await getDoctorsRecentPatientsApi(payload);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

const doctorDashboardSlice = createSlice({
  name: "doctorDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorDashboardAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDoctorDashboardAnalytics.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.doctorAnalytics = action.payload;
        }
      )
      .addCase(fetchDoctorDashboardAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An unknown error occurred";
      });

    // doctor recent patient

    builder
      .addCase(fetchDoctorsRecentPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDoctorsRecentPatients.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.doctorsRecentPatients = action.payload.patients;
        }
      )
      .addCase(fetchDoctorsRecentPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An unknown error occurred";
      });

    // doctor next  appointment

    builder
      .addCase(fetchDoctorNextAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDoctorNextAppointment.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.doctorNextAppointment = action.payload;
        }
      )
      .addCase(fetchDoctorNextAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An unknown error occurred";
      });

    //top departments
    builder
      .addCase(fetchDoctorTopDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDoctorTopDepartments.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.doctorTopDepartments = action.payload;
        }
      )
      .addCase(fetchDoctorTopDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An unknown error occurred";
      });

    //upcoming appointments

    builder
      .addCase(fetchDoctorUpcomingAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDoctorUpcomingAppointments.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.doctorUpcomingAppointments = action.payload;
        }
      )
      .addCase(fetchDoctorUpcomingAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An unknown error occurred";
      });
  },
});

export default doctorDashboardSlice.reducer;
