import { Radio, RadioChangeEvent } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect } from 'react';

import { Subheader } from 'core/components';
import { fold, initialized } from 'libs/remote';
import { useAppDispatch, useAppSelector } from 'store';

import { Media, MediaStatusEnum } from '../types';
import { fetchMedia, setActiveStatus, setMedia } from '../redux/slice';
import { selectActiveStatus, selectData } from '../redux/selectors';

import MediaFailure from './failure';
import MediaLoading from './loading';
import MediaSuccess from './success';

const mediaFolder = fold<Media[]>(
  (data) => <MediaSuccess data={data} />,
  () => <></>,
  () => <MediaLoading />,
  (error) => <MediaFailure error={error} />
);

const MediaIndex: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const activeStatus = useAppSelector(selectActiveStatus);
  const { t } = useTranslation('admin-tasks-media');
  const { t: dt } = useTranslation();

  useEffect(() => {
    dispatch(fetchMedia(activeStatus));

    return () => {
      dispatch(setMedia(initialized()));
    };
  }, [activeStatus, dispatch]);

  const handleChangeStatus = (e: RadioChangeEvent) => {
    dispatch(setActiveStatus(e.target.value as MediaStatusEnum));
  };

  return (
    <>
      <Subheader
        goBack
        title={t('title')}
        actions={[
          <Radio.Group key="radio" value={activeStatus} onChange={handleChangeStatus}>
            <Radio.Button value={MediaStatusEnum.under_review}>{dt('pending')}</Radio.Button>
            <Radio.Button value={MediaStatusEnum.rejected}>{dt('rejected')}</Radio.Button>
            <Radio.Button value={MediaStatusEnum.approved}>{dt('approved')}</Radio.Button>
          </Radio.Group>,
        ]}
      />

      <>{mediaFolder(data)}</>
    </>
  );
};

export default MediaIndex;
