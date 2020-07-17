import React from 'react';

import { useTheme } from '@muya-ui/core';
import { PatternDemo } from './styled';

export default function IconColorPatternDemo() {
  const { colors } = useTheme();
  const items = [
    {
      tokenKey: 'theme.colors.pattern.icon.normal',
      color: colors.pattern.icon.normal,
      title: 'icon 常态',
    },
    {
      tokenKey: 'theme.colors.pattern.icon.hover',
      color: colors.pattern.icon.hover,
      title: 'icon Hover',
    },
    {
      tokenKey: 'theme.colors.pattern.icon.click',
      color: colors.pattern.icon.click,
      title: 'icon Click',
    },
    {
      tokenKey: 'theme.colors.pattern.icon.inverse',
      color: colors.pattern.icon.inverse,
      title: '彩底 icon',
      textInverse: false,
    },
  ];
  return <PatternDemo patternItems={items} />;
}
