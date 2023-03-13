/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RemoteData, initialized } from 'libs/remote';

import { Payment, PaymentsStatusEnum, UpdatePaymentsState } from '../types';

export interface PaymentsByBloggersState {
  data: RemoteData<Payment[]>;
  activeStatus: PaymentsStatusEnum;
}

const initialState: PaymentsByBloggersState = {
  data: initialized() as RemoteData<Payment[]>,
  activeStatus: PaymentsStatusEnum.pending,
};

export const paymentsByBloggersSlice = createSlice({
  name: 'payments-by-bloggers',
  initialState,
  reducers: {
    setActiveStatus: (state, action: PayloadAction<PaymentsStatusEnum>) => {
      state.activeStatus = action.payload;
    },
    fetchPayments: (_state, _action: PayloadAction<PaymentsStatusEnum>) => {},
    setPayments: (state, action: PayloadAction<RemoteData<Payment[]>>) => {
      state.data = action.payload;
    },
    updatePaymentsState: (_state, _action: PayloadAction<UpdatePaymentsState>) => {},
  },
});

export const { setActiveStatus, fetchPayments, setPayments, updatePaymentsState } = paymentsByBloggersSlice.actions;
export default paymentsByBloggersSlice.reducer;
