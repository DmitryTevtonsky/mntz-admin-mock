import { useParams } from 'react-router-dom';
import React, { FC, useEffect } from 'react';

import { fold, initialized } from 'libs/remote';
import { useAppDispatch, useAppSelector } from 'store';

import { MediaAssetsForm } from '../../../components';
import { fetchOfferMedia, setOfferMedia } from '../../../redux/slice';
import { selectOfferMedia } from '../../../redux/selectors';

import { ErrorHolder, Loader } from 'core/components';
import { Media } from 'features/admin-tasks/media/types';

const offerMediaFolder = fold<Media[]>(
  (data) => <MediaAssetsForm data={data} />,
  () => <></>,
  () => <Loader />,
  (error) => <ErrorHolder error={error} />
);

const MediaTab: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const offerMedia = useAppSelector(selectOfferMedia);

  useEffect(() => {
    params.offerId && dispatch(fetchOfferMedia(params.offerId));

    return () => {
      dispatch(setOfferMedia(initialized()));
    };
  }, [dispatch, params.offerId]);

  return <>{offerMediaFolder(offerMedia)}</>;
};

export default MediaTab;
