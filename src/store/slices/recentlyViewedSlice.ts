import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RecentlyViewedItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
};

type RecentlyViewedState = {
  recentlyViewed: RecentlyViewedItem[];
};

const initialState: RecentlyViewedState = {
  recentlyViewed: JSON.parse(localStorage.getItem("recentlyViewed") || "[]"),
};

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    addRecentlyViewed: (state, action: PayloadAction<RecentlyViewedItem>) => {
      // Loại bỏ item trùng id, thêm mới lên đầu, tối đa 4 item
      const filtered = state.recentlyViewed.filter(
        (i) => i.id !== action.payload.id
      );
      const newList = [action.payload, ...filtered].slice(0, 4);
      state.recentlyViewed = newList;
      localStorage.setItem("recentlyViewed", JSON.stringify(newList));
    },
  },
});

export const { addRecentlyViewed } = recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer;
