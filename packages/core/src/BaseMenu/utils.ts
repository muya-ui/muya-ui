import React, { FunctionComponentElement, ReactElement } from 'react';

export const getChildType = (child: FunctionComponentElement<any>) => {
  if (child.type && child.type.displayName) {
    return child.type.displayName;
  }
  return '';
};

export const isMenuItem = (type: string) => {
  return type === 'MenuItem';
};

/* eslint-disable no-param-reassign */
export const getMenuItemCountFromChildren = (
  children: ReactElement | ReactElement[],
  count: number = 0,
) => {
  React.Children.forEach(children, child => {
    if (!child) {
      return;
    }
    const type = getChildType(child as FunctionComponentElement<any>);
    if (isMenuItem(type)) {
      count += 1;
    } else if (child && child.props && React.Children.count(child.props.children) > 0) {
      count += getMenuItemCountFromChildren(child.props.children);
    }
  });
  return count;
};
