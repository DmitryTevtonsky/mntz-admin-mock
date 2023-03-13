import { Media } from 'features/admin-tasks/media/types';
import { RemoteData } from 'libs/remote';
import { RootState } from 'store';

import { ActivePost, AppForSelect, AppInfoShort, Offer, OfferInfo } from '../types';

const selectOffersData = (state: RootState): RemoteData<Offer[]> => state.offers.offersData;

const selectOfferInfo = (state: RootState): RemoteData<OfferInfo> => state.offers.offerInfo;
const selectOfferMedia = (state: RootState): RemoteData<Media[]> => state.offers.offerMedia;
const selectOfferActivePosts = (state: RootState): RemoteData<ActivePost[]> => state.offers.offerActivePosts;

const selectApplicationsForSelect = (state: RootState): RemoteData<AppForSelect[]> =>
  state.offers.applicationsForSelect;
const selectAppInfo = (state: RootState): RemoteData<AppInfoShort> => state.offers.appInfo;

export {
  selectOffersData,
  selectOfferInfo,
  selectOfferMedia,
  selectOfferActivePosts,
  selectApplicationsForSelect,
  selectAppInfo,
};
