import { RemoteData } from 'libs/remote';
import { RootState } from 'store';

import { CreatorStatusEnum, Media } from '../types';

const selectData = (state: RootState): RemoteData<Media[]> => state.creators.data;
const selectActiveStatus = (state: RootState): CreatorStatusEnum => state.creators.activeStatus;

export { selectData, selectActiveStatus };
