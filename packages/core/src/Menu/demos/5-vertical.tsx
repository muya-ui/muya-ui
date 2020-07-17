import React from 'react';
import styled from 'styled-components';

import { FileIcon } from '@muya-ui/theme-light';
import { IMenuSelectInfo, Menu, MenuItem, MenuItemGroup, SubMenu, useTheme } from '@muya-ui/core';

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background: ${props => props.theme.colors.spec.neutral9.normal};
`;

function onSelectChange(info: IMenuSelectInfo) {
  console.log('Select: ', info);
}

export default function VerticalDemo() {
  const theme = useTheme();
  return (
    <MenuContainer theme={theme}>
      <Menu
        width={184}
        onSelectChange={onSelectChange}
        subMenuIcon={<FileIcon />}
        triggerSubMenuAction="click"
        mode="vertical"
        forceSubMenuRender
      >
        <SubMenu key="sub1" title={<span>导航一</span>}>
          <MenuItemGroup key="g1" title="Group 1">
            <MenuItem key="1">Item 1</MenuItem>
            <MenuItem key="2">Item 2</MenuItem>
          </MenuItemGroup>
          <MenuItemGroup key="g2" title="Group 2">
            <MenuItem key="3">Item 3</MenuItem>
            <MenuItem key="4">Item 4</MenuItem>
          </MenuItemGroup>
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
          <MenuItem key="12">Item 12</MenuItem>
          <MenuItem key="13">Item 13</MenuItem>
          <MenuItem key="14">Item 14</MenuItem>
          <MenuItem key="15">Item 15</MenuItem>
          <MenuItem key="16">Item 16</MenuItem>
        </SubMenu>
      </Menu>
    </MenuContainer>
  );
}

export const meta = {
  title: '垂直菜单',
  desc:
    '子菜单是弹出的形式。子菜单默认是延迟渲染的，可以通过 `forceSubMenuRender` 取消子菜单的延迟渲染。',
};
