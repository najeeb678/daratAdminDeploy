import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  bookAppointmentApi,
  changeAppointmentStatusApi,
  deleteAppointmentApi,
  getAllAppointmentsApi,
  getAppointmentsSlotsOfDoctorApi,
} from "../api/AppointmentApi";

export const getAllAppointments = createAsyncThunk<
  any,
  { search?: string; filter?: string } | any
>("appointments/getAllAppointments", async (filters, { rejectWithValue }) => {
  try {
    const data = await getAllAppointmentsApi(filters);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Something went wrong");
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
export const getAppointmentsSlotsOfDoctor = createAsyncThunk(
  "appointments/getSlots",
  async (
    payload: { doctorId: string; dateSelected: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getAppointmentsSlotsOfDoctorApi(payload);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching slots");
    }
  }
);
export const bookAppointment = createAsyncThunk(
  "appointments/bookAppointment",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await bookAppointmentApi(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching slots");
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointments/deleteAppointment",
  async (id: any, { rejectWithValue }) => {
    try {
      const res = await deleteAppointmentApi(id);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointmentsData: <any>[],
    loadingappointmentsData: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAppointments.pending, (state) => {
        state.loadingappointmentsData = true;
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.loadingappointmentsData = false;
        state.appointmentsData = action.payload;
      })
      .addCase(deleteAppointment.fulfilled, (state, action): any => {
        state.appointmentsData = state.appointmentsData.filter(
          (schedule: any) => schedule.id !== action.payload.id
        );
      })
      .addCase(changeAppointmentStatus.fulfilled, (state, action): any => {
        const { id, status } = action.payload;

        state.appointmentsData = state.appointmentsData.map(
          (appointment: { id: string; status: string }) =>
            appointment.id === id ? { ...appointment, status } : appointment
        );
      });
  },
});

export default appointmentSlice.reducer;
