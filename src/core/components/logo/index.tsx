import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import css from './index.module.css';

import { selectSidebarVisibility } from 'core/redux/selectors';
import { toggleSidebarVisibility } from 'core/redux/slice';
import { useAppDispatch, useAppSelector } from 'store';

const Logo: FC = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const sidebarVisibility = useAppSelector(selectSidebarVisibility);

  const handleClick = () => {
    sidebarVisibility && dispatch(toggleSidebarVisibility());
  };

  return (
    <Link to="/" className={css.logo} onClick={handleClick}>
      <h1>{t('title')}</h1>
    </Link>
  );
};

export default Logo;
