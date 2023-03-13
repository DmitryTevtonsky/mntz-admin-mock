/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Offer {
  id: number | string;
  appId: number;
  appName: string;
  appIconUrl: string;
  posts: number;
  totalInstallCount: number;
  totalSpend: string;
  state: OfferState;
}

export interface RewardByCountry {
  [key: string]: number | string;
}

export interface OfferInfoForm {
  id?: number | string;
  appId?: number | string;
  title: string;
  appCategory: string;
  iconUrl?: string;
  budget: string;
  balance: string;
  androidBaseReward: string;
  iosBaseReward: string;
  iosRewardByCountry: { country: string; price: number }[]; // RewardByCountry;
  androidRewardByCountry: { country: string; price: number }[]; // RewardByCountry;
}
export interface OfferInfo {
  appId?: number | string;
  appName: string;
  appCategory: string;
  appIconUrl: string;
  androidBaseReward: string;
  iosBaseReward: string;
  iosRewardByCountry: RewardByCountry;
  androidRewardByCountry: RewardByCountry;
  budget: string;
  balance: string;
  state: OfferState;
}

export interface AppForSelect {
  id: number | string;
  name: string;
}

export interface AppInfoShort {
  appCategory: string;
  appIconUrl: string;
}

export interface Placement {
  placement: string;
  placementType: string[];
}

export interface CreateOfferMediaAssetForm {
  file: File;
  placements: Placement[];
}

export interface CreateOfferMediaAssetPayload {
  file: File;
  offerId: string;
  placements: Record<string, string[]>;
  type?: string;
}

export interface UpdateOfferStatePayload {
  offerId: string;
  state: OfferState;
}

export type OfferState = 'active' | 'paused' | 'stopped';

export interface ActivePost {
  id: number;
  creatorId: number;
  offerId: number;
  mediaAssetId: number;
  socialNetwork: string;
  postLink: string;
  state: string;
}
