import { Avatar, Button, Form } from 'antd';
import { EditOutlined, PlaySquareOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import { ApplicationInfo } from '../../types';
import css from './index.module.css';

interface ApplicationFormDisplayProps {
  data: ApplicationInfo;
}
const ApplicationFormDisplay: FC<ApplicationFormDisplayProps> = ({ data }: ApplicationFormDisplayProps) => {
  const params = useParams();
  const { t } = useTranslation('applications');
  const { t: dt } = useTranslation();

  return (
    <div className={css.formLayout}>
      <Form className={css.form} layout="vertical">
        <Form.Item label={<h3>{t('form.appName')}:</h3>}>
          <h4>{data.appName || dt('n/a')}</h4>
        </Form.Item>
        <Form.Item label={<h3>{t('form.appCategory')}:</h3>}>
          <h4>{data.appCategory || dt('n/a')}</h4>
        </Form.Item>
        <Form.Item label={<h3>{t('form.iconFile')}:</h3>}>
          <Avatar src={data.iconUrl} size={100} icon={<PlaySquareOutlined className={css.defaultIconAvatar} />} />
        </Form.Item>
        <Form.Item label={<h3>{t('form.developer')}:</h3>}>
          <h4>{data.developerName || dt('n/a')}</h4>
        </Form.Item>
        <Form.Item label={<h3>{t('form.appStoreLink')}:</h3>}>
          <h4>{data.appStoreLink || dt('n/a')}</h4>
        </Form.Item>
        <Form.Item label={<h3>{t('form.googlePlayLink')}:</h3>}>
          <h4>{data.googlePlayLink || dt('n/a')}</h4>
        </Form.Item>
        <Form.Item label={<h3>{t('form.oneLinkSubdomain')}:</h3>}>
          <h4>{data.oneLinkSubdomain || dt('n/a')}</h4>
        </Form.Item>
        <Form.Item label={<h3>{t('form.oneLinkTemplateId')}:</h3>}>
          <h4>{data.oneLinkTemplateId || dt('n/a')}</h4>
        </Form.Item>
        <Form.Item className={css.submitButtonFormItem}>
          <Link to={`/applications/update/${params.appId}`}>
            <Button type="primary" htmlType="submit" size="large">
              <EditOutlined />
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ApplicationFormDisplay;
