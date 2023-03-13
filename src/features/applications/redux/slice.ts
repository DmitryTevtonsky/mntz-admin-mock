/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RemoteData, initialized } from 'libs/remote';

import { Application, ApplicationInfo, DeveloperForSelect } from '../types';

export interface ApplicationsState {
  data: RemoteData<Application[]>;
  applicationInfo: RemoteData<ApplicationInfo>;
  developersForSelect: RemoteData<DeveloperForSelect[]>;
}

const initialState: ApplicationsState = {
  data: initialized() as RemoteData<Application[]>,
  applicationInfo: initialized() as RemoteData<ApplicationInfo>,
  developersForSelect: initialized() as RemoteData<DeveloperForSelect[]>,
};

export const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    fetchApplications: () => {},
    setData: (state, action: PayloadAction<RemoteData<Application[]>>) => {
      state.data = action.payload;
    },

    fetchDevelopersForSelect: () => {},
    setDevelopersForSelect: (state, action: PayloadAction<RemoteData<DeveloperForSelect[]>>) => {
      state.developersForSelect = action.payload;
    },

    createApplication: (_state, _action: PayloadAction<ApplicationInfo>) => {},
    readApplication: (_state, _action: PayloadAction<string>) => {},
    updateApplication: (_state, _action: PayloadAction<ApplicationInfo>) => {},

    setApplicationInfo: (state, action: PayloadAction<RemoteData<ApplicationInfo>>) => {
      state.applicationInfo = action.payload;
    },
  },
});

export const {
  fetchApplications,
  setData,
  setApplicationInfo,
  createApplication,
  readApplication,
  updateApplication,
  fetchDevelopersForSelect,
  setDevelopersForSelect,
} = applicationsSlice.actions;
export default applicationsSlice.reducer;
