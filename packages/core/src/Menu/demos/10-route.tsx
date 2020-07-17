import React from 'react';
import { HashRouter, Link, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Menu, MenuItem, SubMenu } from '@muya-ui/core';

const StyledSidebarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 25%;
  border-right: 1px solid ${props => props.theme.colors.pattern.border.normal};
`;

const StyledContent = styled.div`
  margin-left: 25%;
  margin-top: 20px;
  height: 240px;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

function MyMenu() {
  const location = useLocation();
  const defaultSelectedKeys = [location.pathname];
  return (
    <div>
      <StyledSidebarWrapper>
        <Menu
          selectedKeys={defaultSelectedKeys}
          defaultOpenKeys={['components', 'utils']}
          mode="inline"
          triggerSubMenuAction="click"
        >
          <SubMenu key="components" title={<span>Components</span>}>
            <MenuItem key="/components/button">
              <StyledLink to="/components/button">按钮 Button</StyledLink>
            </MenuItem>
            <MenuItem key="/components/table">
              <StyledLink to="/components/table">表格 Table</StyledLink>
            </MenuItem>
          </SubMenu>
          <SubMenu key="utils" title={<span>工具函数</span>}>
            <MenuItem key="/utils/useAfterEffect">
              <StyledLink to="/utils/useAfterEffect">hooks</StyledLink>
            </MenuItem>
            <MenuItem key="/utils/createossposttool">
              <StyledLink to="/utils/createossposttool">createOssTool</StyledLink>
            </MenuItem>
          </SubMenu>
        </Menu>
      </StyledSidebarWrapper>
      <StyledContent>
        <Switch>
          <Route path="/components/button">我是个按钮</Route>
          <Route path="/components/table">我是个表格</Route>
          <Route path="/utils/useAfterEffect">useAfterEffect</Route>
          <Route path="/utils/createossposttool">createOssPostTool</Route>
          <Redirect from="/" to="/components/button" />
        </Switch>
      </StyledContent>
    </div>
  );
}

export default function RouteDemo() {
  return (
    <HashRouter>
      <MyMenu />
    </HashRouter>
  );
}

export const meta = {
  title: '搭配路由使用',
  desc: '将 `Menu` 的 `key` 与当前 `route` 关联起来',
};
