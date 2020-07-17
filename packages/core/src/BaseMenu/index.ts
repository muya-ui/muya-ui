import Menu from './Menu';
import MenuItem from './MenuItem';
import MenuItemDivider from './MenuItemDivider';
import MenuItemGroup from './MenuItemGroup';

const BaseMenu = {
  Menu: Menu,
  Item: MenuItem,
  Group: MenuItemGroup,
  Divider: MenuItemDivider,
};

export default BaseMenu;

export * from './types';
