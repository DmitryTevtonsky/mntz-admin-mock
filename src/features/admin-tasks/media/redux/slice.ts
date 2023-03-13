/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RemoteData, initialized } from 'libs/remote';

import { Media, MediaStatusEnum, UpdateMediaState } from '../types';

export interface MediaByBloggersState {
  data: RemoteData<Media[]>;
  activeStatus: MediaStatusEnum;
}

const initialState: MediaByBloggersState = {
  data: initialized() as RemoteData<Media[]>,
  activeStatus: MediaStatusEnum.under_review,
};

export const mediaByBloggersSlice = createSlice({
  name: 'media-by-bloggers',
  initialState,
  reducers: {
    setActiveStatus: (state, action: PayloadAction<MediaStatusEnum>) => {
      state.activeStatus = action.payload;
    },
    fetchMedia: (_state, _action: PayloadAction<MediaStatusEnum>) => {},
    setMedia: (state, action: PayloadAction<RemoteData<Media[]>>) => {
      state.data = action.payload;
    },
    updateMediaState: (_state, _action: PayloadAction<UpdateMediaState>) => {},
  },
});

export const { setActiveStatus, fetchMedia, setMedia, updateMediaState } = mediaByBloggersSlice.actions;
export default mediaByBloggersSlice.reducer;
