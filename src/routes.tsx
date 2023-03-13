import {
  ApartmentOutlined,
  AppstoreOutlined,
  CheckCircleOutlined,
  CodeOutlined,
  DashboardOutlined,
  DollarOutlined,
  PlaySquareOutlined,
  ShareAltOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import React, { lazy } from 'react';

import { Route } from 'types';

import { ComingSoon } from 'core/components';

const DevelopersLazy = lazy(() => import(/* webpackChunkName: "developers-lazy"  */ 'features/developers'));
const DeveloperCreateLazy = lazy(
  () => import(/* webpackChunkName: "developer-create-lazy"  */ 'features/developers/routes/create')
);
const DeveloperReadLazy = lazy(
  () => import(/* webpackChunkName: "developer-read-lazy"  */ 'features/developers/routes/read')
);
const DeveloperUpdateLazy = lazy(
  () => import(/* webpackChunkName: "developer-update-lazy"  */ 'features/developers/routes/update')
);

const ApplicationsLazy = lazy(() => import(/* webpackChunkName: "applications-lazy"  */ 'features/applications'));
const ApplicationCreateLazy = lazy(
  () => import(/* webpackChunkName: "app-create-lazy"  */ 'features/applications/routes/create')
);
const ApplicationReadLazy = lazy(
  () => import(/* webpackChunkName: "app-read-lazy"  */ 'features/applications/routes/read')
);
const ApplicationUpdateLazy = lazy(
  () => import(/* webpackChunkName: "app-update-lazy"  */ 'features/applications/routes/update')
);

const OffersLazy = lazy(() => import(/* webpackChunkName: "offers-lazy"  */ 'features/offers'));
const OfferCreateLazy = lazy(
  () => import(/* webpackChunkName: "offer-create-lazy"  */ 'features/offers/routes/create')
);
const OfferReadLazy = lazy(() => import(/* webpackChunkName: "offer-read-lazy"  */ 'features/offers/routes/read'));
const OfferUpdateLazy = lazy(
  () => import(/* webpackChunkName: "offer-update-lazy"  */ 'features/offers/routes/update')
);

const MediaLazy = lazy(() => import(/* webpackChunkName: "admin-tasks-media-lazy"  */ 'features/admin-tasks/media'));

const PublicationsLazy = lazy(
  () => import(/* webpackChunkName: "admin-tasks-publications-lazy"  */ 'features/admin-tasks/publications')
);

const PaymentsLazy = lazy(
  () => import(/* webpackChunkName: "admin-tasks-payments-lazy"  */ 'features/admin-tasks/payments')
);

const CreatorsLazy = lazy(() => import(/* webpackChunkName: "creators-lazy"  */ 'features/creators'));

export const routes: Route[] = [
  {
    title: 'admin-tasks',
    icon: <CheckCircleOutlined />,
    path: 'admin-tasks',
    subRoutes: [
      {
        title: 'media-by-creators',
        icon: <PlaySquareOutlined />,
        path: 'media-by-creators',
        element: <MediaLazy />,
      },
      {
        title: 'publications-by-creators',
        icon: <ShareAltOutlined />,
        path: 'publications-by-creators',
        element: <PublicationsLazy />,
      },
      {
        title: 'payments-to-creators',
        icon: <DollarOutlined />,
        path: 'payments-to-creators',
        element: <PaymentsLazy />,
      },
    ],
  },
  {
    title: 'offers',
    icon: <ApartmentOutlined />,
    path: 'offers',
    subRoutes: [
      {
        index: true,
        element: <OffersLazy />,
      },
      {
        path: 'update/:offerId',
        element: <OfferUpdateLazy />,
      },
      {
        path: 'create',
        element: <OfferCreateLazy />,
      },
      {
        path: ':offerId',
        element: <OfferReadLazy />,
      },
    ],
  },
  {
    title: 'developers',
    icon: <CodeOutlined />,
    path: 'developers',
    subRoutes: [
      {
        index: true,
        element: <DevelopersLazy />,
      },
      {
        path: 'update/:developerId',
        element: <DeveloperUpdateLazy />,
      },
      {
        path: 'create',
        element: <DeveloperCreateLazy />,
      },
      {
        path: ':developerId',
        element: <DeveloperReadLazy />,
      },
    ],
  },
  {
    title: 'applications',
    icon: <AppstoreOutlined />,
    path: 'applications',
    subRoutes: [
      {
        index: true,
        element: <ApplicationsLazy />,
      },
      {
        path: 'update/:appId',
        element: <ApplicationUpdateLazy />,
      },
      {
        path: 'create',
        element: <ApplicationCreateLazy />,
      },
      {
        path: ':appId',
        element: <ApplicationReadLazy />,
      },
    ],
  },
  {
    title: 'creators',
    icon: <TeamOutlined />,
    path: 'creators',
    subRoutes: [
      {
        index: true,
        element: <CreatorsLazy />,
      },
    ],
  },
  {
    title: 'dashboard',
    icon: <DashboardOutlined />,
    path: 'dashboard',
    subRoutes: [
      {
        index: true,
        element: <ComingSoon />,
      },
    ],
  },
];
