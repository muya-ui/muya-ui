import React from 'react';

import { Button, Input, Trigger, Select, Option } from '@muya-ui/core';
import styled from 'styled-components';

const StyledContainer = styled.div`
  height: 500px;
  width: 80%;
  overflow: auto;
`;

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  height: 2000px;
  position: relative;
`;

export default function Simple() {
  const popup = (
    <div
      style={{
        width: '176px',
        // height: '100px',
        padding: '16px',
        borderRadius: '4px',
        background: '#fff',
        boxShadow: 'rgba(56, 60, 66, 0.08) 0px 0px 12px 0px',
      }}
    >
      Dude, What&apos;s your problem, ?
    </div>
  );
  return (
    <StyledContainer>
      <StyledContent>
        <Trigger
          popperProps={{ disablePortal: true }}
          popup={popup}
          triggerActions={['hover']}
          placement="bottom-end"
        >
          <Button style={{ marginRight: '20px' }} type="primary">
            Hover Me
          </Button>
        </Trigger>
        <Trigger popperProps={{ disablePortal: true }} popup={popup} triggerActions={['click']}>
          <Button style={{ marginRight: '20px' }}>Click Me</Button>
        </Trigger>
        <Trigger popperProps={{ disablePortal: true }} popup={popup} triggerActions={['click']}>
          <Input placeholder="focus me please!"></Input>
        </Trigger>
        <Select popperProps={{ disablePortal: true }} allowClear defaultValue="one">
          <Option value="one">选项一</Option>
          <Option value="two">选项二</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="three">选项三</Option>
        </Select>
      </StyledContent>
    </StyledContainer>
  );
}

export const meta = {
  title: '自定义滚动容器',
  desc:
    '`Trigger`可以在自定义滚动容器内使用，请设置滚动容器的position属性，并设置`Trigger.popperProps.disabledPortal`为`true`',
};
