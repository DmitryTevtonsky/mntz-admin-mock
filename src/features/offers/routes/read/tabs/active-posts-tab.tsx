import { useParams } from 'react-router-dom';
import React, { FC, useEffect } from 'react';

import { fold, initialized } from 'libs/remote';
import { useAppDispatch, useAppSelector } from 'store';

import { ActivePost } from '../../../types';
import { ActivePosts } from '../../../components';
import { fetchOfferActivePosts, setOfferActivePosts } from '../../../redux/slice';
import { selectOfferActivePosts } from '../../../redux/selectors';

import { ErrorHolder, Loader } from 'core/components';

const offerActivePostsFolder = fold<ActivePost[]>(
  (data) => <ActivePosts data={data} />,
  () => <></>,
  () => <Loader />,
  (error) => <ErrorHolder error={error} />
);

const ActivePostsTab: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const offerActivePosts = useAppSelector(selectOfferActivePosts);

  useEffect(() => {
    params.offerId && dispatch(fetchOfferActivePosts(params.offerId));

    return () => {
      dispatch(setOfferActivePosts(initialized()));
    };
  }, [dispatch, params.offerId]);

  return <>{offerActivePostsFolder(offerActivePosts)}</>;
};

export default ActivePostsTab;
