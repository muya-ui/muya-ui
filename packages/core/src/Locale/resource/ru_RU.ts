/**
 * 俄语
 * 文案资源维护在 http://pub.k8s-new.qunhequnhe.com/lang#/public/detail/59
 * 不要直接修改 ./i18n/* 文件
 */
import 'dayjs/locale/ru';

import resource from './i18n/ru_RU';

export const ru_RU = {
  locale: 'ru_RU',
  dayjsLocaleKey: 'ru',
  'Calendar.headOrder': 'month',
  ...resource,
};

export default ru_RU;
