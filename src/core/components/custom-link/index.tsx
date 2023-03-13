import { Link, LinkProps, useLocation } from 'react-router-dom';
import React, { FC, memo } from 'react';
import cn from 'classnames';

import css from './index.module.css';
interface CustomLinkProps extends LinkProps {
  path: string;
  icon?: JSX.Element;
}

const CustomLink: FC<CustomLinkProps> = ({ children, to, path, icon, ...props }: CustomLinkProps) => {
  const location = useLocation();

  const isActive = location.pathname.split('/').includes(path);

  return (
    <Link className={cn(css.link, isActive && css.activeLink)} to={to} {...props}>
      {icon}
      {children}
    </Link>
  );
};

export default memo(CustomLink);
