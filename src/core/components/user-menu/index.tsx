import { Button, Dropdown, Menu } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import React, { FC, memo } from 'react';
import type { MenuProps } from 'antd';

import { useAuth } from 'auth';

// import css from './index.module.css';

const UserMenu: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation('');

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'log-out') {
      auth.signout(() => {
        console.log('out');
      });
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          key: 'user-info',
          icon: <UserOutlined />,

          label: auth.user?.displayName || auth.user?.phoneNumber || 'No name',
        },
        {
          type: 'divider',
        },
        {
          icon: <LogoutOutlined />,

          key: 'log-out',
          label: t('log-out'),
        },
      ]}
    />
  );

  return (
    <Dropdown overlay={menu}>
      <Button shape="circle" icon={<UserOutlined />} type="primary" />
    </Dropdown>
  );
};

export default memo(UserMenu);
