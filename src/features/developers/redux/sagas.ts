import { AxiosError, AxiosResponse } from 'axios';

import { SagaIterator } from 'redux-saga';
import {
  addDeveloperPayment,
  createDeveloper,
  fetchData,
  fetchDeveloperBalance,
  readDeveloper,
  setData,
  setDeveloperBalance,
  setDeveloperInfo,
  updateDeveloper,
} from './slice';
import { all, put, takeLatest } from 'redux-saga/effects';

import { axiosMain } from 'libs/axios-initialization';
import { failure, pending, success } from 'libs/remote';

import { Developer, DeveloperInfo, Payment } from '../types';

function* developersSaga(): SagaIterator {
  yield all([
    takeLatest(fetchData, function* fetchDataSaga() {
      try {
        yield put(setData(pending()));

        const { data }: AxiosResponse<Developer[]> = yield axiosMain.get('/developers');

        yield put(setData(success(data)));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setData(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(createDeveloper, function* createDeveloperSaga({ payload }) {
      try {
        yield put(setDeveloperInfo(pending()));

        const { data }: AxiosResponse<DeveloperInfo> = yield axiosMain.post('/developers', payload);

        if (data.id) {
          window.location.replace(`/developers/${data.id}`);
        }
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setDeveloperInfo(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(readDeveloper, function* readDeveloperSaga({ payload }) {
      try {
        yield put(setDeveloperInfo(pending()));

        const { data }: AxiosResponse<DeveloperInfo> = yield axiosMain.get(`/developers/${payload}`);

        yield put(setDeveloperInfo(success(data)));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setDeveloperInfo(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(updateDeveloper, function* updateDeveloperSaga({ payload }) {
      try {
        yield put(setDeveloperInfo(pending()));

        const { data }: AxiosResponse<DeveloperInfo> = yield axiosMain.put(`/developers/${payload.id}`, payload);

        if (data.id) {
          window.location.replace(`/developers/${data.id}`);
        }
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setDeveloperInfo(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(fetchDeveloperBalance, function* fetchDeveloperBalanceSaga({ payload }) {
      try {
        yield put(setDeveloperBalance(pending()));

        const { data }: AxiosResponse<Payment[]> = yield axiosMain.get(`/developers/${payload}/top-ups`);

        yield put(setDeveloperBalance(success(data)));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setDeveloperBalance(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),

    takeLatest(addDeveloperPayment, function* addDeveloperPaymentSaga({ payload }) {
      try {
        yield put(setDeveloperBalance(pending()));

        yield axiosMain.post(`/developers/${payload.id}/top-ups`, {
          developerId: payload.id,
          amount: payload.amount,
        });

        yield put(fetchDeveloperBalance(payload.id));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setDeveloperBalance(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
  ]);
}

export default developersSaga;
