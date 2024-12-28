import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCetegoryApi,
  createProductApi,
  deleteProductApi,
  fetchCustomerShipmentDataApi,
  fetchProductByIdApi,
  getAllCategoriesApi,
  getAllPharmacyProductsApi,
  updateOrderStatusApi,
  upDateProductApi,
} from "../api/PharmacyApi";

export const getAllPharmacyProducts = createAsyncThunk<
  any,
  { search?: string; filter?: string } | any
>("paharmacy/getAllPharmacyProducts", async (filters, { rejectWithValue }) => {
  try {
    const data = await getAllPharmacyProductsApi(filters);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Something went wrong");
  }
});
export const fetchProductById = createAsyncThunk(
  "paharmacy/fetchProductById",
  async (id: any, { rejectWithValue }) => {
    try {
      const res = await fetchProductByIdApi(id);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "paharmacy/deleteProduct",
  async (id: any, { rejectWithValue }) => {
    try {
      const res = await deleteProductApi(id);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const createCetegory = createAsyncThunk(
  "paharmacy/createCetegory",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await createCetegoryApi(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching slots");
    }
  }
);
export const createProduct = createAsyncThunk(
  "paharmacy/createProduct",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await createProductApi(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching slots");
    }
  }
);
export const getAllCategories = createAsyncThunk(
  "paharmacy/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCategoriesApi();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching slots");
    }
  }
);
export const upDateProduct = createAsyncThunk(
  "paharmacy/upDateProduct",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await upDateProductApi({ id, data }); // Pass id and data
      return res.data; // Return the API response
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const updateOrderStatus = createAsyncThunk(
  "pharmacy/updateOrderStatus",
  async (
    { orderId, status }: { orderId: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateOrderStatusApi({ orderId, status });

      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const fetchCustomerShipmentData = createAsyncThunk(
  "pharmacy/fetchCustomerShipmentData",
  async (params: { search?: string } = {}, { rejectWithValue }) => {
    try {
      return await fetchCustomerShipmentDataApi(params);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const paharmacySlice = createSlice({
  name: "paharmacy",
  initialState: {
    allPharmacyProductsData: [],
    allCategories: [],
    loadingPharmacyProductsData: false,
    allOrdersShipmentData: <any>[],
    loadingOrdersShipmentData: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPharmacyProducts.pending, (state) => {
        state.loadingPharmacyProductsData = true;
      })
      .addCase(getAllPharmacyProducts.fulfilled, (state, action) => {
        state.loadingPharmacyProductsData = false;
        state.allPharmacyProductsData = action.payload;
      })

      .addCase(getAllPharmacyProducts.rejected, (state, action) => {
        state.loadingPharmacyProductsData = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.allPharmacyProductsData = state.allPharmacyProductsData.filter(
          (product: any) => product.id !== action.payload.id
        );
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.allCategories = action.payload;
      })
      .addCase(fetchCustomerShipmentData.pending, (state) => {
        state.loadingOrdersShipmentData = true;
      })
      .addCase(fetchCustomerShipmentData.fulfilled, (state, action) => {
        state.allOrdersShipmentData = action.payload;
        state.loadingOrdersShipmentData = false;
      })

      .addCase(fetchCustomerShipmentData.rejected, (state, action) => {
        state.loadingOrdersShipmentData = false;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.allOrdersShipmentData = state.allOrdersShipmentData.map(
          (order: any) => {
            if (order.id === action.payload.id) {
              return { ...order, status: action.payload.status };
            }
            return order;
          }
        );
      });
  },
});

export default paharmacySlice.reducer;
