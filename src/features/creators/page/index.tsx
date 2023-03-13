import { Radio, RadioChangeEvent } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect } from 'react';

import { Subheader } from 'core/components';
import { fold, initialized } from 'libs/remote';
import { useAppDispatch, useAppSelector } from 'store';

import { Creator, CreatorStatusEnum } from '../types';
import { fetchCreators, setActiveStatus, setCreators } from '../redux/slice';
import { selectActiveStatus, selectData } from '../redux/selectors';

import CreatorsFailure from './failure';
import CreatorsLoading from './loading';
import CreatorsSuccess from './success';

const creatorsFolder = fold<Creator[]>(
  (data) => <CreatorsSuccess data={data} />,
  () => <></>,
  () => <CreatorsLoading />,
  (error) => <CreatorsFailure error={error} />
);

const CreatorsIndex: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const activeStatus = useAppSelector(selectActiveStatus);
  const { t } = useTranslation('creators');
  const { t: dt } = useTranslation();

  useEffect(() => {
    dispatch(fetchCreators(activeStatus));

    return () => {
      dispatch(setCreators(initialized()));
    };
  }, [activeStatus, dispatch]);

  const handleChangeStatus = (e: RadioChangeEvent) => {
    dispatch(setActiveStatus(e.target.value as CreatorStatusEnum));
  };

  return (
    <>
      <Subheader
        goBack
        title={t('title')}
        actions={[
          <Radio.Group key="radio" value={activeStatus} onChange={handleChangeStatus}>
            <Radio.Button value={CreatorStatusEnum.created}>{dt('pending')}</Radio.Button>
            <Radio.Button value={CreatorStatusEnum.deleted}>{dt('rejected')}</Radio.Button>
            <Radio.Button value={CreatorStatusEnum.active}>{dt('approved')}</Radio.Button>
          </Radio.Group>,
        ]}
      />

      {creatorsFolder(data)}
    </>
  );
};

export default CreatorsIndex;
