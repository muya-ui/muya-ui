import React from 'react';
import styled from 'styled-components';

import { Button, ButtonGroup } from '@muya-ui/core';

const GroupContainer = styled.div`
  margin: 0 0 12px 0;
`;

export default function GroupDemo() {
  return (
    <>
      <GroupContainer>
        <ButtonGroup plain={false}>
          <Button type="primary">A</Button>
          <Button type="strong">B</Button>
          <Button>C</Button>
          <Button type="secondary">D</Button>
          <Button type="weak">E</Button>
          <Button type="success">F</Button>
          <Button type="danger">G</Button>
        </ButtonGroup>
      </GroupContainer>
      <GroupContainer>
        <ButtonGroup plain>
          <Button type="primary">A</Button>
          <Button type="strong">B</Button>
          <Button>C</Button>
          <Button type="secondary">D</Button>
          <Button type="weak">E</Button>
          <Button type="success">F</Button>
          <Button type="danger">G</Button>
        </ButtonGroup>
      </GroupContainer>
    </>
  );
}

export const meta = {
  title: '按钮组dev',
  desc: '组合使用按钮dev',
};
