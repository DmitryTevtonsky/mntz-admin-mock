import { Button, Descriptions, Dropdown, Menu, Modal, Table } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import React, { FC, useState } from 'react';

import { useAppDispatch } from 'store';

import { Creator, CreatorStatusEnum, RejectionReasonCodeEnum } from '../types';
import { updateCreatorState } from '../redux/slice';

import css from './index.module.css';

const { Column } = Table;

interface CreatorsSuccessProps {
  data: Creator[];
}
const CreatorsSuccess: FC<CreatorsSuccessProps> = ({ data }: CreatorsSuccessProps) => {
  const dispatch = useAppDispatch();
  const [creatorToView, setMediaToView] = useState<Creator>();

  const { t: dt } = useTranslation();
  const { t } = useTranslation('creators');

  const handleViewMedia = (creator: Creator) => {
    setMediaToView(creator);
  };

  const handleCloseModal = () => {
    setMediaToView(undefined);
  };

  const handleApproveCreator = () => {
    creatorToView?.id && dispatch(updateCreatorState({ id: creatorToView.id, state: CreatorStatusEnum.active }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRejectMenuClick = ({ key }: any) => {
    creatorToView?.id &&
      dispatch(
        updateCreatorState({ id: creatorToView.id, state: CreatorStatusEnum.deleted, rejectionReasonCode: key })
      );
  };

  const menu = (
    <Menu onClick={handleRejectMenuClick}>
      <Menu.Item key={RejectionReasonCodeEnum.OWNERSHIP_NOT_CONFIRMED}>
        {t(`rejection-reasons.${RejectionReasonCodeEnum.OWNERSHIP_NOT_CONFIRMED}`)}
      </Menu.Item>
      <Menu.Item key={RejectionReasonCodeEnum.NOT_ENOUGH_SUBS}>
        {t(`rejection-reasons.${RejectionReasonCodeEnum.NOT_ENOUGH_SUBS}`)}
      </Menu.Item>
      <Menu.Item key={RejectionReasonCodeEnum.GEO_NOT_SUPPORTED}>
        {t(`rejection-reasons.${RejectionReasonCodeEnum.GEO_NOT_SUPPORTED}`)}
      </Menu.Item>
    </Menu>
  );

  return (
    <section className={css.layout}>
      <Table<Creator> dataSource={data} rowKey="id" pagination={false}>
        <Column ellipsis title={t('columns.creator-id')} dataIndex="id" key="id" width={'20%'} />
        <Column
          ellipsis
          title={t('columns.brand-name')}
          dataIndex="brandName"
          key="brandName"
          render={(brandName) => brandName || dt('n/a')}
        />
        <Column
          ellipsis
          title={t('columns.ownership-confirmed')}
          dataIndex="ownershipConfirmed"
          key="ownershipConfirmed"
        />

        <Column ellipsis title={t('columns.subs-count')} dataIndex="subscribersCount" key="subscribersCount" />

        <Column
          width={'80px'}
          title=""
          key="action"
          render={(record: Creator) => (
            <Button className={css.viewButton} type="link" onClick={() => handleViewMedia(record)}>
              {dt('view')}
            </Button>
          )}
        />
      </Table>
      <Modal
        className={css.modal}
        title={t('review-modal.title')}
        visible={!!creatorToView}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Descriptions
          column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          size="small"
          title={t('review-modal.description-title')}
        >
          <Descriptions.Item label={t('columns.creator-id')}>{creatorToView?.id || dt('n/a')}</Descriptions.Item>
          <Descriptions.Item label={t('columns.brand-name')}>{creatorToView?.brandName || dt('n/a')}</Descriptions.Item>
          <Descriptions.Item label={t('columns.ownership-confirmed')}>
            {creatorToView?.ownershipConfirmed || dt('n/a')}
          </Descriptions.Item>
          <Descriptions.Item label={t('columns.subs-count')}>
            {creatorToView?.subscribersCount || dt('n/a')}
          </Descriptions.Item>
        </Descriptions>
        <div className={css.modalControls}>
          <Button icon={<CheckCircleOutlined />} onClick={handleApproveCreator}>
            {dt('approve')}
          </Button>
          <Dropdown.Button overlay={menu}>{dt('reject')}</Dropdown.Button>
        </div>
      </Modal>
    </section>
  );
};

export default CreatorsSuccess;
