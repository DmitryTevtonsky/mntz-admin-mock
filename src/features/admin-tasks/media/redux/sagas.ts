import { AxiosError, AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, put, select, takeLatest } from 'redux-saga/effects';

import { axiosMain } from 'libs/axios-initialization';
import { failure, pending, success } from 'libs/remote';

import { Media, MediaStatusEnum } from '../types';
import { fetchMedia, setMedia, updateMediaState } from './slice';
import { selectActiveStatus } from './selectors';

function* mediaSaga(): SagaIterator {
  yield all([
    takeLatest(fetchMedia, function* fetchMediaSaga({ payload }) {
      try {
        yield put(setMedia(pending()));

        const { data }: AxiosResponse<Media[]> = yield axiosMain.get(`/media/?state=${payload}`);

        yield put(setMedia(success(data)));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setMedia(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(updateMediaState, function* updateMediaStateSaga({ payload }) {
      try {
        yield put(setMedia(pending()));

        yield axiosMain.put(`/media/${payload.id}`, {
          state: payload.state,
          rejectionReasonCode: payload.rejectionReasonCode,
        });

        const activeStatus: MediaStatusEnum = yield select(selectActiveStatus);

        yield put(fetchMedia(activeStatus));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setMedia(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
  ]);
}

export default mediaSaga;
