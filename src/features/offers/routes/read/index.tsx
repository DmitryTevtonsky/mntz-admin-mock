import { Button, Tabs } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { FC, Suspense, lazy, memo } from 'react';

import { ErrorBoundary, Subheader } from 'core/components';

import css from './index.module.css';

const OfferTabLazy = lazy(() => import(/* webpackChunkName: "offer-tab-lazy"  */ './tabs/offer-tab'));

const MediaTabLazy = lazy(() => import(/* webpackChunkName: "offer-media-tab-lazy"  */ './tabs/media-tab'));

const ActivePostsTabLazy = lazy(
  () => import(/* webpackChunkName: "offer-active-posts-tab-lazy"  */ './tabs/active-posts-tab')
);

const ReadOffer: FC = () => {
  const params = useParams();
  const { t } = useTranslation('offers');

  return (
    <>
      <Subheader goBack goBackTo="/offers" title={t('readOfferTitle')} />

      <div className={css.layout}>
        <Tabs
          size="large"
          className={css.tabs}
          tabBarExtraContent={
            <Link to={`/offers/update/${params.offerId}`}>
              <Button type="primary" htmlType="submit" shape="round">
                <EditOutlined />
              </Button>
            </Link>
          }
        >
          <Tabs.TabPane tab={t('tabs.tab1')} key="1">
            <ErrorBoundary showComponentStack>
              <Suspense fallback={null}>
                <OfferTabLazy />
              </Suspense>
            </ErrorBoundary>
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('tabs.tab2')} key="2">
            <ErrorBoundary showComponentStack>
              <Suspense fallback={null}>
                <MediaTabLazy />
              </Suspense>
            </ErrorBoundary>
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('tabs.tab3')} key="3">
            <ErrorBoundary showComponentStack>
              <Suspense fallback={null}>
                <ActivePostsTabLazy />
              </Suspense>
            </ErrorBoundary>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default memo(ReadOffer);
