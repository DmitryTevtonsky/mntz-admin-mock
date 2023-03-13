import { Button, Divider, Form, Select, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import { CreateOfferMediaAssetForm } from 'features/offers/types';
import { Media } from 'features/admin-tasks/media/types';
import { createOfferMediaAsset } from 'features/offers/redux/slice';
import { placementsData } from 'features/offers/data/placements';
import { useAppDispatch } from 'store';

import css from './index.module.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normFile = (e: any) => {
  return e && e.file;
};

interface MediaAssetsFormProps {
  data: Media[];
}
const MediaAssetsForm: FC<MediaAssetsFormProps> = ({ data }: MediaAssetsFormProps) => {
  const dispatch = useAppDispatch();

  const params = useParams();

  const { t: dt } = useTranslation();
  const { t } = useTranslation('offers');

  const [form] = Form.useForm();

  const handleChangeUpload = () => {};

  const handleRemoveUpload = () => {};

  const beforeUpload = () => false;

  const fileList: UploadFile[] = data.map((media) => ({
    uid: `${media.id}`,
    name: `id: ${media.id}, placements: ${Object.keys(media.placements).map((socialNetworkKey) =>
      media.placements[socialNetworkKey].map((place) => `${socialNetworkKey}-${place}`)
    )}`,
    status: 'done',
    url: media.urlSmall,
  }));

  const onFinish = (values: CreateOfferMediaAssetForm) => {
    params.offerId &&
      dispatch(
        createOfferMediaAsset({
          ...values,
          offerId: params.offerId,
          placements: Object.fromEntries(values.placements.map((item) => [item.placement, item.placementType])),
        })
      );
  };

  const handleChange = (val: string, fieldKey: number) => {
    const fieldsValue = form.getFieldsValue();

    const newPlacements = fieldsValue.placements;
    newPlacements[fieldKey] = {
      placement: val,
      placementType: undefined,
    };

    form.setFieldsValue({ ...fieldsValue, placements: newPlacements });
  };

  const fields = [{ name: ['placements'], value: [{ placement: undefined, placementType: undefined }] }];

  return (
    <>
      {fileList.length > 0 && (
        <Upload
          className={css.upload}
          listType="picture"
          fileList={fileList}
          beforeUpload={beforeUpload}
          onRemove={handleRemoveUpload}
          onChange={handleChangeUpload}
        />
      )}
      <div className={css.uploaderLayout}>
        <Divider orientation="left">{t('media.createTitle')}</Divider>
        <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical" fields={fields}>
          <Form.List name="placements">
            {(currFields, { add, remove }) => (
              <>
                {currFields.map((field) => (
                  <div key={field.name} className={css.specialFormListItem}>
                    <Form.Item
                      label={<h3>{t('media.placement')}</h3>}
                      name={[field.name, 'placement']}
                      rules={[{ required: true, message: `${t('media.placementMessage')}!` }]}
                    >
                      <Select onChange={(value: string) => handleChange(value, field.name)}>
                        {Object.keys(placementsData).map((placement) => (
                          <Select.Option key={placement} value={placement}>
                            {placement}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label={<h3>{t('media.placementType')}</h3>}
                      name={[field.name, 'placementType']}
                      rules={[{ required: true, message: `${t('media.placementMessage')}!` }]}
                    >
                      <Select
                        mode="multiple"
                        disabled={!form.getFieldValue(['placements', `${field.name}`, 'placement'])}
                      >
                        {(placementsData[form.getFieldValue(['placements', `${field.name}`, 'placement'])] || []).map(
                          (placement) => (
                            <Select.Option key={placement} value={placement}>
                              {placement}
                            </Select.Option>
                          )
                        )}
                      </Select>
                    </Form.Item>
                    <Form.Item label=" " className="remove-button-form-item">
                      <MinusCircleOutlined
                        onClick={() => remove(field.name)}
                        style={{ visibility: currFields.length === 1 ? 'hidden' : undefined }}
                      />
                    </Form.Item>
                  </div>
                ))}

                <Form.Item>
                  <Button type="link" onClick={() => add()} icon={<PlusOutlined />}>
                    {t('media.addPlacement')}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item
            name="file"
            rules={[{ required: true, message: `${t('media.fileMessage')}!` }]}
            valuePropName="file"
            getValueFromEvent={normFile}
          >
            <Upload maxCount={1} beforeUpload={beforeUpload} listType="picture">
              <Button icon={<UploadOutlined />}> {dt('upload')}</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {dt('create')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default MediaAssetsForm;
