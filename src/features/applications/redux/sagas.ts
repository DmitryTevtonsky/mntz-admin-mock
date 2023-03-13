import { SagaIterator } from 'redux-saga';
import { all, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { PresignedUrlResponse } from 'types';
import { axiosMain } from 'libs/axios-initialization';
import { failure, pending, success } from 'libs/remote';

import { Application, ApplicationInfo } from '../types';
import { Developer } from 'features/developers/types';
import {
  createApplication,
  fetchApplications,
  fetchDevelopersForSelect,
  readApplication,
  setApplicationInfo,
  setData,
  setDevelopersForSelect,
  updateApplication,
} from './slice';

const presignedUrlPayload = {
  fileType: 'jpg',
};

function* applicationsSaga(): SagaIterator {
  yield all([
    takeLatest(fetchApplications, function* fetchDataSaga() {
      try {
        yield put(setData(pending()));

        const { data }: AxiosResponse<Application[]> = yield axiosMain.get('/apps');

        yield put(setData(success(data)));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setData(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(fetchDevelopersForSelect, function* fetchDevelopersForSelectSaga() {
      try {
        yield put(setDevelopersForSelect(pending()));

        const { data }: AxiosResponse<Developer[]> = yield axiosMain.get('/developers');

        const developersForSelect = data.map((dev) => ({
          id: dev.id,
          name: dev.companyName,
        }));

        yield put(setDevelopersForSelect(success(developersForSelect)));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setDevelopersForSelect(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(createApplication, function* createApplicationSaga({ payload }) {
      try {
        yield put(setApplicationInfo(pending()));

        const { data: presignedUrlResponse }: AxiosResponse<PresignedUrlResponse> = yield axiosMain.post(
          '/apps/presigned-url',
          presignedUrlPayload
        );

        const binary: ArrayBuffer = yield payload.iconFile!.arrayBuffer();

        yield axios.put(presignedUrlResponse.uploadUrl, binary);

        const createApplicationPayload = payload;
        delete createApplicationPayload.iconFile;
        createApplicationPayload.iconUrl = presignedUrlResponse.uploadUrl.split('?')[0];

        const { data }: AxiosResponse<ApplicationInfo> = yield axiosMain.post('/apps', createApplicationPayload);

        if (data.id) {
          window.location.replace(`/applications/${data.id}`);
        }
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setApplicationInfo(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(readApplication, function* readApplicationSaga({ payload }) {
      try {
        yield put(setApplicationInfo(pending()));

        const { data }: AxiosResponse<ApplicationInfo> = yield axiosMain.get(`/apps/${payload}`);
        yield put(setApplicationInfo(success(data)));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setApplicationInfo(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(updateApplication, function* updateApplicationSaga({ payload }) {
      try {
        yield put(setApplicationInfo(pending()));

        if (payload.iconUrl) {
          const updateApplicationPayload = payload;
          delete updateApplicationPayload.iconFile;

          const { data }: AxiosResponse<Application> = yield axiosMain.put(
            `/apps/${payload.id}`,
            updateApplicationPayload
          );

          if (data.id) {
            window.location.replace(`/applications/${data.id}`);
          }

          return;
        }

        const { data: presignedUrlResponse }: AxiosResponse<PresignedUrlResponse> = yield axiosMain.post(
          '/apps/presigned-url',
          {
            appId: payload.id,
            fileType: 'jpg',
          }
        );

        const binary: ArrayBuffer = yield payload.iconFile!.arrayBuffer();

        yield axios.put(presignedUrlResponse.uploadUrl, binary);

        const updateApplicationPayload = payload;
        delete updateApplicationPayload.iconFile;
        updateApplicationPayload.iconUrl = presignedUrlResponse.uploadUrl.split('?')[0];

        const { data }: AxiosResponse<Application> = yield axiosMain.put(
          `/apps/${payload.id}`,
          updateApplicationPayload
        );

        if (data.id) {
          window.location.replace(`/applications/${data.id}`);
        }
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setApplicationInfo(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
  ]);
}

export default applicationsSaga;
