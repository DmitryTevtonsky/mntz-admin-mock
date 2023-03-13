import { Table } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import { ActivePost } from '../../types';

// import css from './index.module.css';

const { Column } = Table;

interface ActivePostsProps {
  data: ActivePost[];
}
const ActivePosts: FC<ActivePostsProps> = ({ data }: ActivePostsProps) => {
  const { t } = useTranslation('offers');

  return (
    <Table<ActivePost> dataSource={data} rowKey="id" pagination={false} size="small">
      {/* <Column ellipsis title={t('activePosts.id')} dataIndex="id" key="id" /> */}

      <Column ellipsis title={t('activePosts.creatorId')} dataIndex="creatorId" key="creatorId" width={'15%'} />
      <Column
        ellipsis
        title={t('activePosts.mediaAssetId')}
        dataIndex="mediaAssetId"
        key="mediaAssetId"
        width={'15%'}
      />
      <Column ellipsis title={t('activePosts.offerId')} dataIndex="offerId" key="offerId" width={'15%'} />
      <Column
        ellipsis
        title={t('activePosts.socialNetwork')}
        dataIndex="socialNetwork"
        key="socialNetwork"
        width={'20%'}
      />
      <Column ellipsis title={t('activePosts.state')} dataIndex="state" key="state" width={'10%'} />

      <Column
        ellipsis
        title={t('activePosts.postLink')}
        dataIndex="postLink"
        key="postLink"
        width={'20%'}
        render={(postLink) => (
          <a href={postLink} target="_blank" rel="noreferrer">
            {postLink}
          </a>
        )}
      />
    </Table>
  );
};

export default ActivePosts;
