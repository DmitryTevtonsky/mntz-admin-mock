import { Button, Form, InputNumber, Table } from 'antd';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import { Payment } from '../../types';
import { addDeveloperPayment } from '../../redux/slice';

import { useAppDispatch } from 'store';

import css from './index.module.css';

const { Column } = Table;

interface BalanceProps {
  data: Payment[];
}

const BalanceSuccess: FC<BalanceProps> = ({ data }: BalanceProps) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { t } = useTranslation('developers');

  const handleSubmit = (values: Payment) => {
    params.developerId && dispatch(addDeveloperPayment({ amount: values.amount, id: params.developerId }));
  };

  return (
    <>
      <Form layout="inline" className={css.form} autoComplete="off" onFinish={handleSubmit}>
        <Form.Item
          className={css.formInputItem}
          name="amount"
          rules={[{ required: true, message: `${t('balance.paymentAmountMessage')}` }]}
        >
          <InputNumber className={css.inputNumber} placeholder={t('balance.paymentAmount')} />
        </Form.Item>

        <Form.Item className={css.formSubmitItem}>
          <Button type="primary" htmlType="submit">
            {t('balance.add')}
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={data} pagination={false} rowKey={() => `${Math.random()}`}>
        <Column title={t('balance.paymentAmount')} dataIndex="amount" key="amount" />
      </Table>
    </>
  );
};

export default BalanceSuccess;
