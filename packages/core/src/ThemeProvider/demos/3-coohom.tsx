import React from 'react';

import { muyaThemeCoohom } from '@qunhe/muya-theme-coohom';
import { Button, ThemeProvider } from '@muya-ui/core';

export default function CoohomDemo() {
  return (
    <>
      <Button type="primary">默认主题</Button>
      <ThemeProvider theme={muyaThemeCoohom}>
        <Button type="primary">国际站主题</Button>
      </ThemeProvider>
    </>
  );
}

export const meta = {
  title: '国际站主题',
  desc: '国际站主题使用',
};
