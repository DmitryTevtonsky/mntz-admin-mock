import { RemoteData } from 'libs/remote';
import { RootState } from 'store';

import { Media, MediaStatusEnum } from '../types';

const selectData = (state: RootState): RemoteData<Media[]> => state.adminTasks.mediaByBloggers.data;
const selectActiveStatus = (state: RootState): MediaStatusEnum => state.adminTasks.mediaByBloggers.activeStatus;

export { selectData, selectActiveStatus };
