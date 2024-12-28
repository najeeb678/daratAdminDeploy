import { sidebarData } from "../../utils/SidebarData";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createScheduleApi,
  deleteScheduleApi,
  fetchScheduleByIdApi,
  getScheduleApi,
} from "../api/ScheduleApi";

export const getSchedule = createAsyncThunk<
  any,
  { search?: string; filter?: string } | any
>("schedule/getSchedule", async (filters, { rejectWithValue }) => {
  try {
    const data = await getScheduleApi(filters);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Something went wrong");
  }
});

export const createSchedule = createAsyncThunk(
  "schedule/createSchedule",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await createScheduleApi(data);
      return response.data;
    } catch (err: any) {
      console.error("????", err?.response?.data?.message);
      const errorMessage =
        err?.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchScheduleById = createAsyncThunk(
  "schedule/fetchScheduleById",
  async (
    {
      id,
      doctorId,
      weekday,
    }: { id: string; doctorId: string; weekday: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchScheduleByIdApi(id, doctorId, weekday);

      return response; // Return the fetched schedule data
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const deleteSchedule = createAsyncThunk(
  "schedule/deleteSchedule",
  async (id: any, { rejectWithValue }) => {
    try {
      const res = await deleteScheduleApi(id);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    scheduleData: [],
    scheduleLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSchedule.pending, (state) => {
        state.scheduleLoading = true;
      })
      .addCase(getSchedule.fulfilled, (state, action) => {
        state.scheduleLoading = false;
        state.scheduleData = action.payload;
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.scheduleData = state.scheduleData.filter(
          (schedule: any) => schedule.id !== action.payload.id
        );
      });
  },
});

export default scheduleSlice.reducer;
