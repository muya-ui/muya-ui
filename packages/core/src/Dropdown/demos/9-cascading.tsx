import React from 'react';
import styled from 'styled-components';

import { FoldIcon } from '@muya-ui/theme-light';
import { Dropdown, InlineButton, Menu, MenuItem, SubMenu } from '@muya-ui/core';

const menu = (
  <Menu>
    <MenuItem key="item1">1st menu item</MenuItem>
    <MenuItem key="item2">2nd menu item</MenuItem>
    <SubMenu key="submenu1" title="sub menu">
      <MenuItem key="item3">3rd menu item</MenuItem>
      <MenuItem key="item4">4th menu item</MenuItem>
    </SubMenu>
    <SubMenu key="submenu2" title="disabled sub menu" disabled>
      <MenuItem key="item5">5d menu item</MenuItem>
      <MenuItem key="item6">6th menu item</MenuItem>
    </SubMenu>
  </Menu>
);

const ExpandIcon = styled(FoldIcon)`
  width: 8px;
  height: 8px;
  margin-left: 4px;
`;

export default function CascadingDemo() {
  return (
    <Dropdown overlay={menu}>
      <InlineButton type="primary">
        Cascading menu
        <ExpandIcon />
      </InlineButton>
    </Dropdown>
  );
}

export const meta = {
  title: '多级菜单',
  desc: '传入的菜单里有多个层级。',
};
