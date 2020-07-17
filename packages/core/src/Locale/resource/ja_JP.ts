/**
 * 日语
 * 文案资源维护在 http://pub.k8s-new.qunhequnhe.com/lang#/public/detail/59
 * 不要直接修改 ./i18n/* 文件
 */
import 'dayjs/locale/ja';

import resource from './i18n/ja_JP';

export const ja_JP = {
  locale: 'ja_JP',
  dayjsLocaleKey: 'ja',
  'Calendar.headOrder': 'year',
  ...resource,
};

export default ja_JP;
