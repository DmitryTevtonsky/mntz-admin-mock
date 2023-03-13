import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import { Languages, LanguagesEnum } from 'types';

import css from './index.module.css';

const languages: Languages = {
  en: 'english',
  ru: 'russian',
};

const LanguageSelect: FC = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      className={css.languageSelect}
      onChange={handleChangeLanguage}
      value={i18n.resolvedLanguage}
      placement="topLeft"
    >
      {Object.keys(languages).map((lng) => (
        <Select.Option className={css.languagesSelectOption} key={lng} value={lng}>
          <img className={css.languageImg} src={`/images/flags/${lng}.png`} alt={`Icon for ${lng} language`} />
          {t(`languages.${languages[lng as LanguagesEnum]}`)}
        </Select.Option>
      ))}
    </Select>
  );
};

export default LanguageSelect;
