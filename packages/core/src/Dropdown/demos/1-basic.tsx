import React from 'react';
import styled from 'styled-components';

import { FoldIcon } from '@muya-ui/theme-light';
import { Dropdown, InlineButton, Menu, MenuItem } from '@muya-ui/core';

const menu = (
  <Menu>
    <MenuItem key="1">1st menu item</MenuItem>
    <MenuItem key="2">2nd menu item</MenuItem>
    <MenuItem key="3">3rd menu item</MenuItem>
  </Menu>
);

const ExpandIcon = styled(FoldIcon)`
  width: 8px;
  height: 8px;
  margin-left: 4px;
`;

export default function BasicDemo() {
  return (
    <Dropdown overlay={menu}>
      <InlineButton type="primary">
        Hover me
        <ExpandIcon />
      </InlineButton>
    </Dropdown>
  );
}

export const meta = {
  title: '基本',
  desc: '最简单的下拉菜单。',
};
