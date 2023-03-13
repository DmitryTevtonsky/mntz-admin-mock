import React, { FC } from 'react';

import { ErrorHolder } from 'core/components';
import { ErrorInfo } from 'types';
import { fetchPublications } from '../redux/slice';
import { selectActiveStatus } from '../redux/selectors';
import { useAppDispatch, useAppSelector } from 'store';

export interface MediaFailureProps {
  error: ErrorInfo;
}
const MediaFailure: FC<MediaFailureProps> = ({ error }: MediaFailureProps) => {
  const dispatch = useAppDispatch();
  const activeStatus = useAppSelector(selectActiveStatus);

  const retryRequest = () => {
    dispatch(fetchPublications(activeStatus));
  };

  return <ErrorHolder error={error} retryRequest={retryRequest} />;
};

export default MediaFailure;
