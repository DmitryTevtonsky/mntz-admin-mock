import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect } from 'react';

import { Subheader } from 'core/components';
import { fold, initialized } from 'libs/remote';
import { useAppDispatch, useAppSelector } from 'store';

import { Offer } from '../types';
import { fetchOffersData, setOffersData } from '../redux/slice';
import { selectOffersData } from '../redux/selectors';

import OffersFailure from './failure';
import OffersLoading from './loading';
import OffersSuccess from './success';

const offersFolder = fold<Offer[]>(
  (data) => <OffersSuccess data={data} />,
  () => <></>,
  () => <OffersLoading />,
  (error) => <OffersFailure error={error} />
);

const OffersIndex: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectOffersData);
  const { t } = useTranslation('offers');

  useEffect(() => {
    dispatch(fetchOffersData());

    return () => {
      dispatch(setOffersData(initialized()));
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
              {t('addOffer')}
            </Button>
          </Link>,
        ]}
      />

      <>{offersFolder(data)}</>
    </>
  );
};

export default OffersIndex;
