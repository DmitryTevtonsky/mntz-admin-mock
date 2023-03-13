import { RemoteData } from 'libs/remote';
import { RootState } from 'store';

import { Application, ApplicationInfo, DeveloperForSelect } from '../types';

const selectData = (state: RootState): RemoteData<Application[]> => state.applications.data;
const selectApplicationInfo = (state: RootState): RemoteData<ApplicationInfo> => state.applications.applicationInfo;
const selectDevelopersForSelect = (state: RootState): RemoteData<DeveloperForSelect[]> =>
  state.applications.developersForSelect;

export { selectData, selectApplicationInfo, selectDevelopersForSelect };
