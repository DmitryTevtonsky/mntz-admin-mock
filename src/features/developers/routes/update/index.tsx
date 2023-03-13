import { useParams } from 'react-router-dom';
import React, { FC, useEffect } from 'react';

import { DeveloperInfo } from 'features/developers/types';
import { ErrorHolder, Loader, Subheader } from 'core/components';
import { fold } from 'libs/remote';
import { selectDeveloperInfo } from 'features/developers/redux/selectors';
import { useAppDispatch, useAppSelector } from 'store';

import { DevelopersForm } from '../../components';
import { readDeveloper } from '../../redux/slice';
import { useTranslation } from 'react-i18next';

const developerInfoFolder = fold<DeveloperInfo>(
  (data) => <DevelopersForm data={data} mode="update" />,
  () => <></>,
  () => <Loader />,
  (error) => <ErrorHolder error={error} />
);

const UpdateDeveloper: FC = () => {
  const { t } = useTranslation('developers');

  const dispatch = useAppDispatch();
  const params = useParams();

  const developerInfo = useAppSelector(selectDeveloperInfo);

  useEffect(() => {
    params.developerId && dispatch(readDeveloper(params.developerId));
  }, [dispatch, params.developerId]);

  return (
    <>
      <Subheader goBack goBackTo="/developers" title={t('updateDeveloperTitle')} />
      <>{developerInfoFolder(developerInfo)}</>
    </>
  );
};

export default UpdateDeveloper;
