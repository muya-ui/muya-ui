import React from 'react';

import { useTheme } from '@muya-ui/core';
import { PatternDemo } from './styled';

export default function TextColorPatternDemo() {
  const { colors } = useTheme();
  const items = [
    {
      tokenKey: 'theme.colors.pattern.text.title',
      color: colors.pattern.text.title,
      title: '标题',
    },
    {
      tokenKey: 'theme.colors.pattern.text.text',
      color: colors.pattern.text.text,
      title: '正文',
    },
    {
      tokenKey: 'theme.colors.pattern.text.assistant',
      color: colors.pattern.text.assistant,
      title: '辅助文案',
    },
    {
      tokenKey: 'theme.colors.pattern.text.secondary',
      color: colors.pattern.text.secondary,
      title: '次要',
    },
    {
      tokenKey: 'theme.colors.pattern.text.darktip',
      color: colors.pattern.text.darktip,
      title: '暗提示',
    },
    {
      tokenKey: 'theme.colors.pattern.text.placeholder',
      color: colors.pattern.text.placeholder,
      title: '占位文案',
    },
    {
      tokenKey: 'theme.colors.pattern.text.disabled',
      color: colors.pattern.text.disabled,
      title: '禁用文案',
    },
    {
      tokenKey: 'theme.colors.pattern.text.inverse',
      color: colors.pattern.text.inverse,
      title: '彩底文案',
      textInverse: false,
    },
    {
      tokenKey: 'theme.colors.pattern.text.highlight',
      color: colors.pattern.text.highlight,
      title: '高亮文案',
    },
    {
      tokenKey: 'theme.colors.pattern.text.highlightHover',
      color: colors.pattern.text.highlightHover,
      title: '高亮 Hover',
    },
    {
      tokenKey: 'theme.colors.pattern.text.highlightClick',
      color: colors.pattern.text.highlightClick,
      title: '高亮点击',
    },
  ];
  return <PatternDemo patternItems={items} />;
}
