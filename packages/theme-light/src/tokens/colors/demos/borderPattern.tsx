import React from 'react';

import { useTheme } from '@muya-ui/core';
import { PatternDemo } from './styled';

export default function BackgroundPatternDemo() {
  const { colors } = useTheme();
  const items = [
    {
      tokenKey: 'theme.colors.pattern.border.normal',
      color: colors.pattern.border.normal,
      title: '常态',
      textInverse: false,
    },
    {
      tokenKey: 'theme.colors.pattern.border.hover',
      color: colors.pattern.border.hover,
      title: 'Hover 态',
      textInverse: false,
    },
    {
      tokenKey: 'theme.colors.pattern.border.error',
      color: colors.pattern.border.error,
      title: '错误态',
    },
  ];
  return <PatternDemo patternItems={items} />;
}
