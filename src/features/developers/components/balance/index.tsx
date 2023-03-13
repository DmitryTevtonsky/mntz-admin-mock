import { useParams } from 'react-router-dom';
import React, { FC, useEffect } from 'react';

import { Payment } from '../../types';
import { fetchDeveloperBalance } from '../../redux/slice';
import { selectDeveloperBalance } from '../../redux/selectors';
import BalanceSuccess from './success';

import { ErrorHolder, Loader } from 'core/components';
import { fold } from 'libs/remote';
import { useAppDispatch, useAppSelector } from 'store';

import css from './index.module.css';

const balanceFolder = fold<Payment[]>(
  (data) => <BalanceSuccess data={data} />,
  () => <></>,
  () => <Loader />,
  (error) => <ErrorHolder error={error} />
);

const Balance: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const developerBalance = useAppSelector(selectDeveloperBalance);

  useEffect(() => {
    params.developerId && dispatch(fetchDeveloperBalance(params.developerId));
  }, [dispatch, params.developerId]);

  return <div className={css.layout}>{balanceFolder(developerBalance)}</div>;
};

export default Balance;
