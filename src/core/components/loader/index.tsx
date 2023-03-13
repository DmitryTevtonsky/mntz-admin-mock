import { LoadingOutlined } from '@ant-design/icons';
import React, { FC } from 'react';

import css from './index.module.css';

const Loader: FC = () => {
  return (
    <div className={css.loaderHolder}>
      <LoadingOutlined className={css.loader} />
    </div>
  );
};

export default Loader;
