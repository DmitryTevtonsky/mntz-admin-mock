import { AxiosError, AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, put, select, takeLatest } from 'redux-saga/effects';

import { axiosMain } from 'libs/axios-initialization';
import { failure, pending, success } from 'libs/remote';

import { Post, PostStatusEnum } from '../types';
import { fetchPublications, setPublications, updatePostState } from './slice';
import { selectActiveStatus } from './selectors';

function* mediaSaga(): SagaIterator {
  yield all([
    takeLatest(fetchPublications, function* fetchPublicationsSaga({ payload }) {
      try {
        yield put(setPublications(pending()));

        const { data }: AxiosResponse<Post[]> = yield axiosMain.get(`/publications/?state=${payload}`);
        yield put(setPublications(success(data)));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setPublications(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(updatePostState, function* updatePostStateSaga({ payload }) {
      try {
        yield put(setPublications(pending()));
        yield axiosMain.put(`/publications/${payload.id}`, {
          state: payload.state,
          rejectionReasonCode: payload.rejectionReasonCode,
        });

        const activeStatus: PostStatusEnum = yield select(selectActiveStatus);

        yield put(fetchPublications(activeStatus));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setPublications(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
  ]);
}

export default mediaSaga;
