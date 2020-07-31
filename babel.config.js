/* eslint-disable */
const muyaImport = require('./packages/import/src/index');
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: false,
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/proposal-class-properties', { loose: true }],
    ['@babel/proposal-object-rest-spread', { loose: true }],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-object-assign',
    [
      'babel-plugin-styled-components',
      {
        ssr: false,
        fileName: false,
      },
    ],
    'lodash',
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
            useBuiltIns: false,
          },
        ],
      ],
      plugins: [
        [
          'module-resolver',
          {
            root: ['./'],
            alias: {
              '@muya-ui/utils': './packages/utils/src',
              '@muya-ui/core': './packages/core/src',
              '@muya-ui/theme-light': './packages/theme-light/src',
              '@muya-ui/theme-dark': './packages/theme-dark/src',
              test: './test',
            },
          },
        ],
      ],
    },
    es: {
      plugins: [...muyaImport('es')],
    },
    cjs: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
            useBuiltIns: false,
          },
        ],
      ],
    },
  },
};
