import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RemoteData, initialized } from 'libs/remote';

import { Post, PostStatusEnum, UpdatePostState } from '../types';
export interface PublicationsByBloggersState {
  data: RemoteData<Post[]>;
  activeStatus: PostStatusEnum;
}

const initialState: PublicationsByBloggersState = {
  data: initialized() as RemoteData<Post[]>,
  activeStatus: PostStatusEnum.post_review,
};

export const publicationsByBloggersSlice = createSlice({
  name: 'publications-by-bloggers',
  initialState,
  reducers: {
    setActiveStatus: (state, action: PayloadAction<PostStatusEnum>) => {
      state.activeStatus = action.payload;
    },

    fetchPublications: (_state, _action: PayloadAction<PostStatusEnum>) => {},
    setPublications: (state, action: PayloadAction<RemoteData<Post[]>>) => {
      state.data = action.payload;
    },
    updatePostState: (_state, _action: PayloadAction<UpdatePostState>) => {},
  },
});

export const { setActiveStatus, fetchPublications, setPublications, updatePostState } = publicationsByBloggersSlice.actions;
export default publicationsByBloggersSlice.reducer;
