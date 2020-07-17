import React from 'react';

import { muyaThemeDark } from '@muya-ui/theme-dark';
import { muyaThemeUp } from '@qunhe/muya-theme-up';
import { Button, ThemeProvider } from '@muya-ui/core';

export default function NestedDemo() {
  return (
    <>
      <Button type="primary">默认主题</Button>
      <ThemeProvider theme={muyaThemeDark}>
        <>
          <Button type="primary">暗主题</Button>
          <ThemeProvider theme={muyaThemeUp}>
            <Button type="primary">用户平台主题</Button>
          </ThemeProvider>
        </>
      </ThemeProvider>
    </>
  );
}

export const meta = {
  title: '主题嵌套',
  desc: '当 `ThemeProvider` 发生嵌套时，优先使用离组件层级最近的 `ThemeProvider` 提供的主题数据。',
};
