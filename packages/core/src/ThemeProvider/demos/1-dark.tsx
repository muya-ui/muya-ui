import React from 'react';

import { muyaThemeDark } from '@muya-ui/theme-dark';
import { Button, ThemeProvider } from '@muya-ui/core';

export default function DarkDemo() {
  return (
    <>
      <Button type="primary">默认主题</Button>
      <ThemeProvider theme={muyaThemeDark}>
        <Button type="primary">暗主题</Button>
      </ThemeProvider>
    </>
  );
}

export const meta = {
  title: '暗主题',
  desc: '暗主题使用',
};
