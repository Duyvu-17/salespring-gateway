import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import recentlyViewedReducer from "./slices/recentlyViewedSlice";
import themeReducer from "./slices/themeSlice";
import wishlistReducer from "./slices/wishlistSlice";
import categoryReducer from "./slices/categorySlice";
import orderReducer from "./slices/orderSlice";
import shippingMethodReducer from "./slices/shippingMethodSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    recentlyViewed: recentlyViewedReducer,
    theme: themeReducer,
    wishlist: wishlistReducer,
    category: categoryReducer,
    order: orderReducer,
    shippingMethod: shippingMethodReducer,
    // Thêm các slice khác ở đây nếu có
    // Nếu đã có orderSlice:
    // order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
