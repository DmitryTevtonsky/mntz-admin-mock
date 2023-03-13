import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { combineReducers } from '@reduxjs/toolkit';

import { mediaByBloggersReducer, mediaByBloggersSaga } from '../media/redux';

import { publicationsByBloggersReduces, publicationsByBloggersSaga } from '../publications/redux';

import { paymentsByBloggersReducer, paymentsByBloggersSaga } from '../payments/redux';

export const adminTasksReducer = combineReducers({
  mediaByBloggers: mediaByBloggersReducer,
  publicationsByBloggers: publicationsByBloggersReduces,
  paymentsByBloggers: paymentsByBloggersReducer,
});

export function* adminTasksSaga(): SagaIterator {
  yield all([fork(mediaByBloggersSaga), fork(publicationsByBloggersSaga), fork(paymentsByBloggersSaga)]);
}
