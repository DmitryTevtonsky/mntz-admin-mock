import { Button, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { PresetStatusColorType } from 'antd/es/_util/colors';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import { Card } from 'core/components';
import { Offer, OfferState } from '../types';

import css from './index.module.css';

const getTagTypeByOfferState = (state: OfferState): PresetStatusColorType => {
  if (state === 'active') return 'processing';
  if (state === 'stopped') return 'success';
  if (state === 'paused') return 'warning';

  return 'default';
};

interface OffersSuccessProps {
  data: Offer[];
}
const OffersSuccess: FC<OffersSuccessProps> = ({ data }: OffersSuccessProps) => {
  const { t: dt } = useTranslation();
  const { t } = useTranslation('offers');

  return (
    <section className={css.layout}>
      {data.map((offer) => (
        <Card
          showAvatar
          avatarIconUrl={offer.appIconUrl || ''}
          key={offer.id}
          title={<Link to={`${offer.id}`}>{offer.appName || dt('n/a')}</Link>}
          subtitle={
            <span>
              <Tag color={getTagTypeByOfferState(offer.state)}>{offer.state}</Tag>
              {`${t('card.subtitle')}: ${offer.appId}`}
            </span>
          }
          controls={
            <Link to={`update/${offer.id}`}>
              <Button shape="round" type="primary">
                <EditOutlined />
              </Button>
            </Link>
          }
          fields={[
            { title: t('card.column1'), value: offer.posts },
            { title: t('card.column2'), value: offer.totalInstallCount },
            { title: t('card.column3'), value: offer.totalSpend },
          ]}
        />
      ))}
    </section>
  );
};

export default OffersSuccess;
