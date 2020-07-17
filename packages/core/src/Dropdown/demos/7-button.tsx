import React from 'react';
import styled from 'styled-components';

import { FoldIcon, UserIcon } from '@muya-ui/theme-light';
import { DropdownButton, IMenuSelectInfo, Menu, MenuItem, toast } from '@muya-ui/core';

function handleMenuClick(info: IMenuSelectInfo) {
  toast.info('Click on menu item.');
  console.log('click', info);
}

const ExpandIcon = styled(FoldIcon)`
  width: 8px;
  height: 8px;
  vertical-align: middle;
`;

const menu = (
  <Menu onClick={handleMenuClick}>
    <MenuItem key="1">
      <UserIcon />
      1st menu item
    </MenuItem>
    <MenuItem key="2">
      <UserIcon />
      2nd menu item
    </MenuItem>
    <MenuItem key="3">
      <UserIcon />
      3rd item
    </MenuItem>
  </Menu>
);

export default function ButtonDemo() {
  return (
    <div className="doc-button-container">
      <DropdownButton overlay={menu}>默认样式</DropdownButton>
      <DropdownButton plain overlay={menu}>
        plain 按钮
      </DropdownButton>
      <DropdownButton overlay={menu} suffixNode={<ExpandIcon />}>
        自定义 suffixNode
      </DropdownButton>
      <DropdownButton overlay={menu} triggerAction="click">
        点击触发
      </DropdownButton>
    </div>
  );
}

export const meta = {
  title: '带下拉框的按钮',
  desc: '`DropdownButton` 接收 `Button` 组件的所有 `props`，通过 `overlay` 指定弹出的菜单。',
};
