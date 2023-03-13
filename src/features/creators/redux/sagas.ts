import { AxiosError, AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, put, select, takeLatest } from 'redux-saga/effects';

import { axiosMain } from 'libs/axios-initialization';
import { failure, pending, success } from 'libs/remote';

import { Creator, CreatorStatusEnum } from '../types';
import { fetchCreators, setCreators, updateCreatorState } from './slice';
import { selectActiveStatus } from './selectors';

function* creatorsSaga(): SagaIterator {
  yield all([
    takeLatest(fetchCreators, function* fetchCreatorsSaga({ payload }) {
      try {
        yield put(setCreators(pending()));

        const { data }: AxiosResponse<Creator[]> = yield axiosMain.get(`/creators/?state=${payload}`);

        yield put(setCreators(success(data)));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setCreators(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(updateCreatorState, function* updateCreatorStateSaga({ payload }) {
      try {
        yield put(setCreators(pending()));

        yield axiosMain.put(`/creators/${payload.id}`, {
          state: payload.state,
          rejectionReasonCode: payload.rejectionReasonCode,
        });

        const activeStatus: CreatorStatusEnum = yield select(selectActiveStatus);

        yield put(fetchCreators(activeStatus));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setCreators(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
  ]);
}

export default creatorsSaga;
