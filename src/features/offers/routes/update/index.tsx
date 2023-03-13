import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect } from 'react';

import { ErrorHolder, Loader, Subheader } from 'core/components';
import { fold } from 'libs/remote';
import { useAppDispatch, useAppSelector } from 'store';

import { OfferForm } from '../../components';
import { OfferInfo } from '../../types';
import { readOffer } from '../../redux/slice';
import { selectOfferInfo } from '../../redux/selectors';

const updateOfferFolder = fold<OfferInfo>(
  (data) => <OfferForm mode="update" data={data} />,
  () => <></>,
  () => <Loader />,
  (error) => <ErrorHolder error={error} />
);

const UpdateApp: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { t } = useTranslation('offers');

  const offerInfo = useAppSelector(selectOfferInfo);

  useEffect(() => {
    params.offerId && dispatch(readOffer(params.offerId));
  }, [dispatch, params.offerId]);

  return (
    <>
      <Subheader goBack goBackTo="/offers" title={t('updateOfferTitle')} />
      {updateOfferFolder(offerInfo)}
    </>
  );
};

export default UpdateApp;
