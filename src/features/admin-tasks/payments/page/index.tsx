import { Radio, RadioChangeEvent } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect } from 'react';

import { Subheader } from 'core/components';
import { fold, initialized } from 'libs/remote';
import { useAppDispatch, useAppSelector } from 'store';

import { Payment, PaymentsStatusEnum } from '../types';
import { fetchPayments, setActiveStatus, setPayments } from '../redux/slice';
import { selectActiveStatus, selectData } from '../redux/selectors';

import PaymentsFailure from './failure';
import PaymentsLoading from './loading';
import PaymentsSuccess from './success';

const paymentsFolder = fold<Payment[]>(
  (data) => <PaymentsSuccess data={data} />,
  () => <></>,
  () => <PaymentsLoading />,
  (error) => <PaymentsFailure error={error} />
);

const PaymentsIndex: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const activeStatus = useAppSelector(selectActiveStatus);
  const { t } = useTranslation('admin-tasks-payments');
  const { t: dt } = useTranslation();

  useEffect(() => {
    dispatch(fetchPayments(activeStatus));

    return () => {
      dispatch(setPayments(initialized()));
    };
  }, [activeStatus, dispatch]);

  const handleChangeStatus = (e: RadioChangeEvent) => {
    dispatch(setActiveStatus(e.target.value as PaymentsStatusEnum));
  };

  return (
    <>
      <Subheader
        goBack
        title={t('title')}
        actions={[
          <Radio.Group key="radio" value={activeStatus} onChange={handleChangeStatus}>
            <Radio.Button value={PaymentsStatusEnum.pending}>{dt('pending')}</Radio.Button>
            <Radio.Button value={PaymentsStatusEnum.rejected}>{dt('rejected')}</Radio.Button>
            <Radio.Button value={PaymentsStatusEnum.completed}>{dt('approved')}</Radio.Button>
          </Radio.Group>,
        ]}
      />

      <>{paymentsFolder(data)}</>
    </>
  );
};

export default PaymentsIndex;
