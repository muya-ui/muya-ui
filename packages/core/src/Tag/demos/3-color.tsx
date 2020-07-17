import React from 'react';

import { Tag, useTheme } from '@muya-ui/core';

export default function ColorDemo() {
  const theme = useTheme();
  return (
    <>
      <Tag bordered={false} color="#F0F3F7" colorInverse={theme.themeName === 'muya-theme-dark'}>
        #F0F3F7
      </Tag>
      <Tag bordered={false} color="#AEB7C2">
        #AEB7C2
      </Tag>
      <Tag bordered={false} color="#1A7AF8">
        #1A7AF8
      </Tag>
      <Tag bordered={false} color="#FF2B00">
        #FF2B00
      </Tag>
      <Tag bordered={false} color="#01D540">
        #01D540
      </Tag>
      <Tag bordered={false} color="#FFAB00">
        #FFAB00
      </Tag>
    </>
  );
}

export const meta = {
  title: '多彩标签',
  desc: '可以通过 `color` 属性指定标签的颜色',
};
