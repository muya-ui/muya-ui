/* eslint-disable */
import path from 'path';
import webpack from 'webpack';
import { createPlugin } from 'docz-core';
import proxy from 'http-proxy-middleware';
import muyaRemarkPlugin from '@muya-ui/baozheng-remark-plugin';
import muyaRehypePlugin from '@muya-ui/baozheng-rehype-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const isComponentMenu = process.env.MENU_ENV === 'component';
// yarn only 只渲染组件下的 route，如需测试其他 route 请使用 yarn fdev
// 例子：只打包进度条文档使用方式 yarn only --file Progress
// 你还可以搭配 muyaRemarkPlugin 的 needRenderFiles 参数实现只渲染某个 demo
// 例子：mdPlugins: [() => muyaRemarkPlugin({ needRenderFiles: ['**/1-simple.tsx'] })] 只渲染简单的进度条 demo
const menu = isComponentMenu
  ? ['组件']
  : [
      'Muya UI',
      '破坏性改动',
      '更新日志',
      '数据统计',
      '常见问题',
      {
        name: '最佳实践',
        menu: ['样式覆盖', '主题', 'token 使用', 'Form'],
      },
      {
        name: '设计系统',
        menu: ['颜色', '文字', '图标', '尺寸', '阴影', '间距', '不透明度', '层级', '过渡', '断点'],
      },
      '组件',
      'Hooks',
      '工具方法',
    ];

const proxyPlugin = () =>
  createPlugin({
    onPreCreateApp: app => {
      app.use(
        '/api',
        proxy({
          target: 'http://alpha.kujiale.com',
          changeOrigin: true,
          headers: {},
        }),
      );
    },
  });

export default {
  codeSandbox: false,
  typescript: true,
  public: '/public',
  theme: '@qunhe/baozheng-docz-theme',
  ignore: ['./README.md', 'docs/**/*.md', '**/*/README.md'],
  themeConfig: {
    colors: {
      blackLight: '#232529',
      whiteLight: '#CCC',
    },
    logo: {
      light:
        '//qhstaticssl.kujiale.com/newt/23/image/png/1571225467035/708C2EE1345EFE5E03850336A48B5591.png',
      dark:
        '//qhstaticssl.kujiale.com/newt/23/image/png/1571225615286/E9608DA43C6389692DAAE8CD9B80BD2F.png',
      width: 180,
    },
  },
  modifyBundlerConfig: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...{
        '@muya-ui/utils': path.resolve(__dirname, './packages/utils/src'),
        '@muya-ui/theme-light/lib/icons': path.resolve(
          __dirname,
          './packages/theme-light/src/icons',
        ),
        '@muya-ui/theme-light': path.resolve(__dirname, './packages/theme-light/src'),
        '@muya-ui/theme-dark': path.resolve(__dirname, './packages/theme-dark/src'),
        '@muya-ui/core': path.resolve(__dirname, './packages/core/src'),
        'api/': path.resolve(__dirname, './api/'),
      },
    };
    config.plugins.push(
      new webpack.DefinePlugin({
        SC_DISABLE_SPEEDY: true,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
    );
    return config;
  },
  menu,
  propsParser: false,
  mdPlugins: [muyaRemarkPlugin],
  hastPlugins: [() => muyaRehypePlugin({ codeSandbox: true, tocDeep: 3, demoDoubleRow: true })],
  plugins: [proxyPlugin()],
};
