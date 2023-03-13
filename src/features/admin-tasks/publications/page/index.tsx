import { Radio, RadioChangeEvent } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect } from 'react';

import { Subheader } from 'core/components';
import { fold, initialized } from 'libs/remote';
import { useAppDispatch, useAppSelector } from 'store';

import { Post, PostStatusEnum } from '../types';
import { fetchPublications, setActiveStatus, setPublications } from '../redux/slice';
import { selectActiveStatus, selectData } from '../redux/selectors';

import PublicationsFailure from './failure';
import PublicationsLoading from './loading';
import PublicationsSuccess from './success';

const publicationsFolder = fold<Post[]>(
  (data) => <PublicationsSuccess data={data} />,
  () => <></>,
  () => <PublicationsLoading />,
  (error) => <PublicationsFailure error={error} />
);

const PublicationsIndex: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const activeStatus = useAppSelector(selectActiveStatus);
  const { t } = useTranslation('admin-tasks-publications');
  const { t: dt } = useTranslation();

  useEffect(() => {
    dispatch(fetchPublications(activeStatus));

    return () => {
      dispatch(setPublications(initialized()));
    };
  }, [activeStatus, dispatch]);

  const handleChangeStatus = (e: RadioChangeEvent) => {
    dispatch(setActiveStatus(e.target.value as PostStatusEnum));
  };

  return (
    <>
      <Subheader
        goBack
        title={t('title')}
        actions={[
          <Radio.Group key="radio" value={activeStatus} onChange={handleChangeStatus}>
            <Radio.Button value={PostStatusEnum.post_review}>{dt('pending')}</Radio.Button>
            <Radio.Button value={PostStatusEnum.bad_post}>{dt('rejected')}</Radio.Button>
            <Radio.Button value={PostStatusEnum.active}>{dt('approved')}</Radio.Button>
          </Radio.Group>,
        ]}
      />

      {publicationsFolder(data)}
    </>
  );
};

export default PublicationsIndex;
