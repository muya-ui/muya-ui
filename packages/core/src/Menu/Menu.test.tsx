import React from 'react';
import renderer from 'react-test-renderer';
import mockConsole from 'test/utils/mockConsole';

import { AddIcon, CalendarIcon, FileIcon, InformIcon, UserIcon } from '@muya-ui/theme-light';

import Link from '../Link';
import Menu from './Menu';
import MenuItem from './MenuItem';
import MenuItemGroup from './MenuItemGroup';
import SubMenu from './SubMenu';

describe('Menu', () => {
  beforeAll(() => {
    mockConsole.restoreError();
    mockConsole.mockError();
  });

  afterAll(() => {
    mockConsole.restoreError();
  });

  test('横向菜单', () => {
    const tree = renderer
      .create(
        <>
          <Menu defaultSelectedKeys={['mail']} defaultOpenKeys={['submenu']} mode="horizontal">
            <MenuItem key="mail" role="option">
              Navigation One
            </MenuItem>
            <MenuItem key="app" role="none" disabled>
              Navigation Two
            </MenuItem>
            <SubMenu
              key="submenu"
              triggerId="submenu"
              title={<span className="submenu-title-wrapper">Navigation Three - Submenu</span>}
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
        </>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('内嵌菜单和自定义 icon 渲染', () => {
    const tree = renderer
      .create(
        <Menu
          width={200}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          expandIcon={<AddIcon />}
          itemIcon={<FileIcon />}
          subMenuIcon={<FileIcon />}
          styles={{
            wrapper: 'custom-wrapper',
            menu: 'custom-menu',
            subMenu: 'custom-sub-menu',
            subMenuTitle: 'custom-sub-menu-title',
            group: 'custom-group',
            groupLabel: 'custom-global-label',
            item: 'custom-item',
            itemContent: 'custom-item-content',
            itemText: 'custom-item-text',
            menuScrollWrapper: 'custom-menu-scroll-wrapper',
          }}
        >
          <SubMenu
            styles={{
              menu: 'custom-menu-own',
              menuScrollWrapper: 'custom-menu-scroll-wrapper-own',
              subMenu: 'custom-sub-menu-own',
              subMenuTitle: 'custom-sub-menu-title-own',
            }}
            key="sub1"
            triggerId="sub1"
            title={<span>导航一</span>}
          >
            <MenuItem
              key="1"
              styles={{
                item: 'custom-item-own',
                itemContent: 'custom-item-content-own',
                itemText: 'custom-item-text-own',
              }}
            >
              Item 1
            </MenuItem>
            <MenuItem key="2">Item 2</MenuItem>
            <MenuItem key="3">Item 3</MenuItem>
            <MenuItem key="4" disabled={true}>
              Item 4
            </MenuItem>
          </SubMenu>
          <SubMenu key="sub2" title={<span>导航二</span>}>
            <MenuItemGroup
              key="group1"
              title="group 1"
              styles={{
                group: 'custom-group-own',
                groupLabel: 'custom-group-label-own',
              }}
            >
              <MenuItem key="5">Item 5</MenuItem>
              <MenuItem key="6">Item 6</MenuItem>
            </MenuItemGroup>
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
        </Menu>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('垂直菜单', () => {
    const tree = renderer
      .create(
        <Menu width={200} defaultOpenKeys={['sub4']}>
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
          <SubMenu key="sub4" triggerId="sub4" title={<span>导航三</span>}>
            <MenuItem key="9">Item 9</MenuItem>
            <MenuItem key="10">Item 10</MenuItem>
            <MenuItem key="11">Item 11</MenuItem>
            <MenuItem key="12">Item 12</MenuItem>
            <MenuItem key="13">Item 13</MenuItem>
            <MenuItem key="14">Item 14</MenuItem>
            <MenuItem key="15">Item 15</MenuItem>
            <MenuItem key="16">Item 16</MenuItem>
          </SubMenu>
        </Menu>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('内嵌菜单 inlineCollapsed', () => {
    const tree = renderer
      .create(
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          inlineCollapsed={true}
          width={200}
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
          </SubMenu>
          <SubMenu key="sub2" icon={<FileIcon />} title={<span>导航二</span>}>
            <MenuItemGroup key="g2" title={<span>分组二</span>}>
              <MenuItem key="9">Item 9</MenuItem>
              <MenuItem key="10">Item 10</MenuItem>
            </MenuItemGroup>
            <SubMenu key="sub3" title="二级菜单" icon={<FileIcon />}>
              <MenuItem key="11">Item 11</MenuItem>
              <MenuItem key="12">Item 12</MenuItem>
            </SubMenu>
          </SubMenu>
        </Menu>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
