/* eslint-disable jsx-a11y/no-autofocus */
import { Button, Form, InputNumber, Select, message } from 'antd';
import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { memo, useEffect, useState } from 'react';

import { LoginForm1StepValues, LoginForm2StepValues } from '../types';
import { useAuth } from 'auth';

import { fbAuth } from '../firebase';

import css from './index.module.css';

const { Option } = Select;

const prefixSelector = (
  <Form.Item name="prefixCode" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="+7">+7</Option>
    </Select>
  </Form.Item>
);

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentStepLoading, setCurrentStepLoading] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<ConfirmationResult>();
  const [recaptcha, setRecaptcha] = useState<RecaptchaVerifier>();

  useEffect(() => {
    const verifier = new RecaptchaVerifier(
      'recaptcha',
      {
        size: 'invisible',
      },
      fbAuth
    );
    setRecaptcha(verifier);

    return () => {
      verifier.clear();
    };
  }, []);

  const handleGetCode = ({ prefixCode, phoneNumber }: LoginForm1StepValues) => {
    (async () => {
      if (!recaptcha) return;

      setCurrentStepLoading(true);

      const phoneNumberFull = `${prefixCode}${phoneNumber}`;

      const data = await auth.getSmsCode(phoneNumberFull, recaptcha);

      if (data.error) {
        message.error(data.error.code);
        setCurrentStepLoading(false);
        setCurrentStep(0);
      } else {
        setConfirmation(data.result);
        setCurrentStepLoading(false);
        setCurrentStep(1);
      }
    })();
  };

  const handlePassCode = ({ code }: LoginForm2StepValues) => {
    if (!confirmation) return;

    (async () => {
      setCurrentStepLoading(true);

      const data = await auth.signInWithSmsCode(confirmation, code);

      if (data.error) {
        message.error(data.error.code);
        setCurrentStepLoading(false);
        setCurrentStep(0);
      } else {
        setCurrentStepLoading(false);
        navigate('/', { replace: true });
      }
    })();
  };

  return (
    <div className={css.layout}>
      <div id="recaptcha" />

      {currentStep === 0 && (
        <Form
          form={form}
          initialValues={{ prefixCode: '+7' }}
          size="large"
          name="get-code-form"
          className={css.loginForm}
          onFinish={handleGetCode}
        >
          <Form.Item name="phoneNumber" rules={[{ required: true, message: t('phone-number-message') }]}>
            <InputNumber
              autoFocus
              style={{ width: '100%' }}
              controls={false}
              addonBefore={prefixSelector}
              placeholder={t('phone-number')}
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={currentStep === 0 && currentStepLoading}
              id="get-code-button"
              type="primary"
              htmlType="submit"
            >
              {t('get-code')}
            </Button>
          </Form.Item>
        </Form>
      )}
      {currentStep === 1 && (
        <Form size="large" name="pass-code-form" className={css.loginForm} onFinish={handlePassCode}>
          <Form.Item name="code" rules={[{ required: true, message: t('code-message') }]}>
            <InputNumber autoFocus style={{ width: '100%' }} controls={false} placeholder={t('code')} />
          </Form.Item>

          <Form.Item>
            <Button
              loading={currentStep === 1 && currentStepLoading}
              id="login-button"
              type="primary"
              htmlType="submit"
            >
              {t('log-in')}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default memo(Login);
