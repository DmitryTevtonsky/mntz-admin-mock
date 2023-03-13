import React, { FC } from 'react';

import { ErrorHolder } from 'core/components';
import { ErrorInfo } from 'types';
import { useAppDispatch } from 'store';

import { fetchOffersData } from '../redux/slice';

export interface OffersFailureProps {
  error: ErrorInfo;
}
const OffersFailure: FC<OffersFailureProps> = ({ error }: OffersFailureProps) => {
  const dispatch = useAppDispatch();

  const retryRequest = () => {
    dispatch(fetchOffersData());
  };

  return <ErrorHolder error={error} retryRequest={retryRequest} />;
};

export default OffersFailure;
