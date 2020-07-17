import React from 'react';
import styled from 'styled-components';

import { FileIcon } from '@muya-ui/theme-light';
import { Link, Menu, MenuItem, MenuItemGroup, SubMenu, useTheme } from '@muya-ui/core';

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  ${props => `background: ${props.theme.colors.pattern.background.global}`};
`;

export default function HorizontalDemo() {
  const theme = useTheme();
  return (
    <MenuContainer theme={theme}>
      <Menu triggerSubMenuAction="click" defaultSelectedKeys={[]} mode="horizontal">
        <MenuItem key="mail">
          <FileIcon />
          Navigation One
        </MenuItem>
        <MenuItem key="app" disabled>
          <FileIcon />
          Navigation Two
        </MenuItem>
        <SubMenu
          key="submenu"
          title={
            <span className="submenu-title-wrapper">
              <FileIcon />
              Navigation Three - Submenu
            </span>
          }
        >
          <MenuItemGroup key="group1" title="Item 1">
            <MenuItem key="setting:1">Option 1</MenuItem>
            <MenuItem key="setting:2">Option 2</MenuItem>
          </MenuItemGroup>
          <MenuItemGroup key="group2" title="Item 2">
            <MenuItem key="setting:3">Option 3</MenuItem>
            <MenuItem key="setting:4">Option 4</MenuItem>
          </MenuItemGroup>
        </SubMenu>
        <MenuItem key="alipay">
          <Link href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </Link>
        </MenuItem>
      </Menu>
    </MenuContainer>
  );
}

export const meta = {
  title: '水平菜单',
  desc: '水平的顶部导航菜单。',
};
