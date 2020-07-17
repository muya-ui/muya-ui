import React from 'react';

import { DropdownButton, Menu, MenuItem, MenuItemGroup } from '@muya-ui/core';

const menu = (
  <Menu>
    <MenuItem key="1">1st menu item</MenuItem>
    <MenuItem key="2">2nd menu item</MenuItem>
    <MenuItem key="3">3rd menu item</MenuItem>
    <MenuItemGroup key="group1" title="group1">
      <MenuItem key="4">4st menu item</MenuItem>
      <MenuItem key="5">5nd menu item</MenuItem>
    </MenuItemGroup>
  </Menu>
);

export default function SizeDemo() {
  return (
    <div className="doc-button-container">
      <DropdownButton size="s" overlay={menu}>
        Size s
      </DropdownButton>
      <DropdownButton overlay={menu}>Size m</DropdownButton>
      <DropdownButton size="l" overlay={menu}>
        Size l
      </DropdownButton>
      <DropdownButton size="xl" overlay={menu}>
        Size xl
      </DropdownButton>
    </div>
  );
}

export const meta = {
  title: '尺寸',
  desc: '尺寸，可以是 xl 、l 、m 、s 。',
};
