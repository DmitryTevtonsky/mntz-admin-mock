/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RemoteData, initialized } from 'libs/remote';

import { AddDeveloperPaymentPayload, Developer, DeveloperInfo, Payment } from '../types';

export interface DeveloperState {
  data: RemoteData<Developer[]>;
  developerInfo: RemoteData<DeveloperInfo>;
  balance: RemoteData<Payment[]>;
}

const initialState: DeveloperState = {
  data: initialized() as RemoteData<Developer[]>,
  developerInfo: initialized() as RemoteData<DeveloperInfo>,
  balance: initialized() as RemoteData<Payment[]>,
};

export const developersSlice = createSlice({
  name: 'developers',
  initialState,
  reducers: {
    fetchData: () => {},
    setData: (state, action: PayloadAction<RemoteData<Developer[]>>) => {
      state.data = action.payload;
    },

    createDeveloper: (_state, _action: PayloadAction<DeveloperInfo>) => {},
    readDeveloper: (_state, _action: PayloadAction<string>) => {},
    updateDeveloper: (_state, _action: PayloadAction<DeveloperInfo>) => {},

    fetchDeveloperBalance: (_state, _action: PayloadAction<string>) => {},
    setDeveloperBalance: (state, action: PayloadAction<RemoteData<Payment[]>>) => {
      state.balance = action.payload;
    },
    addDeveloperPayment: (_state, _action: PayloadAction<AddDeveloperPaymentPayload>) => {},

    setDeveloperInfo: (state, action: PayloadAction<RemoteData<DeveloperInfo>>) => {
      state.developerInfo = action.payload;
    },
  },
});

export const {
  fetchData,
  setData,
  createDeveloper,
  readDeveloper,
  updateDeveloper,
  setDeveloperInfo,
  fetchDeveloperBalance,
  setDeveloperBalance,
  addDeveloperPayment,
} = developersSlice.actions;
export default developersSlice.reducer;
