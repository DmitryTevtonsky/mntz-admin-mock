import { Button, Descriptions, Dropdown, Menu, Modal, Table } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'store';

import { Post, PostStatusEnum, RejectionReasonCodeEnum } from '../types';
import { selectActiveStatus } from '../redux/selectors';
import { updatePostState } from '../redux/slice';

import css from './index.module.css';

const { Column } = Table;

interface MediaSuccessProps {
  data: Post[];
}
const MediaSuccess: FC<MediaSuccessProps> = ({ data }: MediaSuccessProps) => {
  const dispatch = useAppDispatch();
  const [postToView, setPostToView] = useState<Post>();

  const { t: dt } = useTranslation();
  const { t } = useTranslation('admin-tasks-publications');

  const activeStatus = useAppSelector(selectActiveStatus);

  const handleViewPost = (post: Post) => {
    setPostToView(post);
  };

  const handleCloseModal = () => {
    setPostToView(undefined);
  };

  const handleApprovePost = () => {
    postToView?.id && dispatch(updatePostState({ id: postToView.id, state: 'active' }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRejectMenuClick = ({ key }: any) => {
    postToView?.id && dispatch(updatePostState({ id: postToView.id, state: 'bad_post', rejectionReasonCode: key }));
  };

  const menu = (
    <Menu onClick={handleRejectMenuClick}>
      <Menu.Item key={RejectionReasonCodeEnum.WRONG_MEDIA}>
        {t(`rejection-reasons.${RejectionReasonCodeEnum.WRONG_MEDIA}`)}
      </Menu.Item>
      <Menu.Item key={RejectionReasonCodeEnum.WRONG_TRACKING_LINK}>
        {t(`rejection-reasons.${RejectionReasonCodeEnum.WRONG_TRACKING_LINK}`)}
      </Menu.Item>
      <Menu.Item key={RejectionReasonCodeEnum.CONTUCT_US}>
        {t(`rejection-reasons.${RejectionReasonCodeEnum.CONTUCT_US}`)}
      </Menu.Item>
    </Menu>
  );

  return (
    <section className={css.layout}>
      <Table<Post> dataSource={data} rowKey="id" pagination={false}>
        <Column ellipsis title={t('columns.post-id')} dataIndex="id" key="id" />
        <Column
          ellipsis
          title={t('columns.creator-id')}
          dataIndex="creatorId"
          key="creatorId"
          render={(creatorId) => creatorId || dt('n/a')}
        />
        <Column
          ellipsis
          title={t('columns.offer-id')}
          dataIndex="offerId"
          key="offerId"
          render={(offerId) => <Link to={`/offers/${offerId}`}>{offerId}</Link> || dt('n/a')}
        />
        <Column
          ellipsis
          title={t('columns.media-id')}
          dataIndex="mediaAssetId"
          key="mediaAssetId"
          render={(mediaAssetId) => mediaAssetId || dt('n/a')}
        />
        <Column ellipsis title={t('columns.placements')} dataIndex="socialNetwork" key="socialNetwork" />

        <Column
          ellipsis
          title={t('columns.link')}
          dataIndex="postLink"
          key="postLink"
          render={(postLink) =>
            postLink ? (
              <a href={postLink} target="_blank" rel="noreferrer">
                {postLink}
              </a>
            ) : (
              dt('n/a')
            )
          }
        />

        <Column
          width={'80px'}
          title=""
          key="action"
          render={(record: Post) => (
            <Button className={css.viewButton} type="link" onClick={() => handleViewPost(record)}>
              {dt('view')}
            </Button>
          )}
        />
      </Table>
      <Modal
        className={css.modal}
        title={t('review-modal.title')}
        visible={!!postToView}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Descriptions
          column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          size="small"
          title={t('review-modal.description-title')}
        >
          <Descriptions.Item label={t('columns.post-id')}>{postToView?.id || dt('n/a')}</Descriptions.Item>
          <Descriptions.Item label={t('columns.creator-id')}>{postToView?.ownerId || dt('n/a')}</Descriptions.Item>
          <Descriptions.Item label={t('columns.offer-id')}>{postToView?.offerId || dt('n/a')}</Descriptions.Item>
          <Descriptions.Item label={t('columns.media-id')}>{postToView?.adAssetId || dt('n/a')}</Descriptions.Item>
          <Descriptions.Item label={t('columns.placements')}>
            {postToView?.socialNetwork || dt('n/a')}
          </Descriptions.Item>
          <Descriptions.Item label={t('columns.link')}>
            {postToView?.postLink ? (
              <a href={postToView.postLink} target="_blank" rel="noreferrer">
                {postToView.postLink}
              </a>
            ) : (
              dt('n/a')
            )}
          </Descriptions.Item>
        </Descriptions>
        <div className={css.modalControls}>
          {activeStatus !== PostStatusEnum.active && (
            <Button icon={<CheckCircleOutlined />} onClick={handleApprovePost}>
              {dt('approve')}
            </Button>
          )}
          {activeStatus !== PostStatusEnum.bad_post && <Dropdown.Button overlay={menu}>{dt('reject')}</Dropdown.Button>}
        </div>
      </Modal>
    </section>
  );
};

export default MediaSuccess;
