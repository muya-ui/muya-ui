/**
 * 英语
 * 文案资源维护在 http://pub.k8s-new.qunhequnhe.com/lang#/public/detail/59
 * 不要直接修改 ./i18n/* 文件
 */
import 'dayjs/locale/ko';

import resource from './i18n/ko_KR';

export const ko_KR = {
  locale: 'ko_KR',
  dayjsLocaleKey: 'ko',
  'Calendar.headOrder': 'year',
  ...resource,
};

export default ko_KR;
