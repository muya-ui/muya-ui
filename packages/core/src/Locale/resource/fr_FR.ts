/**
 * 法语
 * 文案资源维护在 http://pub.k8s-new.qunhequnhe.com/lang#/public/detail/59
 * 不要直接修改 ./i18n/* 文件
 */
import 'dayjs/locale/fr';

import resource from './i18n/fr_FR';

export const fr_FR = {
  locale: 'fr_FR',
  dayjsLocaleKey: 'fr',
  'Calendar.headOrder': 'month',
  ...resource,
};

export default fr_FR;
