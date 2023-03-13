import { Button, Form, Input } from 'antd';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { FC, useMemo } from 'react';

import { trimObjectValues } from 'libs/utils';
import { useAppDispatch } from 'store';

import { DeveloperInfo } from '../../types';
import { createDeveloper, updateDeveloper } from '../../redux/slice';

import css from './index.module.css';

interface DevelopersFormProps {
  mode: 'create' | 'update';
  data?: DeveloperInfo;
}

const DevelopersForm: FC<DevelopersFormProps> = ({ mode = 'update', data }: DevelopersFormProps) => {
  const { t } = useTranslation('developers');
  const dispatch = useAppDispatch();
  const params = useParams();

  const onFinish = (values: DeveloperInfo) => {
    const trimmedValues = trimObjectValues<DeveloperInfo>(values);

    mode === 'create'
      ? dispatch(createDeveloper(trimmedValues))
      : dispatch(updateDeveloper({ id: params.developerId, ...trimmedValues }));
  };

  const fields = useMemo(() => {
    return data
      ? [
          { name: ['companyName'], value: data.companyName },
          { name: ['email'], value: data.email },
          { name: ['login'], value: data.login },
          { name: ['phone'], value: data.phone },
          { name: ['password'], value: 'XXXXXXXXX' },
        ]
      : undefined;
  }, [data]);

  return (
    <div className={css.formLayout}>
      <Form
        className={css.form}
        name={`developer-${mode}`}
        onFinish={onFinish}
        fields={fields || undefined}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label={<h3>{`${t('form.companyName')}:`}</h3>}
          name="companyName"
          rules={[{ required: true, message: `${t('form.companyNameMessage')}!` }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<h3>{`${t('form.email')}:`}</h3>}
          name="email"
          rules={[{ required: true, message: `${t('form.emailMessage')}!` }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<h3>{`${t('form.phone')}:`}</h3>}
          name="phone"
          rules={[{ required: true, message: `${t('form.phoneMessage')}!` }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<h3>{`${t('form.login')}:`}</h3>}
          name="login"
          rules={[{ required: true, message: `${t('form.loginMessage')}!` }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<h3>{`${t('form.password')}:`}</h3>}
          name="password"
          rules={[{ required: true, message: `${t('form.passwordMessage')}!` }]}
        >
          <Input />
        </Form.Item>

        <Form.Item className={css.submitButtonFormItem}>
          <Button type="primary" htmlType="submit" size="large">
            {mode === 'create' ? t('createDeveloper') : t('updateDeveloper')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DevelopersForm;
