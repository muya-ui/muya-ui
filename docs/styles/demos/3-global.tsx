import React from 'react';
import styled from 'styled-components';

import { muyaThemeDark } from '@muya-ui/theme-dark';
import { AddIcon, muyaThemeLight } from '@muya-ui/theme-light';
import { Button, ThemeProvider } from '@muya-ui/core';

const Container = styled.div`
  background-color: rgba(26, 122, 248, 0.8);
  padding: 10px;

  .muya-button-suffix {
    color: white;
  }
  .muya-dark-button-suffix {
    color: #333;
  }
`;

export default function BasicDemo() {
  // 在图片的量比较少的情况，可以直接把 lazy 设置为 off，关掉懒加载
  return (
    <Container>
      <ThemeProvider theme={muyaThemeLight}>
        <Button suffixNode={<AddIcon />}>亮主题</Button>
      </ThemeProvider>
      <ThemeProvider theme={muyaThemeDark}>
        <Button suffixNode={<AddIcon />}>暗主题</Button>
      </ThemeProvider>
    </Container>
  );
}

export const meta = {
  title: '使用默认 class',
  desc: '使用 muya 提供的默认的 class，注意：不同主题下这些 class 是不同的',
};
