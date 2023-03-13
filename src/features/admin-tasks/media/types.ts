/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Media {
  id: number;
  ownerId: null | number;
  offerId: number;
  placements: Placements;
  publicUse: boolean;
  type: string;
  urlLarge: string;
  urlSmall: string;
}

export type Placements = Record<string, string[]>;

export enum MediaStatusEnum {
  under_review = 'under_review',
  rejected = 'rejected',
  approved = 'approved',
}

export enum RejectionReasonCodeEnum {
  POOR_QUALITY = 'POOR_QUALITY',
  INAPPROPRIATE = 'INAPPROPRIATE',
  COPYRIGHT_VIOLATION = 'COPYRIGHT_VIOLATION',
}

export interface UpdateMediaState {
  id: number;
  state: 'rejected' | 'approved';
  rejectionReasonCode?: RejectionReasonCodeEnum;
}
