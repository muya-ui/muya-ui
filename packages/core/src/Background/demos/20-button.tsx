import React from 'react';
import styled from 'styled-components';

import { Background, Button, useTheme } from '@muya-ui/core';

const Container = styled.div`
  padding: 10px;
  background: ${props => props.theme.colors.spec.neutral9.normal};
`;

export default function BasicDemo() {
  const theme = useTheme();
  return (
    <Container theme={theme}>
      <Background component="span" display="inline-block">
        <Button type="primary" plain>
          按钮
        </Button>
      </Background>
    </Container>
  );
}

export const meta = {
  title: '透底',
  desc: '一些透底场景可以使用 `Background` 来包裹',
};
