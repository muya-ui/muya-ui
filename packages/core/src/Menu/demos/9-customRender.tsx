import React, { useCallback } from 'react';
import styled from 'styled-components';

import { FileIcon, SelectIcon } from '@muya-ui/theme-light';
import { IRenderMenuItemProps, Menu, MenuItem, SubMenu, useTheme } from '@muya-ui/core';

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background: ${props => props.theme.colors.spec.neutral9.normal};
`;

const StyledMenuItemChild = styled.span`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export default function CustomRenderDemo() {
  const theme = useTheme();
  const renderMenuItemChild = useCallback((props: IRenderMenuItemProps) => {
    const { selected, children } = props;
    if (selected) {
      return (
        <StyledMenuItemChild>
          <span>{children}</span>
          <SelectIcon />
        </StyledMenuItemChild>
      );
    } else {
      return children;
    }
  }, []);
  return (
    <MenuContainer theme={theme}>
      <Menu
        width={184}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        subMenuIcon={<FileIcon />}
        renderMenuItemChild={renderMenuItemChild}
      >
        <SubMenu key="sub1" title={<span>导航一</span>}>
          <MenuItem key="1">Item 1</MenuItem>
          <MenuItem key="2">Item 2</MenuItem>
          <MenuItem key="3">Item 3</MenuItem>
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
        </SubMenu>
      </Menu>
    </MenuContainer>
  );
}

export const meta = {
  title: '自定义 MenuItem 渲染',
  desc: '自定义 MenuItem 渲染。',
};
