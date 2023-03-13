import React, { FC } from 'react';

import { ErrorHolder } from 'core/components';
import { ErrorInfo } from 'types';
import { fetchCreators } from '../redux/slice';
import { selectActiveStatus } from '../redux/selectors';
import { useAppDispatch, useAppSelector } from 'store';

export interface CreatorsFailureProps {
  error: ErrorInfo;
}
const CreatorsFailure: FC<CreatorsFailureProps> = ({ error }: CreatorsFailureProps) => {
  const dispatch = useAppDispatch();
  const activeStatus = useAppSelector(selectActiveStatus);

  const retryRequest = () => {
    dispatch(fetchCreators(activeStatus));
  };

  return <ErrorHolder error={error} retryRequest={retryRequest} />;
};

export default CreatorsFailure;
