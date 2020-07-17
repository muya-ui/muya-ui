/**
 * 英语
 * 文案资源维护在 http://pub.k8s-new.qunhequnhe.com/lang#/public/detail/59
 * 不要直接修改 ./i18n/* 文件
 */
import 'dayjs/locale/en';

import resource from './i18n/en_US';

export const en_US = {
  locale: 'en_US',
  dayjsLocaleKey: 'en',
  'Calendar.headOrder': 'month',
  ...resource,
};

export default en_US;
