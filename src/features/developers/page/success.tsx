import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import { Card } from 'core/components';
import { Developer } from '../types';

import css from './index.module.css';

interface DevelopersSuccessProps {
  data: Developer[];
}
const DevelopersSuccess: FC<DevelopersSuccessProps> = ({ data }: DevelopersSuccessProps) => {
  const { t } = useTranslation('developers');

  return (
    <section className={css.layout}>
      {data.map((developer) => (
        <Card
          key={developer.id}
          title={<Link to={`${developer.id}`}>{developer.companyName}</Link>}
          subtitle={`${t('card.subtitle')}: ${developer.id}`}
          controls={
            <Link to={`update/${developer.id}`}>
              <Button type="primary" shape="round">
                <EditOutlined />
              </Button>
            </Link>
          }
          fields={[
            { title: t('card.column1'), value: developer.appsCount },
            { title: t('card.column2'), value: developer.balance },
            { title: t('card.column3'), value: developer.installsCount },
          ]}
        />
      ))}
    </section>
  );
};

export default DevelopersSuccess;
