import { Button, Divider, Form, Input, InputNumber, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useMemo } from 'react';

import { fold } from 'libs/remote';
import { trimObjectValues } from 'libs/utils';
import { useAppDispatch, useAppSelector } from 'store';

import { AppForSelect, OfferInfo, OfferInfoForm } from '../../types';
import { countriesData } from '../../data/countries';
import { createOffer, fetchApplicationsForSelect, updateOffer } from '../../redux/slice';
import { selectApplicationsForSelect } from '../../redux/selectors';

import css from './index.module.css';

const { Option } = Select;

const appSelectFolder = fold<AppForSelect[]>(
  (data) => (
    <Select allowClear>
      {data.map((dev) => (
        <Option key={dev.id} value={dev.id}>
          {dev.name}
        </Option>
      ))}
    </Select>
  ),
  () => <></>,
  () => <Select loading />,
  () => <Select disabled />
);

interface OfferFormProps {
  mode: 'create' | 'update';
  data?: OfferInfo;
}

const OfferForm: FC<OfferFormProps> = ({ mode = 'update', data }: OfferFormProps) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const applicationsForSelect = useAppSelector(selectApplicationsForSelect);
  const { t } = useTranslation('offers');

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchApplicationsForSelect());
  }, [dispatch]);

  const formFields = useMemo(() => {
    return data
      ? [
          { name: ['appId'], value: data.appId },
          { name: ['budget'], value: data.budget },
          { name: ['androidBaseReward'], value: data.androidBaseReward },
          { name: ['iosBaseReward'], value: data.iosBaseReward },
          {
            name: ['androidRewardByCountry'],
            value: data.androidRewardByCountry
              ? Object.keys(data.androidRewardByCountry).map((country) => ({
                  country: country,
                  price: data.androidRewardByCountry[country],
                }))
              : [],
          },
          {
            name: ['iosRewardByCountry'],
            value: data.iosRewardByCountry
              ? Object.keys(data.iosRewardByCountry).map((country) => ({
                  country: country,
                  price: data.iosRewardByCountry[country],
                }))
              : [],
          },
        ]
      : undefined;
  }, [data]);

  const onFinish = (values: OfferInfoForm) => {
    const trimmedValues = trimObjectValues<OfferInfoForm>(values);

    mode === 'create'
      ? dispatch(createOffer(trimmedValues))
      : dispatch(updateOffer({ id: params.offerId, ...trimmedValues }));
  };

  return (
    <div className={css.formLayout}>
      <Form
        form={form}
        className={css.form}
        name={`developer-${mode}`}
        onFinish={onFinish}
        fields={formFields}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label={<h3>{`${t('form.app')}:`}</h3>}
          name="appId"
          rules={[{ required: true, message: `${t('form.appMessage')}!` }]}
        >
          {appSelectFolder(applicationsForSelect)}
        </Form.Item>

        <Form.Item
          label={<h3>{`${t('form.budget')}:`}</h3>}
          name="budget"
          rules={[{ required: true, message: `${t('form.budgetMessage')}!` }]}
        >
          <Input />
        </Form.Item>

        <Divider orientation="left">iOs</Divider>

        <Form.Item
          label={<h3>{`${t('form.baseReward')}:`}</h3>}
          name="iosBaseReward"
          rules={[{ required: true, message: `${t('form.baseRewardMessage')}!` }]}
        >
          <Input />
        </Form.Item>

        <Form.List name="iosRewardByCountry">
          {(fields, { add, remove }) => (
            <>
              {fields.length > 0 && (
                <Form.Item style={{ margin: 0 }}>
                  <Divider orientation="left">{t('form.rewardByCountry.title')}</Divider>
                </Form.Item>
              )}
              {fields.map((field) => (
                <div key={field.key} className={css.specialFormListItem}>
                  <Form.Item
                    label={<h3>{`${t('form.rewardByCountry.country')}:`}</h3>}
                    name={[field.name, 'country']}
                    rules={[{ required: true, message: `${t('form.rewardByCountry.countryMessage')}!` }]}
                  >
                    <Select>
                      {countriesData.map((countryCode) => (
                        <Option key={countryCode} value={countryCode}>
                          {countryCode}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={<h3>{`${t('form.rewardByCountry.price')}:`}</h3>}
                    name={[field.name, 'price']}
                    rules={[{ required: true, message: `${t('form.rewardByCountry.priceMessage')}!` }]}
                  >
                    <InputNumber min={0.1} step={0.1} className={css.inputNumber} />
                  </Form.Item>
                  <Form.Item label=" " className="remove-button-form-item">
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Form.Item>
                </div>
              ))}

              <Form.Item>
                <Button type="link" onClick={() => add()} icon={<PlusOutlined />}>
                  {t('form.rewardByCountry.addButton')}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Divider orientation="left">Android</Divider>

        <Form.Item
          label={<h3>{`${t('form.baseReward')}:`}</h3>}
          name="androidBaseReward"
          rules={[{ required: true, message: `${t('form.baseRewardMessage')}!` }]}
        >
          <Input />
        </Form.Item>

        <Form.List name="androidRewardByCountry">
          {(fields, { add, remove }) => (
            <>
              {fields.length > 0 && (
                <Form.Item style={{ margin: 0 }}>
                  <Divider orientation="left">{t('form.rewardByCountry.title')}</Divider>
                </Form.Item>
              )}
              {fields.map((field) => (
                <div key={field.key} className={css.specialFormListItem}>
                  <Form.Item
                    label={<h3>{`${t('form.rewardByCountry.country')}:`}</h3>}
                    name={[field.name, 'country']}
                    rules={[{ required: true, message: `${t('form.rewardByCountry.countryMessage')}!` }]}
                  >
                    <Select>
                      {countriesData.map((countryCode) => (
                        <Option key={countryCode} value={countryCode}>
                          {countryCode}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={<h3>{`${t('form.rewardByCountry.price')}:`}</h3>}
                    name={[field.name, 'price']}
                    rules={[{ required: true, message: `${t('form.rewardByCountry.priceMessage')}!` }]}
                  >
                    <InputNumber min={0.1} step={0.1} className={css.inputNumber} />
                  </Form.Item>
                  <Form.Item label=" " className="remove-button-form-item">
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Form.Item>
                </div>
              ))}

              <Form.Item>
                <Button type="link" onClick={() => add()} icon={<PlusOutlined />}>
                  {t('form.rewardByCountry.addButton')}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item className={css.submitButtonFormItem}>
          <Button type="primary" htmlType="submit" size="large">
            {mode === 'create' ? t('createOffer') : t('updateOffer')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OfferForm;
