/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ICoreState {
  sidebarVisibility: boolean;
}

const initialState: ICoreState = {
  sidebarVisibility: false,
};

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    fetchUser: () => {},
    fetchDictionaries: () => {},
    toggleSidebarVisibility: (state) => {
      state.sidebarVisibility = !state.sidebarVisibility;
    },
    setSidebarVisibility: (state, action: PayloadAction<any, any>) => {
      state.sidebarVisibility = action.payload;
    },
  },
});

export const { fetchUser, fetchDictionaries, toggleSidebarVisibility, setSidebarVisibility } = coreSlice.actions;
export default coreSlice.reducer;
