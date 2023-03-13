import { Avatar, Button, Divider, Form } from 'antd';
import { PlaySquareOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import { useAppDispatch } from 'store';

import { OfferInfo, OfferState } from '../../types';
import { updateOfferState } from '../../redux/slice';

import css from './index.module.css';

interface OfferFormDisplayProps {
  data: OfferInfo;
}
const OfferFormDisplay: FC<OfferFormDisplayProps> = ({ data }: OfferFormDisplayProps) => {
  const dispatch = useAppDispatch();

  const { t: dt } = useTranslation();
  const { t } = useTranslation('offers');

  const params = useParams();

  const handleChangeStatus = (value: OfferState) => {
    params.offerId && dispatch(updateOfferState({ offerId: params.offerId, state: value }));
  };

  const renderStatusControls = () => {
    if (data.state === 'stopped') return null;
    if (data.state === 'active') {
      return (
        <>
          <Button className={css.controlButton} onClick={() => handleChangeStatus('paused')}>
            {t('form.status.setPause')}
          </Button>
          <Button className={css.controlButton} type="primary" onClick={() => handleChangeStatus('stopped')} danger>
            {t('form.status.setStop')}
          </Button>
        </>
      );
    }
    if (data.state === 'paused') {
      return (
        <>
          <Button className={css.controlButton} onClick={() => handleChangeStatus('active')}>
            {t('form.status.setActive')}
          </Button>
          <Button className={css.controlButton} type="primary" onClick={() => handleChangeStatus('stopped')} danger>
            {t('form.status.setStop')}
          </Button>
        </>
      );
    }
  };

  return (
    <div className={css.formLayout}>
      <Form className={css.formDisplay} layout="vertical">
        <div className={css.appInfoLayout}>
          <div className={css.appInfoDescriptionLayout}>
            <h2 className={css.appInfoName}>{data.appName || dt('n/a')}</h2>

            <h4 className={css.appInfoSecondary}>{`${t('form.appId')}: ${data.appId || dt('n/a')}`}</h4>

            <h4 className={css.appInfoSecondary}>{`${t('form.appCategory')}: ${data.appCategory || dt('n/a')}`}</h4>
          </div>
          <Avatar src={data.appIconUrl} size={100} icon={<PlaySquareOutlined className={css.defaultIconAvatar} />} />
        </div>

        <Divider />

        <div className={css.specialFormListItem}>
          <Form.Item label={<h3>{`${t('form.budget')}:`}</h3>}>
            <h4>{data.budget || dt('n/a')}</h4>
          </Form.Item>

          <Form.Item label={<h3>{`${t('form.balance')}:`}</h3>}>
            <h4>{data.balance || dt('n/a')}</h4>
          </Form.Item>
        </div>

        <Divider orientation="left">iOs</Divider>

        <Form.Item label={<h3>{`${t('form.baseReward')}:`}</h3>}>
          <h4>{data.iosBaseReward || dt('n/a')}</h4>
        </Form.Item>

        <Form.List name="iosRewardByCountry">
          {() => (
            <>
              {Object.keys(data.iosRewardByCountry || {}).length > 0 && (
                <Form.Item style={{ margin: 0 }}>
                  <Divider orientation="left">{t('form.rewardByCountry.title')}</Divider>
                </Form.Item>
              )}
              {Object.keys(data.iosRewardByCountry || {}).map((country) => {
                return (
                  <div key={country} className={css.specialFormListItem}>
                    <Form.Item label={<h3>{`${t('form.rewardByCountry.country')}:`}</h3>}>
                      <h4>{country}</h4>
                    </Form.Item>
                    <Form.Item label={<h3>{`${t('form.rewardByCountry.price')}:`}</h3>}>
                      <h4>{data.iosRewardByCountry[country]}</h4>
                    </Form.Item>
                  </div>
                );
              })}
            </>
          )}
        </Form.List>

        <Divider orientation="left">Android</Divider>

        <Form.Item label={<h3>{`${t('form.baseReward')}:`}</h3>}>
          <h4>{data.androidBaseReward || dt('n/a')}</h4>
        </Form.Item>

        <Form.List name="iosRewardByCountry">
          {() => (
            <>
              {Object.keys(data.androidRewardByCountry || {}).length > 0 && (
                <Form.Item style={{ margin: 0 }}>
                  <Divider orientation="left">{t('form.rewardByCountry.title')}</Divider>
                </Form.Item>
              )}
              {Object.keys(data.androidRewardByCountry || {}).map((country) => {
                return (
                  <div key={country} className={css.specialFormListItem}>
                    <Form.Item label={<h3>{`${t('form.rewardByCountry.country')}:`}</h3>}>
                      <h4>{country}</h4>
                    </Form.Item>
                    <Form.Item label={<h3>{`${t('form.rewardByCountry.price')}:`}</h3>}>
                      <h4>{data.androidRewardByCountry[country]}</h4>
                    </Form.Item>
                  </div>
                );
              })}
            </>
          )}
        </Form.List>

        <Form.Item noStyle>
          <Divider orientation="left">{`${t('form.status.title')}: "${t(`form.status.${data.state}`)}"`}</Divider>

          {renderStatusControls()}
        </Form.Item>
      </Form>
    </div>
  );
};

export default OfferFormDisplay;
