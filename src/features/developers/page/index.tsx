import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'store';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect } from 'react';

import { Developer } from '../types';
import { fetchData, setData } from '../redux/slice';
import { fold, initialized } from 'libs/remote';

import { selectData } from '../redux/selectors';
import DevelopersFailure from './failure';
import DevelopersLoading from './loading';
import DevelopersSuccess from './success';

import { Subheader } from 'core/components';

const developersFolder = fold<Developer[]>(
  (data) => <DevelopersSuccess data={data} />,
  () => <></>,
  () => <DevelopersLoading />,
  (error) => <DevelopersFailure error={error} />
);

const DevelopersIndex: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const { t } = useTranslation('developers');

  useEffect(() => {
    dispatch(fetchData());

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
              {t('addDeveloper')}
            </Button>
          </Link>,
        ]}
      />

      {developersFolder(data)}
    </>
  );
};

export default DevelopersIndex;
