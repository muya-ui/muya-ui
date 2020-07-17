import React, { useMemo, Children, useState } from 'react';
import memoForwardRef from '../utils/memoForwardRef';
import { ICollapseProps, ICollapsePanelProps } from './types';
import { StyledCollapseWrapper } from './styled';
import { uniq } from 'lodash';
import useTheme from '../utils/useTheme';

export default memoForwardRef<HTMLDivElement, ICollapseProps>((props, ref) => {
  const theme = useTheme();
  const {
    children,
    activeKeys: activeKeysProp,
    defaultActiveKeys: defaultActiveKeysProp = [],
    accordion = false,
    expandIconPosition = 'left',
    expandIcon,
    onChange,
    ...other
  } = props;
  // 手风琴模式，只取第一个值
  const activeKeys = accordion && activeKeysProp ? activeKeysProp.slice(0, 1) : activeKeysProp;
  const defaultActiveKeys = accordion ? defaultActiveKeysProp.slice(0, 1) : defaultActiveKeysProp;

  const [activeKeysState, setActiveKeysState] = useState<React.Key[]>(defaultActiveKeys);
  const isControlled = 'activeKeys' in props;
  const finalActiveKeys = isControlled && activeKeys ? activeKeys : activeKeysState;
  const items = useMemo(() => {
    return Children.map(children, (c, index) => {
      if (!React.isValidElement(c)) {
        return;
      }
      const child = c as any;
      const childKey = child.key || index;
      const isActive = finalActiveKeys.includes(childKey);
      const handleHeaderClick = (e: React.MouseEvent) => {
        if (child.props.onHeaderClick) {
          child.props.onHeaderClick(e);
        }
        setActiveKeysState(prev => {
          let newKeys = isActive ? prev.filter(k => childKey !== k) : uniq([...prev, childKey]);
          if (accordion) {
            newKeys = isActive ? [] : [childKey];
          }
          onChange && onChange(newKeys);
          return newKeys;
        });
      };
      const childProps: ICollapsePanelProps = {
        isActive,
        expandIconPosition,
        expandIcon,
        ...child.props,
        onHeaderClick: e => handleHeaderClick(e),
      };

      return React.cloneElement(child, childProps);
    });
  }, [accordion, children, expandIcon, expandIconPosition, finalActiveKeys, onChange]);

  return (
    <StyledCollapseWrapper theme={theme} ref={ref} {...other}>
      {items}
    </StyledCollapseWrapper>
  );
});
