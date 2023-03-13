import React, { FC } from 'react';

import { ErrorHolder } from 'core/components';
import { ErrorInfo } from 'types';
import { fetchApplications } from '../redux/slice';
import { useAppDispatch } from 'store';

export interface ApplicationsFailureProps {
  error: ErrorInfo;
}
const ApplicationsFailure: FC<ApplicationsFailureProps> = ({ error }: ApplicationsFailureProps) => {
  const dispatch = useAppDispatch();

  const retryRequest = () => {
    dispatch(fetchApplications());
  };

  return <ErrorHolder error={error} retryRequest={retryRequest} />;
};

export default ApplicationsFailure;
