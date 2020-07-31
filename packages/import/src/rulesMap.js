/* eslint-disable @typescript-eslint/no-var-requires */
const { isFirstCharUpcase, isThemeExport, isi18n } = require('./utils');

/**
 * muya-ui 的规则，i18n 资源包含 _，由 Locale/resource 目录导出
 */
const defaultRule = name => {
  if (isi18n(name)) {
    return ['Locale', 'resource', name].join('/');
  } else {
    return name;
  }
};

/**
 * muya-core 的规则，use 开头的由 hooks 目录导出，其余的由 utils 目录导出
 */
const coreRule = name => {
  if (name.startsWith('use')) {
    return ['hooks', name].join('/');
  } else {
    return ['utils', name].join('/');
  }
};

/**
 * muya-theme
 * - Icon 结尾的由 icons 目录导出
 * - Utils 结尾的由 utils 目录导出
 * - 首字母大写的为组件，由 components 目录导出
 * - theme 目录导出的为 createXXXTheme、muyaThemeXXX、
 */
const themeRule = name => {
  if (name.endsWith('Icon')) {
    return ['icons', name].join('/');
  } else if (name.endsWith('Utils')) {
    return 'utils';
  } else if (isFirstCharUpcase(name)) {
    return ['components', name].join('/');
  } else if (isThemeExport(name)) {
    return 'theme';
  } else {
    return name;
  }
};

/**
 * 每个包默认的导出规则
 */
module.exports = {
  '@muya-ui/utils': coreRule,
  '@muya-ui/theme-light': themeRule,
  '@muya-ui/theme-dark': themeRule,
  '@muya-ui/core': defaultRule,
};
