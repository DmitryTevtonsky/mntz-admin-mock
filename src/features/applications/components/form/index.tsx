import { Button, Form, Input, Select, Upload, message } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useMemo, useState } from 'react';

import { ApplicationInfo, DeveloperForSelect } from '../../types';
import { categoriesData } from '../../data/categories';
import { createApplication, fetchDevelopersForSelect, updateApplication } from '../../redux/slice';

import { fold } from 'libs/remote';
import { selectDevelopersForSelect } from 'features/applications/redux/selectors';
import { trimObjectValues } from 'libs/utils';
import { useAppDispatch, useAppSelector } from 'store';

import css from './index.module.css';

const { Option } = Select;

const normFile = (e: UploadChangeParam) => e && e.file;

const isJpgOrPng = (file: UploadFile) => file.type === 'image/jpeg' || file.type === 'image/png';
const isLargerThen2MB = (file: UploadFile) => file.size && file.size / 1024 / 1024 < 2;

const beforeUpload = (file: UploadFile) => {
  if (!isJpgOrPng(file)) {
    message.error('You can only upload JPG/PNG file!');
  }
  if (!isLargerThen2MB(file)) {
    message.error('Image must smaller than 2MB!');
  }
  return false;
};

const developerSelectFolder = fold<DeveloperForSelect[]>(
  (data) => (
    <Select>
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

interface ApplicationFormProps {
  mode: 'create' | 'update';
  data?: ApplicationInfo;
}

const ApplicationForm: FC<ApplicationFormProps> = ({ mode = 'update', data }: ApplicationFormProps) => {
  const { t } = useTranslation('applications');
  const dispatch = useAppDispatch();
  const params = useParams();
  const developersForSelect = useAppSelector(selectDevelopersForSelect);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchDevelopersForSelect());
  }, [dispatch]);

  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>(
    data ? [{ uid: data.iconUrl, name: data.iconUrl, url: data.iconUrl }] : []
  );

  const fields = useMemo(() => {
    return data
      ? [
        { name: ['appName'], value: data.appName },
        { name: ['appCategory'], value: data.appCategory },
        { name: ['iconFile'], value: data.iconFile || data.iconUrl },
        { name: ['iconUrl'], value: data.iconUrl },
        { name: ['developerId'], value: data.developerId },
        { name: ['appStoreLink'], value: data.appStoreLink },
        { name: ['googlePlayLink'], value: data.googlePlayLink },
        { name: ['oneLinkSubdomain'], value: data.oneLinkSubdomain },
        { name: ['oneLinkTemplateId'], value: data.oneLinkTemplateId },
      ]
      : undefined;
  }, [data]);

  const onFinish = (values: ApplicationInfo) => {
    const trimmedValues = trimObjectValues<ApplicationInfo>(values);

    mode === 'create'
      ? dispatch(createApplication(trimmedValues))
      : dispatch(updateApplication({ id: params.appId, ...trimmedValues }));
  };

  const handleChangeUpload = ({ fileList }: UploadChangeParam) => {
    if (!fileList.length) {
      form.setFieldsValue({
        iconFile: undefined,
        iconUrl: undefined,
      });
      return setUploadFileList([]);
    }

    form.setFieldsValue({
      iconUrl: undefined,
    });

    const [file] = fileList;
    if (!isJpgOrPng(file) || !isLargerThen2MB(file)) return;
    setUploadFileList(fileList);
  };

  return (
    <div className={css.formLayout}>
      <Form
        form={form}
        className={css.form}
        name={`developer-${mode}`}
        onFinish={onFinish}
        fields={fields || undefined}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label={<h3>{t('form.appName')}:</h3>}
          name="appName"
          rules={[{ required: true, message: `${t('form.appNameMessage')}!` }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<h3>{t('form.appCategory')}:</h3>}
          name="appCategory"
          rules={[{ required: true, message: `${t('form.appCategoryMessage')}!` }]}
        >
          <Select allowClear>
            {categoriesData.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="iconUrl" noStyle>
          <></>
        </Form.Item>

        <Form.Item
          label={<h3>{t('form.iconFile')}:</h3>}
          name="iconFile"
          valuePropName="file"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: `${t('form.iconFileMessage')}!` }]}
        >
          <Upload
            beforeUpload={beforeUpload}
            onChange={handleChangeUpload}
            maxCount={1}
            listType="picture-card"
            fileList={uploadFileList}
          >
            <UploadOutlined />
          </Upload>
        </Form.Item>

        <Form.Item
          label={<h3>{t('form.developer')}:</h3>}
          name="developerId"
          rules={[{ required: true, message: `${t('form.developerMessage')}!` }]}
        >
          {developerSelectFolder(developersForSelect)}
        </Form.Item>

        <Form.Item
          label={<h3>{t('form.appStoreLink')}:</h3>}
          name="appStoreLink"
          rules={[
            { required: true, message: `${t('form.appStoreLinkMessage')}!` },
            {
              message: `${t('form.linkNotValidMessage')}: https://apps.apple.com/app/apple-store/id...`,
              pattern: new RegExp(/(https:\/\/)(apps.apple.com\/app\/apple-store\/id[0-9]{1,10}\b)/),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<h3>{t('form.googlePlayLink')}:</h3>}
          name="googlePlayLink"
          rules={[
            {
              message: `${t('form.linkNotValidMessage')}: https://play.google.com/store/apps/details?id=...`,
              pattern: new RegExp(/(https:\/\/)(play.google.com\/store\/apps\/details[?]id=[-a-zA-Z0-9@:%_.~#?&//=])/),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<h3>{t('form.oneLinkSubdomain')}:</h3>}
          name="oneLinkSubdomain"
          rules={[{ required: true, message: `${t('form.oneLinkSubdomainMessage')}!` }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<h3>{t('form.oneLinkTemplateId')}:</h3>}
          name="oneLinkTemplateId"
          rules={[{ required: true, message: `${t('form.oneLinkTemplateIdMessage')}!` }]}
        >
          <Input />
        </Form.Item>

        <Form.Item className={css.submitButtonFormItem}>
          <Button type="primary" htmlType="submit" size="large" shape="round">
            {mode === 'create' ? t('createApplication') : t('updateApplication')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ApplicationForm;
