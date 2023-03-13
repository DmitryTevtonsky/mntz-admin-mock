import { RemoteData } from 'libs/remote';
import { RootState } from 'store';

import { Post, PostStatusEnum } from '../types';

const selectData = (state: RootState): RemoteData<Post[]> => state.adminTasks.publicationsByBloggers.data;
const selectActiveStatus = (state: RootState): PostStatusEnum => state.adminTasks.publicationsByBloggers.activeStatus;

export { selectData, selectActiveStatus };
