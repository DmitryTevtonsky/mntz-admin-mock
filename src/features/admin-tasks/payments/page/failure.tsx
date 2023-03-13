import React, { FC } from 'react';

import { ErrorHolder } from 'core/components';
import { ErrorInfo } from 'types';
import { fetchPayments } from '../redux/slice';
import { selectActiveStatus } from '../redux/selectors';
import { useAppDispatch, useAppSelector } from 'store';

export interface PaymentsFailureProps {
  error: ErrorInfo;
}
const PaymentsFailure: FC<PaymentsFailureProps> = ({ error }: PaymentsFailureProps) => {
  const dispatch = useAppDispatch();
  const aciveStatus = useAppSelector(selectActiveStatus);

  const retryRequest = () => {
    dispatch(fetchPayments(aciveStatus));
  };

  return <ErrorHolder error={error} retryRequest={retryRequest} />;
};

export default PaymentsFailure;
