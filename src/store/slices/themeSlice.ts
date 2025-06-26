import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeType =
  | "light"
  | "dark"
  | "purple"
  | "ocean"
  | "sunset"
  | "forest"
  | "midnight"
  | "coffee";

type ThemeState = {
  theme: ThemeType;
};

const themes: ThemeType[] = [
  "light",
  "dark",
  "purple",
  "ocean",
  "sunset",
  "forest",
  "midnight",
  "coffee",
];

const getInitialTheme = (): ThemeType => {
  return (
    (localStorage.getItem("theme") as ThemeType) ||
    "forest"
  );
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
      updateHtmlTheme(action.payload);
    },
    toggleTheme: (state) => {
      const currentIndex = themes.indexOf(state.theme);
      const nextIndex = (currentIndex + 1) % themes.length;
      state.theme = themes[nextIndex];
      localStorage.setItem("theme", state.theme);
      updateHtmlTheme(state.theme);
    },
  },
});

function updateHtmlTheme(theme: ThemeType) {
  const htmlElement = document.documentElement;
  htmlElement.classList.remove(...themes);
  htmlElement.classList.add(theme);
  htmlElement.setAttribute("data-theme", theme);
}

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
