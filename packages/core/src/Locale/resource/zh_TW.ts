/**
 * 繁体中文
 * 文案资源维护在 http://pub.k8s-new.qunhequnhe.com/lang#/public/detail/59
 * 不要直接修改 ./i18n/* 文件
 */
import 'dayjs/locale/zh-tw';

import resource from './i18n/zh_TW';

export const zh_TW = {
  locale: 'zh_TW',
  dayjsLocaleKey: 'zh-tw',
  'Calendar.headOrder': 'year',
  ...resource,
};

export default zh_TW;
