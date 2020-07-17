import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import {
  ar_EG,
  AutoComplete,
  Calendar,
  de_DE,
  en_US,
  es_ES,
  fr_FR,
  IRadioGroupValue,
  ja_JP,
  ko_KR,
  LocaleProvider,
  Option,
  Pagination,
  RadioGroup,
  Result,
  ru_RU,
  Select,
  Table,
  Typography,
  vi_VN,
  zh_CN,
  zh_TW,
  Dialog,
  Button,
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

const columns = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Age',
    key: 'age',
  },
];

function Sub() {
  return (
    <>
      <StyledNode>
        <Select showSearch>
          <Option value="one">One</Option>
        </Select>
      </StyledNode>
      <StyledNode>
        <Button onClick={() => Dialog.success({ title: 'success' })}>Dialog</Button>
      </StyledNode>
      <StyledNode>
        <AutoComplete />
      </StyledNode>
      <StyledNode>
        <AutoComplete />
      </StyledNode>
      <StyledNode>
        <Calendar />
      </StyledNode>
      <StyledNode>
        <Result type="forbidden" />
      </StyledNode>
      <StyledNode>
        <Pagination totalRecords={200} showQuickJumper showPageSizeChanger />
      </StyledNode>
      <StyledNode>
        <Table dataSource={[]} columns={columns} />
      </StyledNode>
    </>
  );
}

export default function BasicDemo() {
  const [locale, setLocale] = useState<LocaleKey>('zh_CN');
  const [localeData, setLocaleData] = useState(localeDataMap.zh_CN);
  const changeLocale = useCallback((checkedValue: IRadioGroupValue) => {
    if (checkedValue) {
      setLocale(checkedValue as LocaleKey);
      setLocaleData(localeDataMap[checkedValue as LocaleKey]);
    }
  }, []);

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
  title: '基础用法',
  desc:
    'Muya 的组件支持上述 Demo 中的 10 种语言，可以如上例子使用 LocaleProvider 实现组件的语言切换。',
};
