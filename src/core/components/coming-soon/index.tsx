import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import css from './index.module.css';

const ComingSoon: FC = () => {
  const { t } = useTranslation();
  return (
    <div className={css.resultHolder}>
      <Result icon={<SmileOutlined />} title={`${t('coming-soon')}!`} subTitle={`${t('coming-soon-description')}!`} />
    </div>
  );
};

export default ComingSoon;
