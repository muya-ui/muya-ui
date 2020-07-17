import React from 'react';

import { useTheme } from '@muya-ui/core';
import { PatternDemo } from './styled';

export default function FeatureColorPatternDemo() {
  const { colors } = useTheme();
  const items = [
    {
      tokenKey: 'theme.colors.pattern.feature.success',
      color: colors.pattern.feature.success,
      title: '成功',
    },
    {
      tokenKey: 'theme.colors.pattern.feature.info',
      color: colors.pattern.feature.info,
      title: '信息提示',
    },
    {
      tokenKey: 'theme.colors.pattern.feature.warning',
      color: colors.pattern.feature.warning,
      title: '警告',
    },
    {
      tokenKey: 'theme.colors.pattern.feature.error',
      color: colors.pattern.feature.error,
      title: '错误',
    },
    {
      tokenKey: 'theme.colors.pattern.feature.loading',
      color: colors.pattern.feature.loading,
      title: '加载',
    },
  ];
  return <PatternDemo patternItems={items} />;
}
