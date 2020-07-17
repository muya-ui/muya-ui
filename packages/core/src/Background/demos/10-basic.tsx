import React from 'react';
import styled from 'styled-components';

import { Background, useTheme } from '@muya-ui/core';

const Container = styled.div`
  padding: 10px;
  background: ${props => props.theme.colors.spec.neutral9.normal};

  & > * {
    margin-bottom: 10px;
    padding: 4px 10px;
  }
`;

export default function BasicDemo() {
  const theme = useTheme();
  return (
    <Container theme={theme}>
      <Background type="global">背景模式：global</Background>
      <Background type="higher">背景模式：higher</Background>
      <Background type="block">背景模式：block</Background>
      <Background type="selectedBlock">背景模式：selectedBlock</Background>
      <Background type="disabled">背景模式：disabled</Background>
      <Background type="divider">背景模式：divider</Background>
      <Background type="mask" color="#FFF">
        背景模式：mask
      </Background>
    </Container>
  );
}

export const meta = {
  title: '基础用法',
  desc: '根据背景的模式来选择使用什么样的背景色',
};
