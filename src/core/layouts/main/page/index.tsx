import { Outlet, Route, Routes } from 'react-router-dom';
import { routes } from 'routes';
import React, { FC, Fragment, Suspense, memo } from 'react';

import { ErrorBoundary, IndexScreen, Loader } from 'core/components';

import css from './index.module.css';

const Main: FC = () => {
  return (
    <div className={css.scroller}>
      <ErrorBoundary showComponentStack>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<Outlet />}>
              <Route index element={<IndexScreen />} />
              {routes.map((route) => (
                <Route key={route.path} path={`${route.path}/*`} element={<Outlet />}>
                  {route.subRoutes?.map((subRoute) => (
                    <Fragment key={subRoute.path || 'index'}>
                      <Route index={subRoute.index} path={subRoute.path} element={subRoute.element} />
                      <Route path="*" element={<>No match2</>} />
                    </Fragment>
                  ))}
                </Route>
              ))}

              <Route path="*" element={<>No match1</>} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default memo(Main);
