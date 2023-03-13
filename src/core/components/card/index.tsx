import { Avatar } from 'antd';
import { PlaySquareOutlined } from '@ant-design/icons';
import React, { FC, ReactNode } from 'react';

import css from './index.module.css';

interface Field {
  title: string;
  value: string | number;
}

interface CardProps {
  title: ReactNode;
  subtitle: string | ReactNode;
  fields: Field[];
  controls?: ReactNode;
  showAvatar?: boolean;
  avatarIconUrl?: string;
}

const Card: FC<CardProps> = ({ title, subtitle, controls, fields, showAvatar, avatarIconUrl }: CardProps) => {
  return (
    <div className={css.card}>
      <div className={css.cardHeader}>
        <div className={css.cardTitle}>
          <div className={css.title}>
            {showAvatar && (
              <Avatar src={avatarIconUrl} size={32} icon={<PlaySquareOutlined />} className={css.defaultIconAvatar} />
            )}
            <h2>{title}</h2>
          </div>
          <span className={css.subtitle}>{subtitle}</span>
        </div>

        <div className={css.cardControls}>{controls}</div>
      </div>

      <div className={css.cardBody}>
        {fields.map((field) => (
          <div key={field.title} className={css.metaField}>
            <h5 className={css.metaFieldTitle}>{field.title}</h5>
            <h2 className={css.metaFieldValue}>{field.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
