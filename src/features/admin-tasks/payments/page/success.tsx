import { Button, Descriptions, Dropdown, Menu, Modal, Table } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import React, { FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'store';

import { Payment, PaymentCredentials, PaymentsStatusEnum, RejectionReasonCodeEnum } from '../types';
import { updatePaymentsState } from '../redux/slice';

import { selectActiveStatus } from '../redux/selectors';
import { useTranslation } from 'react-i18next';
import css from './index.module.css';

const { Column } = Table;

interface PaymentsSuccessProps {
  data: Payment[];
}
const PaymentsSuccess: FC<PaymentsSuccessProps> = ({ data }: PaymentsSuccessProps) => {
  const dispatch = useAppDispatch();
  const [paymentToView, setPaymentsToView] = useState<Payment>();

  const { t: dt } = useTranslation();
  const { t } = useTranslation('admin-tasks-payments');

  const activeStatus = useAppSelector(selectActiveStatus);

  const handleViewPayments = (payment: Payment) => {
    setPaymentsToView(payment);
  };

  const handleCloseModal = () => {
    setPaymentsToView(undefined);
  };

  const handleApprovePayments = () => {
    paymentToView?.id && dispatch(updatePaymentsState({ id: paymentToView.id, state: 'completed' }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRejectMenuClick = ({ key }: any) => {
    paymentToView?.id &&
      dispatch(updatePaymentsState({ id: paymentToView.id, state: 'rejected', rejectionReasonCode: key }));
  };

  const menu = (
    <Menu onClick={handleRejectMenuClick}>
      <Menu.Item key={RejectionReasonCodeEnum.POOR_QUALITY}>
        {t(`rejection-reasons.${RejectionReasonCodeEnum.POOR_QUALITY}`)}
      </Menu.Item>
      <Menu.Item key={RejectionReasonCodeEnum.INAPPROPRIATE}>
        {t(`rejection-reasons.${RejectionReasonCodeEnum.INAPPROPRIATE}`)}
      </Menu.Item>
      <Menu.Item key={RejectionReasonCodeEnum.COPYRIGHT_VIOLATION}>
        {t(`rejection-reasons.${RejectionReasonCodeEnum.COPYRIGHT_VIOLATION}`)}
      </Menu.Item>
    </Menu>
  );

  return (
    <section className={css.layout}>
      <Table<Payment> dataSource={data} rowKey="id" pagination={false}>
        <Column ellipsis title={t('columns.creator-id')} dataIndex="creatorId" key="creatorId" width={'10%'} />
        <Column ellipsis title={t('columns.amount')} dataIndex="amount" key="amount" />
        <Column
          ellipsis
          title={t('columns.created-at')}
          dataIndex="createdAt"
          key="createdAt"
          width={'15%'}
          render={(dateString: string) => new Date(dateString).toLocaleString() || dt('n/a')}
        />
        <Column
          ellipsis
          title={t('columns.payment-method-type')}
          dataIndex="paymentMethodType"
          key="paymentMethodType"
          width={'12%'}
          render={(paymentMethodType) => paymentMethodType || dt('n/a')}
        />
        <Column ellipsis title={t('columns.state')} dataIndex="state" key="state" width={'10%'} />
        <Column
          ellipsis
          title={t('columns.payment-credentials')}
          dataIndex="paymentMethodCredentials"
          key="paymentMethodCredentials"
          className={css.paymentCredentialsCell}
          render={(paymentMethodCredentials: PaymentCredentials) => (
            <>
              <span>{paymentMethodCredentials.card_number || dt('n/a')}</span>
              <span>{paymentMethodCredentials.holder_name || dt('n/a')}</span>
            </>
          )}
        />

        <Column
          width={'80px'}
          title=""
          key="action"
          render={(_, record: Payment) => (
            <Button className={css.viewButton} type="link" onClick={() => handleViewPayments(record)}>
              {dt('view')}
            </Button>
          )}
        />
      </Table>
      <Modal
        className={css.modal}
        title={t('review-modal.title')}
        visible={!!paymentToView}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Descriptions
          column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          size="small"
          title={t('review-modal.description-title')}
        >
          <Descriptions.Item label={t('columns.payment-id')}>{paymentToView?.id || dt('n/a')}</Descriptions.Item>
          <Descriptions.Item label={t('columns.creator-id')}>{paymentToView?.creatorId || dt('n/a')}</Descriptions.Item>
          <Descriptions.Item label={t('columns.amount')}>{paymentToView?.amount || dt('n/a')}</Descriptions.Item>
          <Descriptions.Item label={t('columns.state')}>{paymentToView?.state || dt('n/a')}</Descriptions.Item>

          <Descriptions.Item label={t('columns.payment-method-type')}>
            {paymentToView?.paymentMethodType || dt('n/a')}
          </Descriptions.Item>
          <Descriptions.Item label={t('columns.created-at')}>
            {new Date(paymentToView?.createdAt || '').toLocaleString() || dt('n/a')}
          </Descriptions.Item>

          <Descriptions.Item label={t('columns.payment-credentials')}>
            {paymentToView?.paymentMethodCredentials.holder_name || dt('n/a')}
          </Descriptions.Item>
          <Descriptions.Item label={t('columns.payment-credentials')}>
            {paymentToView?.paymentMethodCredentials.card_number || dt('n/a')}
          </Descriptions.Item>
        </Descriptions>
        <div className={css.modalControls}>
          {activeStatus !== PaymentsStatusEnum.completed && (
            <Button icon={<CheckCircleOutlined />} onClick={handleApprovePayments}>
              {dt('approve')}
            </Button>
          )}
          {activeStatus !== PaymentsStatusEnum.rejected && (
            <Dropdown.Button overlay={menu}>{dt('reject')}</Dropdown.Button>
          )}
        </div>
      </Modal>
    </section>
  );
};

export default PaymentsSuccess;
