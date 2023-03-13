/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RemoteData, initialized } from 'libs/remote';

import { Creator, CreatorStatusEnum, UpdateMediaState } from '../types';

export interface CreatorsState {
  data: RemoteData<Creator[]>;
  activeStatus: CreatorStatusEnum;
}

const initialState: CreatorsState = {
  data: initialized() as RemoteData<Creator[]>,
  activeStatus: CreatorStatusEnum.created,
};

export const creatorsSlice = createSlice({
  name: 'creators',
  initialState,
  reducers: {
    setActiveStatus: (state, action: PayloadAction<CreatorStatusEnum>) => {
      state.activeStatus = action.payload;
    },
    fetchCreators: (_state, _action: PayloadAction<CreatorStatusEnum>) => {},
    setCreators: (state, action: PayloadAction<RemoteData<Creator[]>>) => {
      state.data = action.payload;
    },
    updateCreatorState: (_state, _action: PayloadAction<UpdateMediaState>) => {},
  },
});

export const { setActiveStatus, fetchCreators, setCreators, updateCreatorState } = creatorsSlice.actions;
export default creatorsSlice.reducer;
