import { combineReducers } from '@reduxjs/toolkit';

import { adminTasksReducer } from 'features/admin-tasks/redux';
import { applicationsReducer } from 'features/applications/redux';
import { coreReducer } from 'core/redux';
import { creatorsReducer } from 'features/creators/redux';
import { developersReducer } from 'features/developers/redux';
import { offersReducer } from 'features/offers/redux';

const rootReducer = combineReducers({
  core: coreReducer,
  offers: offersReducer,
  developers: developersReducer,
  applications: applicationsReducer,
  adminTasks: adminTasksReducer,
  creators: creatorsReducer,
});

export default rootReducer;
