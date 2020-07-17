import React from 'react';

import { useTheme } from '@muya-ui/core';
import { PatternDemo } from './styled';

export default function BackgroundPatternDemo() {
  const { colors } = useTheme();
  const items = [
    {
      tokenKey: 'theme.colors.pattern.background.global',
      color: colors.pattern.background.global,
      title: '全局背景',
      textInverse: false,
      shadow: true,
    },
    {
      tokenKey: 'theme.colors.pattern.background.higher',
      color: colors.pattern.background.higher,
      title: '高层级背景（dialog、popper 等）',
      textInverse: false,
      shadow: true,
    },
    {
      tokenKey: 'theme.colors.pattern.background.block',
      color: colors.pattern.background.block,
      title: '区块背景',
      textInverse: false,
      shadow: true,
    },
    {
      tokenKey: 'theme.colors.pattern.background.selectedBlock',
      color: colors.pattern.background.selectedBlock,
      title: '区块选中背景',
      textInverse: false,
      shadow: true,
    },
    {
      tokenKey: 'theme.colors.pattern.background.disabled',
      color: colors.pattern.background.disabled,
      title: '禁用背景',
      textInverse: false,
      shadow: true,
    },
    {
      tokenKey: 'theme.colors.pattern.background.divider',
      color: colors.pattern.background.divider,
      title: '分割线背景',
      textInverse: false,
      shadow: true,
    },
    {
      tokenKey: 'theme.colors.pattern.background.scrollBar',
      color: colors.pattern.background.scrollBar,
      title: '滚动条背景',
      textInverse: false,
      shadow: true,
    },
    {
      tokenKey: 'theme.colors.pattern.background.scrollBarHover',
      color: colors.pattern.background.scrollBarHover,
      title: '滚动条 Hover',
      textInverse: false,
      shadow: true,
    },
    {
      tokenKey: 'theme.colors.pattern.background.mask',
      color: colors.pattern.background.mask,
      title: '遮罩层背景',
      shadow: true,
      textInverse: false,
    },
  ];
  return <PatternDemo patternItems={items} />;
}
