/**
 * 简体中文
 * 文案资源维护在 http://pub.k8s-new.qunhequnhe.com/lang#/public/detail/59
 * 不要直接修改 ./i18n/* 文件
 */
import 'dayjs/locale/zh-cn';

import resource from './i18n/zh_CN';

export const zh_CN = {
  locale: 'zh_CN',
  dayjsLocaleKey: 'zh-cn',
  'Calendar.headOrder': 'year',
  ...resource,
};

export default zh_CN;
