import { AxiosError, AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, put, select, takeLatest } from 'redux-saga/effects';

import { axiosMain } from 'libs/axios-initialization';
import { failure, pending, success } from 'libs/remote';

import { Payment, PaymentsStatusEnum } from '../types';
import { fetchPayments, setPayments, updatePaymentsState } from './slice';
import { selectActiveStatus } from './selectors';

function* paymentsSaga(): SagaIterator {
  yield all([
    takeLatest(fetchPayments, function* fetchPaymentsSaga({ payload }) {
      try {
        yield put(setPayments(pending()));

        const { data }: AxiosResponse<Payment[]> = yield axiosMain.get(`/payments/?state=${payload}`);

        yield put(setPayments(success(data)));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setPayments(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(updatePaymentsState, function* updatePaymentsStateSaga({ payload }) {
      try {
        yield put(setPayments(pending()));

        yield axiosMain.put(`/payments/${payload.id}`, {
          state: payload.state,
          rejectionReasonCode: payload.rejectionReasonCode,
        });

        const activeStatus: PaymentsStatusEnum = yield select(selectActiveStatus);

        yield put(fetchPayments(activeStatus));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setPayments(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
  ]);
}

export default paymentsSaga;
