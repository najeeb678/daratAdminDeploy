import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createDiscountsApi, createGiftApi, createLoyaltyBenefitsApi, getAllSubServicesApi, getDiscountsApi, getGiftApi, getLoyaltyPackagesApi } from "../api/loyaltyPointsApi";

interface LoyaltyPointsState {
  createLoyaltyPoints: any[] | null;
  subServices: any[] | null;
  loyaltyPackages: any[] | null;
  createCoupon: any | null;
  getCouponCode: any[] | null;
  createGift: any[] | null;
  gifts: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoyaltyPointsState = {
  createLoyaltyPoints: null,
  getCouponCode: null,
  createCoupon: null,
  subServices: null,
  gifts: null,
  createGift: null,
  loyaltyPackages: null,
  loading: false,
  error: null,
};


export const createLoyaltyPackage = createAsyncThunk(
    'loyalty/createLoyaltyPackage',
    async (payload: { loyaltyType: string; subServiceIds: string[], expiryDate: string }, { rejectWithValue }) => {
      try {
        const data = await createLoyaltyBenefitsApi(payload);
        return data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
  );

  export const createDiscount = createAsyncThunk(
    'loyalty/createDiscount',
    async (payload: { type: string; value: string}, { rejectWithValue }) => {
      try {
        const data = await createDiscountsApi(payload);
        return data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
  );

  export const createGiftSlice = createAsyncThunk(
    'loyalty/createGiftSlice',
    async (payload: { subServiceId: string}, { rejectWithValue }) => {
      try {
        const data = await createGiftApi(payload);
        return data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
  );

  export const getLoyaltyPackages = createAsyncThunk(
    'loyalty/getLoyaltyPackages',
    async (_, { rejectWithValue }) => {
      try {
        const data = await getLoyaltyPackagesApi();
        return data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
  );

  export const getGiftsSlice = createAsyncThunk(
    'loyalty/getGiftsSlice',
    async (_, { rejectWithValue }) => {
      try {
        const data = await getGiftApi();
        return data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
  );

  export const getSubservices = createAsyncThunk(
    'loyalty/getSubservices',
    async (_, { rejectWithValue }) => {
      try {
        const data = await getAllSubServicesApi();
        return data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
  );

  export const getDiscounts = createAsyncThunk(
    'loyalty/getDiscounts',
    async (_, { rejectWithValue }) => {
      try {
        const data = await getDiscountsApi();
        return data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
  );


const loyaltyPointsSlice = createSlice({
  name: "doctorDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLoyaltyPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createLoyaltyPackage.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.createLoyaltyPoints = action.payload;
        }
      )
      .addCase(createLoyaltyPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An unknown error occurred";
      });

      //create discounts

      builder
      .addCase(createDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createDiscount.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.createCoupon = action.payload;
        }
      )
      .addCase(createDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An unknown error occurred";
      });

      //create gifts

      builder
      .addCase(createGiftSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createGiftSlice.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.createGift = action.payload;
        }
      )
      .addCase(createGiftSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An unknown error occurred";
      });

      //get discounts

      builder
      .addCase(getDiscounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getDiscounts.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.getCouponCode = action.payload;
        }
      )
      .addCase(getDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An unknown error occurred";
      });

      //get gifts
      builder
      .addCase(getGiftsSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getGiftsSlice.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.gifts = action.payload;
        }
      )
      .addCase(getGiftsSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An unknown error occurred";
      });



      // get sub services
      builder
      .addCase(getSubservices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSubservices.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.subServices = action.payload;
        }
      )
      .addCase(getSubservices.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An unknown error occurred";
      });


      // get loyaltyPackages
      builder
      .addCase(getLoyaltyPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getLoyaltyPackages.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.loyaltyPackages = action.payload;
        }
      )
      .addCase(getLoyaltyPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An unknown error occurred";
      });

     
  },
});

export default loyaltyPointsSlice.reducer;
