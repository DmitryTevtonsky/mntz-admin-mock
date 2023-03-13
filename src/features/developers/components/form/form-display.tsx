import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import { DeveloperInfo } from '../../types';

import css from './index.module.css';

interface DeveloperFormDisplayProps {
  data: DeveloperInfo;
}
const DeveloperFormDisplay: FC<DeveloperFormDisplayProps> = ({ data }: DeveloperFormDisplayProps) => {
  const { t } = useTranslation('developers');
  const { t: dt } = useTranslation();

  return (
    <div className={css.formLayout}>
      <Form className={css.formDisplay} layout="vertical">
        <Form.Item label={<h3>{`${t('form.companyName')}:`}</h3>}>
          <h4>{data.companyName || dt('n/a')}</h4>
        </Form.Item>
        <Form.Item label={<h3>{`${t('form.email')}:`}</h3>}>
          <h4>{data.email || dt('n/a')}</h4>
        </Form.Item>
        <Form.Item label={<h3>{`${t('form.phone')}:`}</h3>}>
          <h4>{data.phone || dt('n/a')}</h4>
        </Form.Item>
        <Form.Item label={<h3>{`${t('form.login')}:`}</h3>}>
          <h4>{data.login || dt('n/a')}</h4>
        </Form.Item>
        <Form.Item label={<h3>{`${t('form.password')}:`}</h3>}>
          <h4>{data.password || 'XXXXXXXXXXXXXXXXX'}</h4>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DeveloperFormDisplay;
