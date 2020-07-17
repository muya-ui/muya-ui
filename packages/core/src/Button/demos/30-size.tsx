import React from 'react';
import styled from 'styled-components';

import { IComponentSizeSpec } from '@muya-ui/theme-light';
import { Button, ButtonGroup, InlineButton, MaskButton } from '@muya-ui/core';

const Row = styled.div`
  margin-bottom: 10px;
`;

export default function SizeDemo() {
  const [size, setSize] = React.useState<IComponentSizeSpec>('m');
  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <ButtonGroup plain={true}>
          <Button selected={size === 'xl'} onClick={() => setSize('xl')}>
            xl
          </Button>
          <Button selected={size === 'l'} onClick={() => setSize('l')}>
            l
          </Button>
          <Button selected={size === 'm'} onClick={() => setSize('m')}>
            m
          </Button>
          <Button selected={size === 's'} onClick={() => setSize('s')}>
            s
          </Button>
        </ButtonGroup>
      </div>
      <Row>
        <Button size={size}>size[{size}]</Button>
      </Row>
      <Row>
        <InlineButton size={size}>size[{size}]</InlineButton>
      </Row>
      <Row>
        <MaskButton size={size}>size[{size}]</MaskButton>
      </Row>
    </div>
  );
}

export const meta = {
  title: '按钮尺寸',
  desc: '按钮尺寸，可以是 xl 、l 、m 、s 。',
};
