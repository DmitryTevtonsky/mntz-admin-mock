import React, { FC } from 'react';

import css from './index.module.css';

const InitialScreen: FC = () => {
  return (
    <div className={css.layout}>
      <img src="images/mntz.svg" alt="Logo" />
    </div>
  );
};

export default InitialScreen;
