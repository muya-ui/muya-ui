import React from 'react';
import styled from 'styled-components';

import { FoldIcon } from '@muya-ui/theme-light';
import { Dropdown, InlineButton, Menu, MenuDivider, MenuItem } from '@muya-ui/core';

const menu = (
  <Menu>
    <MenuItem key="0">1st menu item</MenuItem>
    <MenuItem key="1">2nd menu item</MenuItem>
    <MenuDivider key="2" />
    <MenuItem key="3">3rd menu item</MenuItem>
  </Menu>
);

const ExpandIcon = styled(FoldIcon)`
  width: 8px;
  height: 8px;
  margin-left: 4px;
`;

export default function TriggerDemo() {
  return (
    <Dropdown overlay={menu} triggerAction="click">
      <InlineButton type="primary">
        Click me
        <ExpandIcon />
      </InlineButton>
    </Dropdown>
  );
}

export const meta = {
  title: '触发方式',
  desc: '默认是移入触发菜单，可以点击触发。',
};
