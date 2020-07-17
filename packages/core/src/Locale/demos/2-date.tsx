import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {
  ar_EG,
  de_DE,
  en_US,
  es_ES,
  fr_FR,
  ja_JP,
  ko_KR,
  zh_CN,
  zh_TW,
  ru_RU,
  vi_VN,
  LocaleProvider,
  IRadioGroupValue,
  RadioGroup,
  Typography,
} from '@muya-ui/core';

const StyledNode = styled.div`
  padding: 10px 0;
`;

type LocaleKey =
  | 'zh_CN'
  | 'en_US'
  | 'ar_EG'
  | 'de_DE'
  | 'es_ES'
  | 'fr_FR'
  | 'ja_JP'
  | 'ru_RU'
  | 'zh_TW'
  | 'ko_KR'
  | 'vi_VN';

const localeDataMap = {
  zh_CN,
  en_US,
  ar_EG,
  de_DE,
  es_ES,
  fr_FR,
  ja_JP,
  ru_RU,
  zh_TW,
  ko_KR,
  vi_VN,
};

const locales = Object.keys(localeDataMap) as LocaleKey[];

function Sub() {
  return (
    <StyledNode>
      <Typography.Title>{dayjs().format('LLLL')}</Typography.Title>
    </StyledNode>
  );
}

export default function BasicDemo() {
  const [locale, setLocale] = useState<LocaleKey>('zh_CN');
  const [localeData, setLocaleData] = useState(localeDataMap.zh_CN);
  const changeLocale = useCallback(
    (checkedValue: IRadioGroupValue) => {
      if (checkedValue && checkedValue !== locale) {
        setLocale(checkedValue as LocaleKey);
        setLocaleData(localeDataMap[checkedValue as LocaleKey]);
      }
    },
    [locale],
  );
  return (
    <>
      <Typography.Title level={5}>选择预览 locale :</Typography.Title>
      <RadioGroup
        value={locale}
        options={locales}
        size="l"
        onChange={changeLocale}
        style={{ padding: '8px 0 12px' }}
      />
      <LocaleProvider locale={localeData}>
        <Sub />
      </LocaleProvider>
    </>
  );
}

export const meta = {
  title: '日期时间',
  desc:
    '日期时间基于 dayjs 实现国际化，需要注意的是已经生成的 dayjs 对象在切换语言时不会更新，语言变化时需要手动更新 dayjs 对象',
};
