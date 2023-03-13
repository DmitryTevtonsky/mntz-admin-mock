import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import { Application } from '../types';
import { Card } from 'core/components';

import css from './index.module.css';

interface ApplicationsSuccessProps {
  data: Application[];
}
const ApplicationsSuccess: FC<ApplicationsSuccessProps> = ({ data }: ApplicationsSuccessProps) => {
  const { t } = useTranslation('applications');

  return (
    <section className={css.layout}>
      {data.map((app) => (
        <Card
          showAvatar
          avatarIconUrl={app.iconUrl || ''}
          key={app.id}
          title={<Link to={`${app.id}`}>{app.name}</Link>}
          subtitle={
            <>
              <span>{`${t('card.subtitle')}: ${app.developerId}`}</span>
              <span>{`${app.platforms[0]} ${app.platforms[1] && `& ${app.platforms[1]}`}`}</span>
            </>
          }
          controls={
            <Link to={`update/${app.id}`}>
              <Button type="primary" shape="round">
                <EditOutlined />
              </Button>
            </Link>
          }
          fields={[
            { title: t('card.column1'), value: app.posts },
            { title: t('card.column2'), value: app.installs },
            { title: t('card.column3'), value: app.totalSpend },
          ]}
        />
      ))}
    </section>
  );
};

export default ApplicationsSuccess;
