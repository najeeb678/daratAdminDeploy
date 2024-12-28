import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  uploadImageApi,
  submitDoctorApi,
  getAllDoctorsApi,
  fetchDoctorByIdApi,
  upDateDoctorApi,
  deleteDoctorApi,
  getAllServicesApi,
} from "../api/doctorApi";

// Async thunk for uploading the image
export const uploadImage = createAsyncThunk(
  "doctors/uploadImage",
  async (imageData: FormData, thunkAPI) => {
    try {
      // Call the API to upload the image

      const uploadedImageUrl = await uploadImageApi(imageData);

      return uploadedImageUrl; // Return the uploaded image URL
    } catch (error: unknown) {
      // Handle error gracefully
      let message = "Failed to upload image";

      if (error instanceof Error) {
        message = error.message;
      } else if (error && (error as any).response?.data) {
        message = (error as any).response.data || "Failed to upload image";
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const submitDoctorForm = createAsyncThunk(
  "doctors/submitDoctorForm",
  async (doctorData: any, { rejectWithValue }) => {
    try {
      const response = await submitDoctorApi(doctorData); // API call
      return response.data;
    } catch (err: any) {

      return rejectWithValue(
        err?.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const getAllDoctors = createAsyncThunk<
  any,
  { search?: string; filter?: string } | any
>("doctors/getAllDoctors", async (filters, { rejectWithValue }) => {
  try {
    const data = await getAllDoctorsApi(filters);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Something went wrong");
  }
});
export const getAllServices = createAsyncThunk<any, void>(
  "doctors/getAllServices",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllServicesApi();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const fetchDoctorById = createAsyncThunk(
  "doctors/fetchDoctorById",
  async (id: any, { rejectWithValue }) => {
    try {
      const res = await fetchDoctorByIdApi(id);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const upDateDoctor = createAsyncThunk(
  "doctors/upDateDoctor",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await upDateDoctorApi({ id, data }); // Pass id and data
      return res.data; // Return the API response
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const deleteDoctor = createAsyncThunk(
  "doctors/deleteDoctor",
  async (id: any, { rejectWithValue }) => {
    try {
      const res = await deleteDoctorApi(id);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

// Slice for managing doctor form state
const doctorsSlice = createSlice({
  name: "doctors",
  initialState: {
    doctorsData: [],
   
    doctorServices: [],
    loadingdoctorsData: false,
    errorgettingDoctorsData: null as any | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDoctors.pending, (state) => {
        state.loadingdoctorsData = true;
        state.errorgettingDoctorsData = null;
      })
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        state.loadingdoctorsData = false;
        state.doctorsData = action.payload;
        state.errorgettingDoctorsData = null;
      })
      .addCase(getAllDoctors.rejected, (state, action) => {
        state.loadingdoctorsData = false;
        state.errorgettingDoctorsData = action.payload;
      })
  
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.doctorsData = state.doctorsData.filter(
          (doctor: any) => doctor.id !== action.payload.id
        );
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.doctorServices = action.payload;
      });
  },
});

export default doctorsSlice.reducer;
