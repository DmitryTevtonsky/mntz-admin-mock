import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import { ErrorInfo } from 'types';

import css from './index.module.css';

interface ErrorHolderProps {
  error: ErrorInfo;
  retryRequest?: () => void;
}

const ErrorHolder: FC<ErrorHolderProps> = ({ error, retryRequest }: ErrorHolderProps) => {
  const { t } = useTranslation();
  return (
    <div className={css.errorHolder}>
      <Result
        className={css.result}
        status="warning"
        title={`${t('errors.error-holder-title')}!`}
        subTitle={`${t('errors.requested-url')}: "${error.requestUrl}". ${t('errors.status')}: "${
          error.status || 'n/a'
        }".`}
        extra={
          <>
            {retryRequest && (
              <Button key="retry" type="primary" onClick={retryRequest}>
                {t('retry')}
              </Button>
            )}
          </>
        }
      />
    </div>
  );
};

export default ErrorHolder;
