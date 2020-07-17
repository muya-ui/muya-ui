/**
 * 阿拉伯语
 * 文案资源维护在 http://pub.k8s-new.qunhequnhe.com/lang#/public/detail/59
 * 不要直接修改 ./i18n/* 文件
 */
import 'dayjs/locale/ar';

import resource from './i18n/ar_EG';

export const ar_EG = {
  locale: 'ar_EG',
  dayjsLocaleKey: 'ar',
  'Calendar.headOrder': 'year',
  ...resource,
};

export default ar_EG;
