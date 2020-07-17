import React from 'react';

import { UserIcon } from '@muya-ui/theme-light';
import { DropdownButton, IMenuSelectInfo, Menu, MenuItem, toast } from '@muya-ui/core';

function handleMenuClick(info: IMenuSelectInfo) {
  toast.info('Click on menu item.');
  console.log('click', info);
}

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
      <DropdownButton group overlay={menu}>
        默认样式
      </DropdownButton>
      <DropdownButton group plain overlay={menu}>
        plain 按钮
      </DropdownButton>
      <DropdownButton group overlay={menu} groupIcon={<UserIcon />}>
        自定义 groupIcon
      </DropdownButton>
      <DropdownButton group overlay={menu} disabled>
        禁用按钮
      </DropdownButton>
    </div>
  );
}

export const meta = {
  title: '带下拉框的按钮组',
  desc: '`DropdownButton` 通过 `group` 和 `groupIcon` 来实现按钮组。',
};
