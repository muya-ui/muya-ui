import React from 'react';
import styled from 'styled-components';

import { IComponentSizeSpec } from '@muya-ui/theme-light';
import { Button, ButtonGroup, Tab, Tabs } from '@muya-ui/core';

const Container = styled.div`
  .size-tabs {
    margin-bottom: 10px;
  }
  .tabs-container {
    display: flex;
    .row {
      flex: 1;
    }
  }
`;

export default function DrawerDemo() {
  const [size, setSize] = React.useState<IComponentSizeSpec>('m');
  return (
    <Container>
      <ButtonGroup className="size-tabs" plain={true}>
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
      <div className="tabs-container">
        <Tabs className="row" size={size}>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </Tabs>
        <Tabs className="row" type="card" size={size}>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </Tabs>
      </div>
    </Container>
  );
}

export const meta = {
  title: '不同尺寸',
  desc: 'Tabs 的尺寸跟 Button 相同',
};
