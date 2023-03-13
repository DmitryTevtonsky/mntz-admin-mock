import { useParams } from 'react-router-dom';
import React, { FC, useEffect } from 'react';

import { fold, initialized } from 'libs/remote';
import { useAppDispatch, useAppSelector } from 'store';

import { OfferFormDisplay } from '../../../components';
import { OfferInfo } from '../../../types';
import { readOffer, setOfferInfo } from '../../../redux/slice';
import { selectOfferInfo } from '../../../redux/selectors';

import { ErrorHolder, Loader } from 'core/components';

const offerInfoFolder = fold<OfferInfo>(
  (data) => <OfferFormDisplay data={data} />,
  () => <></>,
  () => <Loader />,
  (error) => <ErrorHolder error={error} />
);

const OfferTab: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const offerInfo = useAppSelector(selectOfferInfo);

  useEffect(() => {
    params.offerId && dispatch(readOffer(params.offerId));

    return () => {
      dispatch(setOfferInfo(initialized()));
    };
  }, [dispatch, params.offerId]);

  return <>{offerInfoFolder(offerInfo)}</>;
};

export default OfferTab;
