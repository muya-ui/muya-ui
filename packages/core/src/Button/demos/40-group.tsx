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
        <ButtonGroup type="primary">
          <Button>xl</Button>
          <Button>l</Button>
          <Button>m</Button>
          <Button>s</Button>
        </ButtonGroup>
      </GroupContainer>
      <GroupContainer>
        <ButtonGroup type="primary" plain>
          <Button>xl</Button>
          <Button>l</Button>
          <Button>m</Button>
          <Button>s</Button>
        </ButtonGroup>
      </GroupContainer>
    </>
  );
}

export const meta = {
  title: '按钮组',
  desc: '组合使用按钮，注意 `InlineButton` 、 `MaskButton` 都不支持',
};
