import React, { FC } from 'react';

import { ErrorHolder } from 'core/components';
import { ErrorInfo } from 'types';
import { fetchData } from '../redux/slice';
import { useAppDispatch } from 'store';

export interface DevelopersFailureProps {
  error: ErrorInfo;
}
const DevelopersFailure: FC<DevelopersFailureProps> = ({ error }: DevelopersFailureProps) => {
  const dispatch = useAppDispatch();
  const retryRequest = () => {
    dispatch(fetchData());
  };

  return <ErrorHolder error={error} retryRequest={retryRequest} />;
};

export default DevelopersFailure;
