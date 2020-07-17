import React from 'react';
import styled from 'styled-components';

import { FoldIcon } from '@muya-ui/theme-light';
import { Dropdown, InlineButton, Menu, MenuDivider, MenuItem } from '@muya-ui/core';

const menu = (
  <Menu>
    <MenuItem key="0">1st menu item</MenuItem>
    <MenuItem key="1">2nd menu item</MenuItem>
    <MenuDivider key="2" />
    <MenuItem key="3" disabled>
      3rd menu item（disabled）
    </MenuItem>
  </Menu>
);

const ExpandIcon = styled(FoldIcon)`
  width: 8px;
  height: 8px;
  margin-left: 4px;
`;

export default function OtherElementDemo() {
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
  title: '其他元素',
  desc: '分割线和不可用菜单项。',
};
