import { Avatar, Button, Descriptions, Dropdown, Image, Menu, Modal, Table, Tag } from 'antd';
import { CheckCircleOutlined, FileExclamationOutlined, LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React, { FC, Fragment, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'store';

import { Media, MediaStatusEnum, Placements, RejectionReasonCodeEnum } from '../types';
import { updateMediaState } from '../redux/slice';

import { selectActiveStatus } from '../redux/selectors';
import { useTranslation } from 'react-i18next';
import css from './index.module.css';

const { Column } = Table;

const renderPlacementsTags = (placements: Placements) =>
  Object.keys(placements).map((socialNetworkKey) => (
    <Fragment key={socialNetworkKey}>
      {placements[socialNetworkKey].map((place) => (
        <Tag
          className={css.tag}
          color="blue"
          key={`${socialNetworkKey}-${place}`}
        >{`${socialNetworkKey}-${place}`}</Tag>
      ))}
    </Fragment>
  ));

interface MediaSuccessProps {
  data: Media[];
}
const MediaSuccess: FC<MediaSuccessProps> = ({ data }: MediaSuccessProps) => {
  const dispatch = useAppDispatch();
  const [mediaToView, setMediaToView] = useState<Media>();

  const { t: dt } = useTranslation();
  const { t } = useTranslation('admin-tasks-media');

  const activeStatus = useAppSelector(selectActiveStatus);

  const handleViewMedia = (media: Media) => {
    setMediaToView(media);
  };

  const handleCloseModal = () => {
    setMediaToView(undefined);
  };

  const handleApproveMedia = () => {
    mediaToView?.id && dispatch(updateMediaState({ id: mediaToView.id, state: 'approved' }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRejectMenuClick = ({ key }: any) => {
    mediaToView?.id && dispatch(updateMediaState({ id: mediaToView.id, state: 'rejected', rejectionReasonCode: key }));
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
      <Table<Media> dataSource={data} rowKey="id" pagination={false}>
        <Column ellipsis title={t('columns.media-id')} dataIndex="id" key="id" width={'20%'} />
        <Column
          ellipsis
          title={t('columns.offer-id')}
          dataIndex="offerId"
          key="offerId"
          width={'20%'}
          render={(offerId) => <Link to={`/offers/${offerId}`}>{offerId}</Link>}
        />
        <Column
          ellipsis
          title={t('columns.creator-id')}
          dataIndex="ownerId"
          key="ownerId"
          render={(ownerId) => ownerId || t('admin')}
        />
        <Column
          width={'80px'}
          ellipsis
          title={t('columns.filePreview')}
          dataIndex="urlSmall"
          key="urlSmall"
          render={(urlSmall) => {
            return urlSmall ? (
              <Avatar size={40} src={urlSmall} />
            ) : (
              <Avatar size={40} icon={<FileExclamationOutlined />} />
            );
          }}
        />
        <Column
          ellipsis
          title={t('columns.placements')}
          dataIndex="placements"
          key="placements"
          render={(placements: Placements) => renderPlacementsTags(placements)}
        />

        <Column
          width={'80px'}
          title=""
          key="action"
          render={(record: Media) => (
            <Button className={css.viewButton} type="link" onClick={() => handleViewMedia(record)}>
              {dt('view')}
            </Button>
          )}
        />
      </Table>
      <Modal
        className={css.modal}
        title={t('review-modal.title')}
        visible={!!mediaToView}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose
      >
        {mediaToView?.urlLarge.toLowerCase().includes('mov') || mediaToView?.urlLarge.toLowerCase().includes('mp4') ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video controls width={'100%'} src={mediaToView?.urlLarge}>
            <p>
              {`Your browser doesn't support HTML5 video. Here is a ${(
                <a href={mediaToView?.urlLarge}>link to the video</a>
              )}
              instead.`}
            </p>
          </video>
        ) : (
          <Image
            wrapperClassName={css.image}
            src={mediaToView?.urlLarge}
            placeholder={<LoadingOutlined />}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
          />
        )}
        <Descriptions
          column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          size="small"
          className={css.modalDescriptions}
          title={t('review-modal.description-title')}
        >
          <Descriptions.Item label={t('columns.media-id')}>{mediaToView?.id || dt('n/a')}</Descriptions.Item>
          <Descriptions.Item label={t('columns.offer-id')}>{mediaToView?.offerId || dt('n/a')}</Descriptions.Item>
          <Descriptions.Item label={t('columns.creator-id')}>{mediaToView?.ownerId || t('admin')}</Descriptions.Item>
          <Descriptions.Item label={t('columns.placements')}>
            {mediaToView?.placements ? renderPlacementsTags(mediaToView?.placements) : dt('n/a')}
          </Descriptions.Item>
        </Descriptions>
        <div className={css.modalControls}>
          {activeStatus !== MediaStatusEnum.approved && (
            <Button icon={<CheckCircleOutlined />} onClick={handleApproveMedia}>
              {dt('approve')}
            </Button>
          )}

          {activeStatus !== MediaStatusEnum.rejected && (
            <Dropdown.Button overlay={menu}>{dt('reject')}</Dropdown.Button>
          )}
        </div>
      </Modal>
    </section>
  );
};

export default MediaSuccess;
