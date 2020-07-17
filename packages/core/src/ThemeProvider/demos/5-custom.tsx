import React from 'react';

import { createTheme, IThemeWithoutComponents } from '@muya-ui/theme-light';
import { Button, ThemeProvider } from '@muya-ui/core';

export default function CustomDemo() {
  const myTheme = createTheme((t: IThemeWithoutComponents) => ({
    Button: {
      typeBgImage: {
        primary: t.colors.spec.gradient,
      },
    },
  }));
  return (
    <>
      <Button type="primary">默认主题</Button>
      <ThemeProvider theme={myTheme}>
        <Button type="primary">自定义主题</Button>
      </ThemeProvider>
    </>
  );
}

export const meta = {
  title: '自定义主题',
  desc: '自定义主题使用',
};
