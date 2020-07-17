/**
 * 越南语
 * 文案资源维护在 http://pub.k8s-new.qunhequnhe.com/lang#/public/detail/59
 * 不要直接修改 ./i18n/* 文件
 */
import 'dayjs/locale/vi';

import resource from './i18n/vi';

export const vi_VN = {
  locale: 'vi_VN',
  dayjsLocaleKey: 'vi',
  'Calendar.headOrder': 'month',
  ...resource,
};

export default vi_VN;
