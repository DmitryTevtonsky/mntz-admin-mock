import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import { ErrorHolder, Loader, Subheader } from 'core/components';
import { fold } from 'libs/remote';
import { useAppSelector } from 'store';

import { DevelopersForm } from '../../components';
import { selectDeveloperInfo } from '../../redux/selectors';

const createDeveloperFolder = fold(
  () => <DevelopersForm mode="create" />,
  () => <DevelopersForm mode="create" />,
  () => <Loader />,
  (error) => <ErrorHolder error={error} />
);

const CreateDeveloper: FC = () => {
  const { t } = useTranslation('developers');
  const data = useAppSelector(selectDeveloperInfo);

  return (
    <>
      <Subheader goBack goBackTo="/developers" title={t('addDeveloperTitle')} />
      {createDeveloperFolder(data)}
    </>
  );
};

export default CreateDeveloper;
