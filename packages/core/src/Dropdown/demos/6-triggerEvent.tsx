import React from 'react';
import styled from 'styled-components';

import { FoldIcon } from '@muya-ui/theme-light';
import { Dropdown, IMenuSelectInfo, InlineButton, Menu, MenuItem, toast } from '@muya-ui/core';

const onClick = (info: IMenuSelectInfo) => {
  toast.info(`Click on item ${info.key}`);
};

const menu = (
  <Menu onClick={onClick}>
    <MenuItem key="1">1st menu item</MenuItem>
    <MenuItem key="2">2nd memu item</MenuItem>
    <MenuItem key="3">3rd menu item</MenuItem>
  </Menu>
);

const ExpandIcon = styled(FoldIcon)`
  width: 8px;
  height: 8px;
  margin-left: 4px;
`;

export default function TriggerEventDemo() {
  return (
    <Dropdown overlay={menu}>
      <InlineButton type="primary">
        Hover me, Click menu item
        <ExpandIcon />
      </InlineButton>
    </Dropdown>
  );
}

export const meta = {
  title: '触发事件',
  desc: '点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。',
};
