import { SagaIterator } from 'redux-saga';
import { all, put, takeLatest } from 'redux-saga/effects';
import { fetchDictionaries, fetchUser } from './slice';

function* coreSaga(): SagaIterator {
  yield all([
    takeLatest(fetchDictionaries, function* fetchDictionariesSaga() {
      try {
        yield put(fetchUser());
      } catch (error) {
        console.log(error);
      }
    }),
  ]);
}

export default coreSaga;
