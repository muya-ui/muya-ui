import React from 'react';

import { StyledBaseMenuItemGroup, StyledBaseMenuItemGroupLabel } from './styled';
import { IBaseMenuItemGroupProps } from './types';

const MenuItemGroup = React.memo((props: IBaseMenuItemGroupProps) => {
  const { label, children, ...restProps } = props;
  return (
    <StyledBaseMenuItemGroup {...restProps}>
      <StyledBaseMenuItemGroupLabel>{label}</StyledBaseMenuItemGroupLabel>
      {children}
    </StyledBaseMenuItemGroup>
  );
});

MenuItemGroup.displayName = 'MenuItemGroup';

export default MenuItemGroup;
