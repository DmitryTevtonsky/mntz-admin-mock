import { RootState } from 'store';

import { Developer, DeveloperInfo, Payment } from '../types';
import { RemoteData } from 'libs/remote';

const selectData = (state: RootState): RemoteData<Developer[]> => state.developers.data;
const selectDeveloperInfo = (state: RootState): RemoteData<DeveloperInfo> => state.developers.developerInfo;
const selectDeveloperBalance = (state: RootState): RemoteData<Payment[]> => state.developers.balance;

export { selectData, selectDeveloperInfo, selectDeveloperBalance };
