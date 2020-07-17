import React from 'react';

import { muyaThemeUp } from '@qunhe/muya-theme-up';
import { Button, ThemeProvider } from '@muya-ui/core';

export default function UpDemo() {
  return (
    <>
      <Button type="primary">默认主题</Button>
      <ThemeProvider theme={muyaThemeUp}>
        <Button type="primary">用户平台主题</Button>
      </ThemeProvider>
    </>
  );
}

export const meta = {
  title: '用户平台主题',
  desc: '用户平台主题使用',
};
