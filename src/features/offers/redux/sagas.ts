import { SagaIterator } from 'redux-saga';
import { all, put, takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';
import { t } from 'i18next';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { Application, ApplicationInfo } from 'features/applications/types';
import { Media } from 'features/admin-tasks/media/types';
import { PresignedUrlResponseDouble } from 'types';
import { axiosMain } from 'libs/axios-initialization';
import { failure, initialized, pending, success } from 'libs/remote';
import { fileToCompressedThumbArrayBuffer, getFileType } from 'libs/utils';

import { ActivePost, AppInfoShort, Offer, OfferInfo } from '../types';
import {
  createOffer,
  createOfferMediaAsset,
  fetchAppInfo,
  fetchApplicationsForSelect,
  fetchOfferActivePosts,
  fetchOfferMedia,
  fetchOffersData,
  readOffer,
  setAppInfo,
  setApplicationsForSelect,
  setOfferActivePosts,
  setOfferInfo,
  setOfferMedia,
  setOffersData,
  updateOffer,
  updateOfferState,
} from './slice';

function* offersSaga(): SagaIterator {
  yield all([
    takeLatest(fetchOffersData, function* fetchOffersDataSaga() {
      try {
        yield put(setOffersData(pending()));

        const { data }: AxiosResponse<Offer[]> = yield axiosMain.get('/offers');

        yield put(setOffersData(success(data)));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setOffersData(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(fetchApplicationsForSelect, function* fetchDevelopersForSelectSaga() {
      try {
        yield put(setApplicationsForSelect(pending()));

        const { data }: AxiosResponse<Application[]> = yield axiosMain.get('/apps');

        const applicationsForSelect = data.map((app) => ({
          id: app.id,
          name: app.name,
        }));

        yield put(setApplicationsForSelect(success(applicationsForSelect)));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setApplicationsForSelect(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(fetchAppInfo, function* fetchAppInfoSaga({ payload }) {
      try {
        yield put(setAppInfo(pending()));

        const { data }: AxiosResponse<ApplicationInfo> = yield axiosMain.get(`/apps/${payload}`);

        const appInfo: AppInfoShort = {
          appCategory: data.appCategory,
          appIconUrl: data.iconUrl,
        };

        yield put(setAppInfo(success(appInfo)));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setAppInfo(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(createOffer, function* createOfferSaga({ payload }) {
      try {
        yield put(setOfferInfo(pending()));

        const createOfferPayload = {
          appId: payload.appId,
          budget: payload.budget,
          androidBaseReward: payload.androidBaseReward,
          iosBaseReward: payload.iosBaseReward,
          androidRewardByCountry: Object.fromEntries(
            (payload.androidRewardByCountry || []).map((item) => [item.country, `${item.price}`])
          ),
          iosRewardByCountry: Object.fromEntries(
            (payload.iosRewardByCountry || []).map((item) => [item.country, `${item.price}`])
          ),
        };

        const { data }: AxiosResponse<Offer> = yield axiosMain.post('/offers', createOfferPayload);

        if (data.id) {
          window.location.replace(`/offers/${data.id}`);
        }
      } catch (error) {
        const { response, config } = error as AxiosError;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (response?.data && (response?.data as any).error === 'INSUFFICIENT_BALANCE') {
          notification.warning({
            duration: 0,
            message: `${t('insufficientBalance', { ns: 'offers' })}!`,
            description: `${t('insufficientBalanceTip', { ns: 'offers' })}.`,
            placement: 'bottomRight',
          });
          // FIXME: вернуть success с входными полями, т.е. success(payload)
          yield put(setOfferInfo(initialized()));
          return;
        }

        yield put(setOfferInfo(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(readOffer, function* readOfferSaga({ payload }) {
      try {
        yield put(setOfferInfo(pending()));

        const { data }: AxiosResponse<OfferInfo> = yield axiosMain.get(`/offers/${payload}`);

        yield put(setOfferInfo(success(data)));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setOfferInfo(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(updateOffer, function* updateOfferSaga({ payload }) {
      try {
        yield put(setOfferInfo(pending()));

        const updateOfferPayload = {
          appId: payload.appId,
          budget: payload.budget,
          androidBaseReward: payload.androidBaseReward,
          iosBaseReward: payload.iosBaseReward,
          androidRewardByCountry: Object.fromEntries(
            (payload.androidRewardByCountry || []).map((item) => [item.country, `${item.price}`])
          ),
          iosRewardByCountry: Object.fromEntries(
            (payload.iosRewardByCountry || []).map((item) => [item.country, `${item.price}`])
          ),
        };

        const { data }: AxiosResponse<Offer> = yield axiosMain.put(`/offers/${payload.id}`, updateOfferPayload);

        if (data.id) {
          window.location.replace(`/offers/${data.id}`);
        }
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setOfferInfo(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(fetchOfferMedia, function* fetchOfferMediaSaga({ payload }) {
      try {
        yield put(setOfferMedia(pending()));

        const { data }: AxiosResponse<Media[]> = yield axiosMain.get(`/offers/${payload}/media`);

        yield put(setOfferMedia(success(data)));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setOfferMedia(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(fetchOfferActivePosts, function* fetchOfferActivePostsSaga({ payload }) {
      try {
        yield put(setOfferActivePosts(pending()));

        const { data }: AxiosResponse<ActivePost[]> = yield axiosMain.get(`/offers/${payload}/active-posts`);

        yield put(setOfferActivePosts(success(data)));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setOfferActivePosts(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(createOfferMediaAsset, function* createOfferMediaAssetSaga({ payload }) {
      try {
        yield put(setOfferMedia(pending()));

        const fileArrayBuffer: ArrayBuffer = yield payload.file.arrayBuffer();

        const compressedFileArrayBuffer: ArrayBuffer = yield fileToCompressedThumbArrayBuffer(payload.file);

        const fileType: string | undefined = getFileType(payload.file.name);

        const { data: presignedUrlResponse }: AxiosResponse<PresignedUrlResponseDouble> = yield axiosMain.post(
          `/offers/${payload.offerId}/media/presigned-url`,
          {
            fileTypeLarge: fileType,
            fileTypeSmall: 'jpeg',
          }
        );

        yield axios.put(presignedUrlResponse.largeUrl, fileArrayBuffer);

        yield axios.put(presignedUrlResponse.smallUrl, compressedFileArrayBuffer);

        const createOfferMediaAssetPayload = {
          offerId: payload.offerId,
          placements: payload.placements,
          type: 'image',
          urlLarge: presignedUrlResponse.largeUrl.split('?')[0],
          urlSmall: presignedUrlResponse.smallUrl.split('?')[0],
        };

        yield axiosMain.post(`/offers/${payload.offerId}/media`, createOfferMediaAssetPayload);

        yield put(fetchOfferMedia(payload.offerId));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setOfferMedia(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(updateOfferState, function* updateOfferStateSaga({ payload }) {
      try {
        yield put(setOfferInfo(pending()));

        const { data }: AxiosResponse<OfferInfo> = yield axiosMain.put(`/offers/${payload.offerId}/state`, {
          state: payload.state,
        });

        yield put(setOfferInfo(success(data)));
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setOfferInfo(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
  ]);
}

export default offersSaga;
