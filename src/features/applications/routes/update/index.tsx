import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect } from 'react';

import { ErrorHolder, Loader, Subheader } from 'core/components';
import { fold } from 'libs/remote';
import { useAppDispatch, useAppSelector } from 'store';

import { ApplicationForm } from '../../components';
import { ApplicationInfo } from '../../types';
import { readApplication } from '../../redux/slice';
import { selectApplicationInfo } from '../../redux/selectors';

const updateApplicationFolder = fold<ApplicationInfo>(
  (data) => <ApplicationForm mode="update" data={data} />,
  () => <></>,
  () => <Loader />,
  (error) => <ErrorHolder error={error} />
);

const UpdateApplication: FC = () => {
  const { t } = useTranslation('applications');

  const dispatch = useAppDispatch();
  const params = useParams();

  const appInfo = useAppSelector(selectApplicationInfo);

  useEffect(() => {
    params.appId && dispatch(readApplication(params.appId));
  }, [dispatch, params.appId]);

  return (
    <>
      <Subheader goBack goBackTo="/applications" title={t('updateApplicationTitle')} />
      {updateApplicationFolder(appInfo)}
    </>
  );
};

export default UpdateApplication;
