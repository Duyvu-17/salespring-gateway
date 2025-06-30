import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { wishlistService } from "@/services/wishlist.service";
import type { WishlistItem } from "@/types/wishlist";

type WishlistState = {
  wishlist: WishlistItem[] | null;
  isLoading: boolean;
  error?: string | null;
};

const initialState: WishlistState = {
  wishlist: null,
  isLoading: false,
  error: null,
};

// Lấy danh sách wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const data = await wishlistService.getWishlist();
      return Array.isArray(data.wishlist) ? data.wishlist : [];
    } catch (err: unknown) {
      const error = err as { message?: string };
      return rejectWithValue(
        error.message || "Lỗi khi tải danh sách yêu thích"
      );
    }
  }
);

// Thêm sản phẩm vào wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId: string, { rejectWithValue }) => {
    try {
      const data = await wishlistService.addToWishlist(productId);
      return Array.isArray(data.wishlist) ? data.wishlist : [];
    } catch (err: unknown) {
      const error = err as { message?: string };
      return rejectWithValue(
        error.message || "Lỗi thêm vào danh sách yêu thích"
      );
    }
  }
);

// Xóa sản phẩm khỏi wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (itemId: string, { rejectWithValue }) => {
    try {
      const data = await wishlistService.removeFromWishlist(itemId);
      return Array.isArray(data.wishlist) ? data.wishlist : [];
    } catch (err: unknown) {
      const error = err as { message?: string };
      return rejectWithValue(
        error.message || "Lỗi xóa sản phẩm khỏi danh sách yêu thích"
      );
    }
  }
);

// Xóa toàn bộ wishlist
export const clearWishlist = createAsyncThunk(
  "wishlist/clearWishlist",
  async (_, { rejectWithValue }) => {
    try {
      await wishlistService.clearWishlist();
      return [];
    } catch (err: unknown) {
      const error = err as { message?: string };
      return rejectWithValue(error.message || "Lỗi xóa danh sách yêu thích");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlist: (state) => {
      state.wishlist = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchWishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchWishlist.fulfilled,
        (state, action: PayloadAction<WishlistItem[]>) => {
          state.wishlist = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.wishlist = null;
      })
      // addToWishlist
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        addToWishlist.fulfilled,
        (state, action: PayloadAction<WishlistItem[]>) => {
          state.wishlist = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // removeFromWishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        removeFromWishlist.fulfilled,
        (state, action: PayloadAction<WishlistItem[]>) => {
          state.wishlist = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // clearWishlist
      .addCase(clearWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearWishlist.fulfilled, (state) => {
        state.wishlist = [];
        state.isLoading = false;
      })
      .addCase(clearWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default wishlistSlice.reducer;

// Selector tiện ích
export const selectWishlist = (state: { wishlist: WishlistState }) =>
  state.wishlist.wishlist;
export const selectWishlistLoading = (state: { wishlist: WishlistState }) =>
  state.wishlist.isLoading;

// Hàm tiện ích cho component
export const getWishlistItem = (
  wishlist: WishlistItem[] | null,
  productId: string
) => wishlist?.find((item) => String(item.product_id) === String(productId));

export const isInWishlist = (
  wishlist: WishlistItem[] | null | undefined,
  productId: string
) =>
  Array.isArray(wishlist) &&
  wishlist.some((item) => String(item.product_id) === String(productId));

export const { resetWishlist } = wishlistSlice.actions;
