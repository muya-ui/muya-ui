import { FoldIcon, MoreIcon } from '@muya-ui/theme-light';

import React, { Ref, useMemo } from 'react';

import { Button } from '../Button';
import memoForwardRef from '../utils/memoForwardRef';
import useTheme from '../utils/useTheme';

import Dropdown from './Dropdown';
import { StyledDropdownButtonGroup } from './styled';
import { IDropdownButtonProps, IDropdownProps } from './types';

const DropdownButton = memoForwardRef((props: IDropdownButtonProps, ref: Ref<any>) => {
  const {
    id,
    hideArrow = true,
    plain = false,
    group = false,
    children,
    disabled,
    placement,
    overlay,
    triggerAction,
    triggerActions,
    triggerId,
    visible,
    size = 'm',
    TransitionComponent,
    getPopupContainer,
    onOverlayClick,
    onVisibleChange,
    leaveDelay,
    enterDelay,
    arrowStyle,
    offset,
    transitionProps,
    outsideCloseable,
    escapeKeyCloseable,
    onClickAway,
    onEscapeKeyDown,
    popperNodeRef,
    ...other
  } = props;
  const theme = useTheme();
  const {
    components: {
      Dropdown: { expandIcon: ExpandIcon = FoldIcon, groupExpandIcon: GroupExpandIcon = MoreIcon },
    },
  } = theme;
  const dropdownProps = {
    id,
    disabled,
    placement,
    overlay,
    triggerAction,
    triggerActions,
    triggerId,
    TransitionComponent,
    getPopupContainer,
    onOverlayClick,
    onVisibleChange,
    size,
    hideArrow,
    leaveDelay,
    enterDelay,
    arrowStyle,
    offset,
    transitionProps,
    outsideCloseable,
    escapeKeyCloseable,
    onClickAway,
    onEscapeKeyDown,
    popperNodeRef,
  };
  if (!('placement' in props)) {
    dropdownProps.placement = group ? 'bottom-end' : 'bottom-start';
  }
  if ('visible' in props) {
    (dropdownProps as IDropdownProps).visible = visible;
  }
  const buttonProps = {
    ...other,
    size,
    disabled,
    plain,
  };
  const expandIcon = useMemo(() => {
    return (
      props.expandIcon || (
        <ExpandIcon
          style={{
            width: 8,
            height: 8,
          }}
        />
      )
    );
  }, [props.expandIcon]);
  const groupIcon = useMemo(() => {
    return props.groupIcon || <GroupExpandIcon />;
  }, [props.groupIcon]);
  if (group) {
    return (
      <StyledDropdownButtonGroup>
        <Button type="primary" groupType="head" {...buttonProps}>
          {children}
        </Button>
        <Dropdown {...dropdownProps}>
          <Button type="primary" {...buttonProps} groupType="tail" shape="square">
            {groupIcon}
          </Button>
        </Dropdown>
      </StyledDropdownButtonGroup>
    );
  } else {
    return (
      <Dropdown {...dropdownProps}>
        <Button type="primary" ref={ref} {...buttonProps} suffixNode={expandIcon}>
          {children}
        </Button>
      </Dropdown>
    );
  }
});

export default DropdownButton;
