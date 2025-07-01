import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { shippingMethodService } from "@/services/shippingMethod.service";
import type { ShippingMethod } from "@/types/shippingMethod";

interface ShippingMethodState {
  list: ShippingMethod[];
  selected?: ShippingMethod;
  loading: boolean;
  error?: string;
}

const initialState: ShippingMethodState = {
  list: [],
  selected: undefined,
  loading: false,
  error: undefined,
};

export const fetchAllShippingMethods = createAsyncThunk(
  "shippingMethod/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await shippingMethodService.getAllShippingMethods();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchShippingMethodById = createAsyncThunk(
  "shippingMethod/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await shippingMethodService.getShippingMethodById(id);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const shippingMethodSlice = createSlice({
  name: "shippingMethod",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShippingMethods.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchAllShippingMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllShippingMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchShippingMethodById.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchShippingMethodById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchShippingMethodById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default shippingMethodSlice.reducer;
