import React, { FC, ReactNode, memo } from 'react';
import classNames from 'classnames';

import { GoBackButton } from 'core/components';

import css from './index.module.css';

interface SubheaderProps {
  goBack?: boolean;
  goBackTo?: string;
  title?: string | ReactNode;
  actions?: ReactNode[];
}
const Subheader: FC<SubheaderProps> = ({ goBack, goBackTo = '/', title, actions }: SubheaderProps) => {
  return (
    <header className={classNames(css.layout, !title && css.layoutWithoutTitle)}>
      <span className={css.heading}>
        {goBack && <GoBackButton to={goBackTo} />}

        {title && <h3 className={css.title}>{title}</h3>}
      </span>

      {actions && actions}
    </header>
  );
};
// FIXME: rerender?
export default memo(Subheader);
