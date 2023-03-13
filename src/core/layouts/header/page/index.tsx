import React, { FC } from 'react';

import { UserMenu } from 'core/components';

import css from './index.module.css';

const Header: FC = () => {
  return (
    <div className={css.headerContent}>
      <UserMenu />
    </div>
  );
};

export default Header;
