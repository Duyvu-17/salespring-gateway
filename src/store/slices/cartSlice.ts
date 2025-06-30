import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { cartService } from "@/services/cart.service";
import type { Cart, CartItem } from "@/types/cart";

type CartState = {
  cart: Cart | null;
  isLoading: boolean;
};

const initialState: CartState = {
  cart: null,
  isLoading: false,
};

// Async thunk
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const cartData = await cartService.getCart();
  // Lấy trạng thái selected từ localStorage
  const selectedMap = JSON.parse(localStorage.getItem("cart_selected") || "{}");
  return {
    ...cartData,
    cart_items: cartData.cart_items.map((item) => ({
      ...item,
      selected:
        typeof selectedMap[item.id] === "boolean" ? selectedMap[item.id] : true,
    })),
  };
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({
    product_id,
    quantity,
  }: {
    product_id: string;
    quantity?: number;
  }) => {
    const updatedCart = await cartService.addToCart(product_id, quantity || 1);
    return updatedCart;
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
    const updatedCart = await cartService.updateCartItem(itemId, quantity);
    return updatedCart;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId: string) => {
    const updatedCart = await cartService.removeFromCart(itemId);
    return updatedCart;
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  await cartService.clearCart();
  return null;
});

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleItemSelection: (
      state,
      action: PayloadAction<{ itemId: number; selected: boolean }>
    ) => {
      if (!state.cart) return;
      state.cart.cart_items = state.cart.cart_items.map((item) =>
        item.id === action.payload.itemId
          ? { ...item, selected: action.payload.selected }
          : item
      );
      saveSelectedToLocalStorage(state.cart);
    },
    selectAllItems: (state, action: PayloadAction<boolean>) => {
      if (!state.cart) return;
      state.cart.cart_items = state.cart.cart_items.map((item) => ({
        ...item,
        selected: action.payload,
      }));
      saveSelectedToLocalStorage(state.cart);
    },
    resetCart: (state) => {
      state.cart = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.cart = null;
        state.isLoading = false;
      })
      // Các case cho addToCart, updateCartItem, removeFromCart, clearCart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = false;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
        saveSelectedToLocalStorage(action.payload);
        state.isLoading = false;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        saveSelectedToLocalStorage(action.payload);
        state.isLoading = false;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = null;
        state.isLoading = false;
      });
  },
});

// Hàm lưu trạng thái selected vào localStorage
function saveSelectedToLocalStorage(cart: Cart) {
  const selectedMap = Object.fromEntries(
    cart.cart_items.map((item) => [item.id, item.selected])
  );
  localStorage.setItem("cart_selected", JSON.stringify(selectedMap));
}

export const { toggleItemSelection, selectAllItems, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
