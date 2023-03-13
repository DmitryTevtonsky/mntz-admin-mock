/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Media } from 'features/admin-tasks/media/types';
import { RemoteData, initialized } from 'libs/remote';

import {
  ActivePost,
  AppForSelect,
  AppInfoShort,
  CreateOfferMediaAssetPayload,
  Offer,
  OfferInfo,
  OfferInfoForm,
  UpdateOfferStatePayload,
} from '../types';

export interface OffersState {
  offersData: RemoteData<Offer[]>;
  offerInfo: RemoteData<OfferInfo>;
  applicationsForSelect: RemoteData<AppForSelect[]>;
  appInfo: RemoteData<AppInfoShort>;
  offerMedia: RemoteData<Media[]>;
  offerActivePosts: RemoteData<ActivePost[]>;
}

const initialState: OffersState = {
  offersData: initialized() as RemoteData<Offer[]>,
  offerInfo: initialized() as RemoteData<OfferInfo>,
  applicationsForSelect: initialized() as RemoteData<AppForSelect[]>,
  appInfo: initialized() as RemoteData<AppInfoShort>,
  offerMedia: initialized() as RemoteData<Media[]>,
  offerActivePosts: initialized() as RemoteData<ActivePost[]>,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    fetchOffersData: () => {},
    setOffersData: (state, action: PayloadAction<RemoteData<Offer[]>>) => {
      state.offersData = action.payload;
    },

    fetchApplicationsForSelect: () => {},
    setApplicationsForSelect: (state, action: PayloadAction<RemoteData<AppForSelect[]>>) => {
      state.applicationsForSelect = action.payload;
    },

    fetchAppInfo: (_state, _action: PayloadAction<string>) => {},
    setAppInfo: (state, action: PayloadAction<RemoteData<AppInfoShort>>) => {
      state.appInfo = action.payload;
    },

    fetchOfferMedia: (_state, _action: PayloadAction<string>) => {},
    setOfferMedia: (state, action: PayloadAction<RemoteData<Media[]>>) => {
      state.offerMedia = action.payload;
    },

    fetchOfferActivePosts: (_state, _action: PayloadAction<string>) => {},
    setOfferActivePosts: (state, action: PayloadAction<RemoteData<ActivePost[]>>) => {
      state.offerActivePosts = action.payload;
    },

    createOffer: (_state, _action: PayloadAction<OfferInfoForm>) => {},
    readOffer: (_state, _action: PayloadAction<string>) => {},
    updateOffer: (_state, _action: PayloadAction<OfferInfoForm>) => {},

    createOfferMediaAsset: (_state, _action: PayloadAction<CreateOfferMediaAssetPayload>) => {},

    setOfferInfo: (state, action: PayloadAction<RemoteData<OfferInfo>>) => {
      state.offerInfo = action.payload;
    },

    updateOfferState: (_state, _action: PayloadAction<UpdateOfferStatePayload>) => {},
  },
});

export const {
  fetchOffersData,
  setOffersData,
  fetchApplicationsForSelect,
  setApplicationsForSelect,
  fetchAppInfo,
  setAppInfo,
  fetchOfferMedia,
  setOfferMedia,
  fetchOfferActivePosts,
  setOfferActivePosts,
  createOffer,
  readOffer,
  updateOffer,
  createOfferMediaAsset,
  setOfferInfo,
  updateOfferState,
} = offersSlice.actions;
export default offersSlice.reducer;
