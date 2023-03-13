import { Button, Tabs } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect } from 'react';

import { DeveloperInfo } from 'features/developers/types';
import { ErrorHolder, Loader, Subheader } from 'core/components';
import { fold } from 'libs/remote';
import { useAppDispatch, useAppSelector } from 'store';

import { Balance, DevelopersFormDisplay } from '../../components';
import { readDeveloper } from '../../redux/slice';
import { selectDeveloperInfo } from '../../redux/selectors';

import css from './index.module.css';

const developerInfoFolder = fold<DeveloperInfo>(
  (data) => <DevelopersFormDisplay data={data} />,
  () => <></>,
  () => <Loader />,
  (error) => <ErrorHolder error={error} />
);

const ReadDeveloper: FC = () => {
  const { t } = useTranslation('developers');
  const dispatch = useAppDispatch();
  const params = useParams();

  const developerInfo = useAppSelector(selectDeveloperInfo);

  useEffect(() => {
    params.developerId && dispatch(readDeveloper(params.developerId));
  }, [dispatch, params.developerId]);

  return (
    <>
      <Subheader goBack goBackTo="/developers" title={t('readDeveloperTitle')} />

      <div className={css.layout}>
        <Tabs
          size="large"
          className={css.tabs}
          tabBarExtraContent={
            <Link to={`/developers/update/${params.developerId}`}>
              <Button type="primary" htmlType="submit" shape="round">
                <EditOutlined />
              </Button>
            </Link>
          }
        >
          <Tabs.TabPane tab={t('tabs.tab1')} key="1">
            {developerInfoFolder(developerInfo)}
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('tabs.tab2')} key="2">
            <Balance />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default ReadDeveloper;
