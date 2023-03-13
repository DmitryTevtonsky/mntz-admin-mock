import { BarsOutlined, HomeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import React, { FC } from 'react';

import { selectSidebarVisibility } from 'core/redux/selectors';
import { toggleSidebarVisibility } from 'core/redux/slice';
import { useAppDispatch, useAppSelector } from 'store';

import css from './index.module.css';

const Footer: FC = () => {
  const sidebarVisibility = useAppSelector(selectSidebarVisibility);
  const dispatch = useAppDispatch();

  const handleShowSidebar = () => {
    dispatch(toggleSidebarVisibility());
  };

  const handleGoHome = () => {
    sidebarVisibility && dispatch(toggleSidebarVisibility());
  };

  return (
    <div className={css.footerContent}>
      <div className={css.controls}>
        <Button className={css.controlButton} size="large" onClick={handleShowSidebar} type="link">
          <BarsOutlined />
        </Button>

        <Button onClick={handleGoHome} className={css.controlButton} size="large" type="link">
          <Link to="/">
            <HomeOutlined />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Footer;
