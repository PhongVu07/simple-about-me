import { createSlice } from '@reduxjs/toolkit'

interface ThemeState {
  mode: 'light' | 'dark'
}

const initialState: ThemeState = {
  mode: window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
  },
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
