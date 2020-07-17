import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { CalendarIcon, FileIcon, InformIcon, UserIcon } from '@muya-ui/theme-light';
import { Button, Menu, MenuItem, MenuItemGroup, Row, SubMenu, useTheme } from '@muya-ui/core';

const MenuContainer = styled.div`
  padding: 40px;
  background: ${props => props.theme.colors.spec.neutral9.normal};
`;

export default function CollapseDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const handleCollapse = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);
  return (
    <MenuContainer theme={theme}>
      <Row justify="start">
        <Button onClick={handleCollapse} type="primary">
          点击{collapsed ? '展开' : '缩起'}
        </Button>
      </Row>
      <Row justify="start">
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
          mode="inline"
          inlineCollapsed={collapsed}
          width={184}
          triggerSubMenuAction="click"
        >
          <MenuItem key="1" icon={<CalendarIcon />}>
            <span>Item 1</span>
          </MenuItem>
          <MenuItemGroup key="g1" title={<span>分组一</span>}>
            <MenuItem key="2" icon={<UserIcon />}>
              <span>Item 2</span>
            </MenuItem>
            <MenuItem key="3" icon={<InformIcon />}>
              <span>Item 3</span>
            </MenuItem>
          </MenuItemGroup>
          <SubMenu key="sub1" icon={<FileIcon />} title={<span>导航一</span>}>
            <MenuItem key="5">Item 5</MenuItem>
            <MenuItem key="6">Item 6</MenuItem>
            <MenuItem key="7">Item 7</MenuItem>
            <MenuItem key="8">Item 8</MenuItem>
            <SubMenu key="sub2" title="二级菜单" icon={<FileIcon />}>
              <MenuItem key="9">Item 11</MenuItem>
              <MenuItem key="10">Item 12</MenuItem>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub3" icon={<FileIcon />} title={<span>导航二</span>}>
            <MenuItemGroup key="g2" title={<span>分组二</span>}>
              <MenuItem key="11">Item 9</MenuItem>
              <MenuItem key="12">Item 10</MenuItem>
            </MenuItemGroup>
            <SubMenu key="sub4" title="二级菜单" icon={<FileIcon />}>
              <MenuItem key="13">Item 11</MenuItem>
              <MenuItem key="14">Item 12</MenuItem>
            </SubMenu>
          </SubMenu>
        </Menu>
      </Row>
    </MenuContainer>
  );
}

export const meta = {
  title: '缩起内嵌菜单',
  desc: '内嵌菜单可以被缩起/展开。',
};
