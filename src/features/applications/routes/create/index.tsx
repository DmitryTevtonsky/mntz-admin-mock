import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import { ErrorHolder, Loader, Subheader } from 'core/components';
import { fold } from 'libs/remote';
import { useAppSelector } from 'store';

import { ApplicationForm } from '../../components';
import { selectApplicationInfo } from '../../redux/selectors';

const createApplicationFolder = fold(
  () => <ApplicationForm mode="create" />,
  () => <ApplicationForm mode="create" />,
  () => <Loader />,
  (error) => <ErrorHolder error={error} />
);

const CreateApplication: FC = () => {
  const { t } = useTranslation('applications');

  const data = useAppSelector(selectApplicationInfo);

  return (
    <>
      <Subheader goBack goBackTo="/applications" title={t('addApplicationTitle')} />
      {createApplicationFolder(data)}
    </>
  );
};

export default CreateApplication;
