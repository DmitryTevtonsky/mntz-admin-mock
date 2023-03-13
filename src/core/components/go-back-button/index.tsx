import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import css from './index.module.css';

interface GoBackButtonProps {
  to: string;
}

const GoBackButton: FC<GoBackButtonProps> = ({ to }: GoBackButtonProps) => {
  const { t } = useTranslation();
  return (
    <Link className={css.goBackButton} to={to}>
      <LeftOutlined />
      <h3>{t('back')}</h3>
    </Link>
  );
};

export default GoBackButton;
