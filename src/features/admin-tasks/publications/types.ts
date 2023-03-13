/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Post {
  adAssetId: number;
  offerId: number;
  id: number;
  ownerId: number;
  postLink: string;
  socialNetwork: string;
  state: string;
}

export enum PostStatusEnum {
  post_review = 'post_review',
  bad_post = 'bad_post',
  active = 'active',
}

export enum RejectionReasonCodeEnum {
  WRONG_MEDIA = 'WRONG_MEDIA',
  WRONG_TRACKING_LINK = 'WRONG_TRACKING_LINK',
  CONTUCT_US = 'CONTUCT_US',
}

export interface UpdatePostState {
  id: number;
  state: 'bad_post' | 'active';
  rejectionReasonCode?: RejectionReasonCodeEnum;
}
