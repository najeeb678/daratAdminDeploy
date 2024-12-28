import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createServicesApi,
  createSubServicesApi,
  deleteServiceApi,
  deleteSubServiceApi,
  getAllServicesApi,
  getAllsubServicesApi,
  getAllsubServicesOfASubServiceApi,
  getDoctorsofSubServiceApi,
  updateServicesApi,
  updateServiceStatusApi,
  updateSubServicesApi,
  updateSubServiceStatusApi,
} from "../api/ServicesApi";

export const getAllsubServices = createAsyncThunk<
  any,
  { search?: string; filter?: string } | any
>("service/getAllsubServices", async (filters, { rejectWithValue }) => {
  try {
    const data = await getAllsubServicesApi(filters);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Something went wrong");
  }
});

export const getAllServices = createAsyncThunk<
  any,
  { search?: string; filter?: string } | any
>("service/getAllServices", async (filters, { rejectWithValue }) => {
  try {
    const data = await getAllServicesApi(filters);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Something went wrong");
  }
});

export const getDoctorsofSubService = createAsyncThunk(
  "service/getDoctorsofSubService",
  async (id: any, { rejectWithValue }) => {
    try {
      const res = await getDoctorsofSubServiceApi(id);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const createServices = createAsyncThunk(
  "service/createServices",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await createServicesApi(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const updateStatusOfSubService = createAsyncThunk(
  "service/updateStatusOfSubService",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await updateSubServiceStatusApi(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const updateStatusOfService = createAsyncThunk(
  "service/updateStatusOfService",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await updateServiceStatusApi(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const deleteServices = createAsyncThunk(
  "service/deleteServices",
  async (id: any, { rejectWithValue }) => {
    try {
      const res = await deleteServiceApi(id);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const deleteSubServices = createAsyncThunk(
  "service/deleteSubServices",
  async (id: any, { rejectWithValue }) => {
    try {
      const res = await deleteSubServiceApi(id);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const updateServices = createAsyncThunk(
  "service/updateServices",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await updateServicesApi(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const updateSubServices = createAsyncThunk(
  "service/updateSubServices",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await updateSubServicesApi(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const createSubServices = createAsyncThunk(
  "service/createSubServices",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await createSubServicesApi(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const getSubServicesofService = createAsyncThunk(
  "service/getSubServicesofService",
  async (id: any, { rejectWithValue }) => {
    try {
      const res = await getAllsubServicesOfASubServiceApi(id);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    createService: {},
    updateSubServiceStatus: {},
    updateServiceStatus: {},
    updateService: {},
    updateSubService:{},
    createSubService: {},
    deleteService: {},
    deleteSubService: {},
    allServicesData: [],
    subServicesData: [],
    subServicesOfService: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllServices.fulfilled, (state, action) => {
      state.allServicesData = action.payload;
    });

    builder.addCase(createServices.fulfilled, (state: any, action) => {
      if (action.payload) {
        state.allServicesData = [...state.allServicesData, action.payload];
      }
      state.createService = action.payload;
    });

    builder.addCase(getAllsubServices.fulfilled, (state, action) => {
      state.subServicesData = action.payload;
    });

    builder.addCase(getSubServicesofService.fulfilled, (state, action) => {
      state.subServicesOfService = action.payload;
    });

    builder.addCase(updateStatusOfSubService.fulfilled, (state:any, action) => {
      const { id, is_Active } = action.payload; 
      state.subServicesOfService = state.subServicesOfService.map((subService:any) =>
        subService.id === id ? { ...subService, is_Active } : subService
      );
      state.updateSubServiceStatus = action.payload; 
    });

    builder.addCase(updateStatusOfService.fulfilled, (state:any, action) => {
      const { id, is_Active } = action.payload; 
      state.allServicesData = state.allServicesData.map((service:any) =>
        service.id === id ? { ...service, is_Active } : service
      );
      state.updateServiceStatus = action.payload; 
    });
    

    builder.addCase(createSubServices.fulfilled, (state, action) => {
      state.createSubService = action.payload;
    });

    builder.addCase(updateServices.fulfilled, (state:any, action) => {
      if (action.payload) {
        const updatedServiceIndex = state.allServicesData.findIndex(
          (service: any) => service.id === action.payload.id
        );
        if (updatedServiceIndex !== -1) {
          state.allServicesData[updatedServiceIndex] = action.payload;
        }
      }
      state.updateService = action.payload;
    });

    builder.addCase(updateSubServices.fulfilled, (state:any, action) => {
      if (action.payload) {
        const updatedSubServiceIndex = state.subServicesOfService.findIndex(
          (subService: any) => subService.id === action.payload.id
        );
        if (updatedSubServiceIndex !== -1) {
          state.subServicesOfService[updatedSubServiceIndex] = action.payload;
        }
      }
      state.updateSubService = action.payload;
    });

    builder.addCase(deleteServices.fulfilled, (state, action) => {
      if (action.payload) {
        state.allServicesData = state.allServicesData.filter(
          (service: any) => service.id !== action.payload.id
        );
      }
      state.deleteService = action.payload;
    });

    builder.addCase(deleteSubServices.fulfilled, (state, action) => {
      if (action.payload) {
        state.subServicesOfService = state.subServicesOfService.filter(
          (subService: any) => subService.id !== action.payload.id
        );
      }
      state.deleteSubService = action.payload;
    });
  },
});

export default servicesSlice.reducer;
