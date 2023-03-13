import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import { ErrorHolder, Loader, Subheader } from 'core/components';
import { fold } from 'libs/remote';
import { useAppSelector } from 'store';

import { OfferForm } from '../../components';
import { selectOfferInfo } from '../../redux/selectors';

const createOfferFolder = fold(
  () => <OfferForm mode="create" />,
  () => <OfferForm mode="create" />,
  () => <Loader />,
  (error) => <ErrorHolder error={error} />
);

const CreateOffer: FC = () => {
  const data = useAppSelector(selectOfferInfo);
  const { t } = useTranslation('offers');

  return (
    <>
      <Subheader goBack goBackTo="/offers" title={t('addOfferTitle')} />
      {createOfferFolder(data)}
    </>
  );
};

export default CreateOffer;
