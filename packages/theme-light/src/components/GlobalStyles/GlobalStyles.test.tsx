import { mount } from 'enzyme';
import React from 'react';
import { expectCSSContains, expectCSSMatches, stripWhitespace } from 'test/utils/style';

import { createTheme } from '../../theme';
import { typographySpec } from '../../tokens/typography';
import GlobalStyles from './GlobalStyles';

test('测试 normakize: false', () => {
  mount(<GlobalStyles normalize={false} />);
  expectCSSMatches(`
    html{
      font-family:${stripWhitespace(typographySpec.global.fontFamily)};
      font-size:${typographySpec.global.fontSize}px;
      line-height:${typographySpec.global.lineHeight};
    }`);
});

test('测试非默认主题全局样式', () => {
  const htmlFontSize = 14;
  const htmlLineHeight = 1;
  const fontFamily = stripWhitespace(
    '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  );
  const theme = createTheme({
    typography: {
      spec: {
        ...typographySpec,
        global: {
          fontSize: htmlFontSize,
          lineHeight: htmlLineHeight,
          fontFamily,
        },
      },
    },
  });
  mount(<GlobalStyles theme={theme} normalize={false} />);
  expectCSSMatches(`
    html{
      font-family:${fontFamily};
      font-size:${htmlFontSize}px;
      line-height:${htmlLineHeight};
    }
  `);
});

test('测试 normakize: true', () => {
  mount(<GlobalStyles />);
  expectCSSContains('button');
});

test('测试 resetScrollBar: true', () => {
  mount(<GlobalStyles resetScrollBar={true} />);
  expectCSSContains('body::-webkit-scrollbar');
});
