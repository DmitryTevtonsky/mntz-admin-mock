import React, { FC, Suspense, lazy } from 'react';
import cn from 'classnames';

import { Footer } from '../layouts/footer';
import { Header } from '../layouts/header';
import { Main } from '../layouts/main';
import { selectSidebarVisibility } from '../redux/selectors';

import { ErrorBoundary, Loader, Logo } from 'core/components';
import { useAppSelector } from 'store';

import css from './index.module.css';

const SidebarLazy = lazy(() => import(/* webpackChunkName: "sidebar-lazy"  */ '../layouts/sidebar'));

const Core: FC = () => {
  const sidebarVisibility = useAppSelector(selectSidebarVisibility);

  return (
    <section className={css.siteLayout}>
      <aside className={cn(css.aside, sidebarVisibility && css.asideVisible)}>
        <Logo />
        <ErrorBoundary showComponentStack invertedColors>
          <Suspense fallback={<Loader />}>
            <SidebarLazy />
          </Suspense>
        </ErrorBoundary>
      </aside>
      <section className={css.contentLayout}>
        <header className={css.header}>
          <Header />
        </header>
        <main className={css.main}>
          <Main />
        </main>
        <footer className={css.footer}>
          <Footer />
        </footer>
      </section>
    </section>
  );
};

export default Core;
