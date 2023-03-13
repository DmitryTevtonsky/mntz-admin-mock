import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { coreSaga } from 'core/redux';

import { adminTasksSaga } from 'features/admin-tasks/redux';
import { applicationsSaga } from 'features/applications/redux';
import { creatorsSaga } from 'features/creators/redux';
import { developersSaga } from 'features/developers/redux';
import { offersSaga } from 'features/offers/redux';

export default function* rootSaga(): SagaIterator {
  yield all([
    fork(coreSaga),
    fork(developersSaga),
    fork(applicationsSaga),
    fork(offersSaga),
    fork(adminTasksSaga),
    fork(creatorsSaga),
  ]);
}
