/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Creator {
  id: number;
  brandName: string;
  ownershipConfirmed: string;
  state: CreatorStatusEnum;
  subscribersCount: number;
}

export type Placements = Record<string, string[]>;

export enum CreatorStatusEnum {
  created = 'created',
  active = 'active',
  deleted = 'deleted',
}

export enum RejectionReasonCodeEnum {
  OWNERSHIP_NOT_CONFIRMED = 'OWNERSHIP_NOT_CONFIRMED',
  NOT_ENOUGH_SUBS = 'NOT_ENOUGH_SUBS',
  GEO_NOT_SUPPORTED = 'GEO_NOT_SUPPORTED',
}
export interface UpdateMediaState {
  id: number;
  state: CreatorStatusEnum;
  rejectionReasonCode?: RejectionReasonCodeEnum;
}
