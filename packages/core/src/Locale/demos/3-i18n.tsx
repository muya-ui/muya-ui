import React, { useState, useEffect, useCallback } from 'react';
import {
  en_US,
  fr_FR,
  zh_CN,
  ja_JP,
  Button,
  LocaleProvider,
  IRadioGroupValue,
  RadioGroup,
  Typography,
  Row,
  Col,
  Result,
} from '@muya-ui/core';
import i18nTranslate, { ENUM } from '@qunhe/i18n-translate';
import Cookies from 'js-cookie';

declare global {
  interface Window {
    __PUB_LANG__: any;
  }
}

/**
 * 语言包数据来源：
 * 1. pub 注入 njk 模板的 window.__PUB_LANG__，此处为 mock 数据；
 * 2. 仓库自己维护语言数据，挂载到 window.AAA 上，i18n-translate 的 resourceNamespace 需要设置为 AAA
 */
window.__PUB_LANG__ = {
  test: {
    zh_CN: {
      title: '我的方案',
      btn: '新建方案',
    },
    en_US: {
      title: 'My Projects',
      btn: 'New Project',
    },
    fr_FR: {
      title: 'Mes projets',
      btn: 'Nouveau projet',
    },
    ja_JP: {
      title: 'マイプロジェクト',
      btn: '新規作成',
    },
  },
};

/* 这部分可以单独一个文件 */
const defaultLocale = 'zh_CN'; // 默认语言
const storageKey = 'qh-cm-fe-locale'; // 存储到 cookie 的 key

function getQueryString(name: string) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

function validateLocale(locale: string | null) {
  return locales.indexOf(locale as LocaleKey) > -1;
}

function getQueryLocale() {
  const locale = getQueryString('locale');
  if (validateLocale(locale)) {
    return locale as LocaleKey;
  }
}

function getStorageLocale() {
  try {
    return Cookies.get(storageKey) as LocaleKey;
  } catch (e) {}
}

// 语言默认按序从 query、cookie 进行解析，业务根据情况可以调整策略
function getCurrentLocale(): LocaleKey {
  return getQueryLocale() || getStorageLocale() || defaultLocale;
}

function setCurrentLocale(locale: LocaleKey) {
  try {
    Cookies.set(storageKey, locale, { expires: 365 * 10 });
  } catch (e) {
    console.error('浏览器可能处于隐身模式或已经损坏！');
  }
}

function t(key: string, opt?: Object) {
  return i18nTranslate.translate(key, opt);
}
/* 这部分可以单独一个文件 */

type LocaleKey = 'zh_CN' | 'en_US' | 'fr_FR' | 'ja_JP';

const localeDataMap = {
  zh_CN: zh_CN,
  en_US: en_US,
  fr_FR: fr_FR,
  ja_JP: ja_JP,
};

const locales = Object.keys(localeDataMap) as LocaleKey[];

export default function I18nDemo() {
  const [localeLoaded, setLocaleLoaded] = useState(false);
  const [locale, setLocale] = useState<LocaleKey>(getCurrentLocale());
  const [localeData, setLocaleData] = useState(localeDataMap.zh_CN);
  const changeLocale = useCallback(
    async (checkedValue: IRadioGroupValue) => {
      if (checkedValue && checkedValue !== locale) {
        await i18nTranslate.changeLanguage(checkedValue as LocaleKey);
        setLocale(checkedValue as LocaleKey);
        setLocaleData(localeDataMap[checkedValue as LocaleKey]);
        setCurrentLocale(checkedValue as LocaleKey);
        // 此处也可以选择刷新页面
      }
    },
    [locale],
  );
  useEffect(() => {
    i18nTranslate
      .init({
        packages: ['test'],
        lang: locale,
        resourceType: ENUM.ResourceType.WINDOW,
      })
      .then(() => {
        setLocaleLoaded(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (localeLoaded) {
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
          <Row
            justify="space-between"
            gutter={10}
            style={{ paddingBottom: 16, borderBottom: '1px solid #ddd' }}
          >
            <Col>
              <Typography.Title>{t('title')}</Typography.Title>
            </Col>
            <Col>
              <Button type="primary">{t('btn')}</Button>
            </Col>
          </Row>
          <Row justify="center" style={{ marginTop: 20 }}>
            <Result type="empty" />
          </Row>
        </LocaleProvider>
      </>
    );
  } else {
    return null;
  }
}

export const meta = {
  title: '结合 i18n-translate',
  desc: 'Muya 以外的组件，实现国际化目前主要使用多语言中台提供的 i18n-translate。',
};
