import React from 'react';

import { forkRef } from '@muya-ui/utils';

import { Omit } from '../types';
import { ITabProps, ITabsProps } from './types';

interface IRefItem {
  ref: React.RefObject<HTMLDivElement>;
  selected: boolean;
}

type IConfigItem = Required<Pick<ITabProps, 'selected' | 'index'>>;
type ITabsBaseProps = Omit<ITabsProps, 'styles'>;

export function getItemDividerStatus(configs: IConfigItem[], currentIndex: number) {
  const currentItem = configs[currentIndex];

  if (currentItem.selected) {
    return 'off';
  }
  const lastItemIndex = configs.length - 1;

  if (currentIndex === lastItemIndex) {
    return 'off';
  }

  const nextItem = configs[currentIndex + 1];

  if (!currentItem.selected && nextItem && nextItem.selected) {
    return 'off';
  }
}

export default function useTabsBase(props: ITabsBaseProps, showIndicator: boolean = false) {
  const {
    type,
    index,
    defaultIndex,
    size,
    disabled,
    busy,
    onChange,
    // 其余的
    children,
  } = props;
  const indexFromProps = React.useMemo(() => {
    if (index !== undefined) {
      return index;
    }
    if (defaultIndex !== undefined) {
      return defaultIndex;
    }
    return 0;
  }, [defaultIndex, index]);
  const [stateIndex, setStateIndex] = React.useState(indexFromProps);
  const finalIndex = 'index' in props ? indexFromProps : stateIndex;

  const updateIndex = React.useCallback(
    (newIndex: string | number) => {
      setStateIndex(newIndex);
      if (onChange) {
        onChange(newIndex);
      }
    },
    [onChange],
  );

  const elementsFromChildren = React.useMemo(() => {
    const elements: React.ReactElement<ITabProps>[] = [];
    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) {
        return;
      }
      elements.push(child);
    });
    return elements;
  }, [children]);

  // type === 'card' 时，要计算是否有 divider
  const { itemConfigs, selectedIndex } = React.useMemo(() => {
    let selectedIndex = 0;
    const configs: IConfigItem[] = elementsFromChildren.map((child, childIndex) => {
      const { index: childValue } = child.props;
      const currentValue: string | number = childValue !== undefined ? childValue : childIndex;
      const selected = finalIndex === currentValue;
      if (selected) {
        selectedIndex = childIndex;
      }
      const config: IConfigItem = {
        selected,
        index: currentValue,
      };
      return config;
    });
    return {
      itemConfigs: configs,
      selectedIndex,
    };
  }, [elementsFromChildren, finalIndex]);

  const { resultChildren, innerItems } = React.useMemo(() => {
    const innerItems: IRefItem[] = [];
    const newChildren = elementsFromChildren.map((child, childIndex) => {
      const {
        disabled: childDisabled,
        busy: childBusy,
        size: childSize,
        index: cIndex,
        onClick,
        href: childHref,
        showIndicator: childShowIndicator,
        ...otherChildProps
      } = child.props;
      const { index: currentValue, selected } = itemConfigs[childIndex];
      const newChildKey = child.key || currentValue;
      const currentDisabled = childDisabled || disabled;
      const innerChildRef = React.createRef<HTMLDivElement>();
      const handleChildRef = forkRef<HTMLDivElement>((child as any).ref, innerChildRef);
      innerItems.push({
        ref: innerChildRef,
        selected,
      });
      let divider: 'off' | undefined;
      // type === 'card' 时，选中状态、最后一个、下一个选中都没有风格符
      if (type === 'card') {
        divider = getItemDividerStatus(itemConfigs, childIndex);
      }

      const newProps: ITabProps = {
        ...otherChildProps,
        type,
        disabled: currentDisabled,
        busy: childBusy || busy,
        selected,
        divider,
        index: currentValue,
        href: childHref,
        onClick: (e: any) => {
          if (!selected && !childHref) {
            updateIndex(currentValue);
          }
          onClick && onClick(e);
        },
        size,
      };
      (newProps as any).ref = handleChildRef;
      (newProps as any).key = newChildKey;
      if (type !== 'card') {
        newProps.showIndicator =
          childShowIndicator !== undefined ? childShowIndicator : showIndicator;
      }

      return React.cloneElement(child, newProps);
    });

    return {
      resultChildren: newChildren,
      innerItems,
    };
  }, [busy, disabled, elementsFromChildren, itemConfigs, showIndicator, size, type, updateIndex]);

  return {
    items: innerItems,
    children: resultChildren,
    selectedIndex,
    finalIndex,
    updateIndex,
  };
}
