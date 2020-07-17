import React from 'react';
import styled from 'styled-components';

import { FileIcon } from '@muya-ui/theme-light';
import { Link, Menu, MenuItem, SubMenu, useTheme } from '@muya-ui/core';

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background: ${props => props.theme.colors.spec.neutral9.normal};
`;

export default function InlineDemo() {
  const theme = useTheme();
  return (
    <MenuContainer theme={theme}>
      <Menu
        width={184}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        subMenuIcon={<FileIcon />}
      >
        <SubMenu key="sub1" title={<span>导航一</span>}>
          <MenuItem key="1">Item 1</MenuItem>
          <MenuItem key="2">Item 2</MenuItem>
          <MenuItem key="3">Item 3</MenuItem>
          <MenuItem key="4" disabled={true}>
            Item 4
          </MenuItem>
        </SubMenu>
        <SubMenu key="sub2" title={<span>导航二</span>}>
          <MenuItem key="5">Item 5</MenuItem>
          <MenuItem key="6">Item 6</MenuItem>
          <SubMenu key="sub3" title="二级导航">
            <MenuItem key="7">Item 7</MenuItem>
            <MenuItem key="8">Item 8</MenuItem>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" title={<span>导航三</span>}>
          <MenuItem key="9">Item 9</MenuItem>
          <MenuItem key="10">Item 10</MenuItem>
          <MenuItem key="11">Item 11</MenuItem>
          <MenuItem key="12">
            <Link href="http://www.kujiale.com" target="_blank">
              Item 12
            </Link>
          </MenuItem>
        </SubMenu>
      </Menu>
    </MenuContainer>
  );
}

export const meta = {
  title: '内嵌菜单',
  desc: '垂直菜单，子菜单内嵌在菜单区域。',
};
