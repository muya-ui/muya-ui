import React, { FunctionComponentElement, ReactElement } from 'react';

import {
  ISelectMultiValueType,
  ISelectOptionsState,
  ISelectProps,
  ISelectValueType,
} from './types';

export const noop = () => {};

/**
 * value 在 select 内部都通过数组保存，因此提供转换函数
 */
export const toArray = (value?: ISelectValueType): ISelectMultiValueType => {
  let ret: ISelectMultiValueType = [];
  if (typeof value === 'undefined') {
    ret = [];
  } else if (!Array.isArray(value)) {
    ret = [value];
  } else {
    ret = value;
  }
  return ret;
};

/**
 * 获取 child 的组件类型，对于函数组件目前通过 displayName 进行判断
 */
export const getChildType = (child: FunctionComponentElement<any>) => {
  if (child.type && child.type.displayName) {
    return child.type.displayName;
  }
  return '';
};

export const isOption = (type: string) => {
  return type === 'Option';
};

export const isOptionGroup = (type: string) => {
  return type === 'OptionGroup';
};

export const isOptionDivider = (type: string) => {
  return type === 'OptionDivider';
};

export function getOptionPropValue(child: any, prop?: any) {
  return child.props[prop];
}

export function isSelectChildNode(child: any) {
  const type = getChildType(child);
  return isOption(type) || isOptionGroup(type) || isOptionDivider(type);
}

/**
 * 从 props 获取 value
 */
export const getValueFromProps = (
  props: Pick<ISelectProps, 'value' | 'defaultValue' | 'labelInValue'>,
): ISelectMultiValueType => {
  let value: ISelectMultiValueType = [];
  if ('value' in props) {
    value = toArray(props.value);
  } else if ('defaultValue' in props) {
    value = toArray(props.defaultValue);
  }
  return value;
};

/**
 * 从 children 中读取 option 节点
 */
export const getOptionsFromChildren = (
  children: ReactElement | ReactElement[],
  optionInfos: ISelectOptionsState = {},
) => {
  React.Children.forEach(children, child => {
    if (!child) {
      return;
    }
    const type = getChildType(child as FunctionComponentElement<any>);
    if (
      isOptionGroup(type) ||
      (!isOption(type) && child.props && Array.isArray(child.props.children))
    ) {
      getOptionsFromChildren(child.props.children, optionInfos);
    } else if (isOption(type)) {
      const value = getOptionPropValue(child, 'value');
      optionInfos[value] = {
        value,
        label: getOptionPropValue(child, 'label') || getOptionPropValue(child, 'children'),
        disabled: child.props.disabled,
      };
    }
  });
  return optionInfos;
};
