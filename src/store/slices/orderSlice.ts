import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  CreateOrderPayload,
  BillingInfo,
  ShippingInfo,
  OrderItem,
} from "@/services/order.service";
import { createOrder } from "@/services/order.service";

interface OrderState {
  orderData: unknown;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orderData: null,
  isLoading: false,
  error: null,
};

function isAxiosErrorWithMessage(
  err: unknown
): err is { response: { data: { message: string } } } {
  return (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as { response?: unknown }).response === "object" &&
    (err as { response: { data?: unknown } }).response.data !== undefined &&
    typeof (err as { response: { data: { message?: unknown } } }).response.data
      .message === "string"
  );
}

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (payload: CreateOrderPayload, { rejectWithValue }) => {
    try {
      const data = await createOrder(payload);
      return data;
    } catch (err: unknown) {
      if (isAxiosErrorWithMessage(err)) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue("Tạo đơn hàng thất bại");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
