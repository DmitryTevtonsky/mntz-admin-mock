import { routes } from 'routes';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import { CustomLink, LanguageSelect } from 'core/components';
import { Route } from 'types';
import { selectSidebarVisibility } from 'core/redux/selectors';
import { toggleSidebarVisibility } from 'core/redux/slice';
import { useAppDispatch, useAppSelector } from 'store';

import css from './index.module.css';

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation('menu');

  const sidebarVisibility = useAppSelector(selectSidebarVisibility);

  const handleSelectRoute = () => {
    sidebarVisibility && dispatch(toggleSidebarVisibility());
  };

  return (
    <>
      <menu className={css.menu}>
        {routes.map(({ path, subRoutes, title, icon }: Route) => {
          return (
            <li key={path}>
              <h3 className={css.menuItem}>
                <CustomLink
                  icon={icon}
                  onClick={handleSelectRoute}
                  path={path || ''}
                  to={subRoutes && subRoutes[0] && subRoutes[0].path ? `/${path}/${subRoutes[0].path}` : `/${path}`}
                >
                  {t(title || '')}
                </CustomLink>
              </h3>
              {subRoutes && subRoutes.filter((subRoute) => !subRoute.index && subRoute.title).length > 0 && (
                <ol>
                  {subRoutes.map((subPath) =>
                    !subPath.title ? undefined : (
                      <li key={subPath.path}>
                        <h3 className={css.menuItem}>
                          <CustomLink
                            onClick={handleSelectRoute}
                            icon={subPath.icon}
                            path={subPath.path || ''}
                            to={`/${path}/${subPath.path}`}
                          >
                            {t(subPath.title || '')}
                          </CustomLink>
                        </h3>
                      </li>
                    )
                  )}
                </ol>
              )}
            </li>
          );
        })}
      </menu>
      <div className={css.controls}>
        <LanguageSelect />
      </div>
    </>
  );
};

export default Sidebar;
