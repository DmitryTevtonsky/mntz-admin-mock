import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import React, { FC, memo, useEffect } from 'react';

import { Subheader } from 'core/components';
import { fold, initialized } from 'libs/remote';
import { useAppDispatch, useAppSelector } from 'store';

import { Application } from '../types';
import { fetchApplications, setData } from '../redux/slice';
import { selectData } from '../redux/selectors';
import ApplicationsFailure from './failure';
import ApplicationsLoading from './loading';
import ApplicationsSuccess from './success';

const applicationsFolder = fold<Application[]>(
  (data) => <ApplicationsSuccess data={data} />,
  () => <></>,
  () => <ApplicationsLoading />,
  (error) => <ApplicationsFailure error={error} />
);

const ApplicationsIndex: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const { t } = useTranslation('applications');

  useEffect(() => {
    dispatch(fetchApplications());

    return () => {
      dispatch(setData(initialized()));
    };
  }, [dispatch]);

  return (
    <>
      <Subheader
        goBack
        title={t('title')}
        actions={[
          <Link key="create" to="create">
            <Button icon={<PlusOutlined />} type="primary" shape="round">
              {t('addApplication')}
            </Button>
          </Link>,
        ]}
      />

      <>{applicationsFolder(data)}</>
    </>
  );
};

export default memo(ApplicationsIndex);
