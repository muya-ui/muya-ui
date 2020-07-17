import React, { Ref, useCallback, useMemo, useRef, useState } from 'react';

import { useEventCallback, useForkRef } from '@muya-ui/utils';

import Animation from '../Animation';
import { IMenuProps, IMenuSelectInfo } from '../Menu';
import Trigger from '../Trigger';
import useTheme from '../utils/useTheme';
import { IDropdownProps, IOverlayFunc } from './types';
import memoForwardRef from '../utils/memoForwardRef';

const Dropdown = memoForwardRef((props: IDropdownProps, ref: Ref<unknown>) => {
  const {
    id,
    hideArrow = true,
    placement = 'bottom-start',
    visible,
    defaultVisible = false,
    disabled = false,
    overlay,
    size = 'm',
    onOverlayClick,
    getPopupContainer,
    TransitionComponent = Animation.Slide,
    onVisibleChange: onVisibleChangeProp,
    children,
    popperProps,
    ...other
  } = props;
  const theme = useTheme();
  const {
    shadows,
    components: { Dropdown: DropdownToken },
  } = theme;
  const [openState, setOpenState] = useState(defaultVisible);
  const child = useMemo(() => React.Children.only(children), [children]);
  const triggerRef = useRef(null);
  const handleRef = useForkRef(triggerRef, child.ref);
  const { current: isControlled } = useRef('visible' in props);
  React.useImperativeHandle(ref, () => triggerRef.current, [triggerRef]);

  if (isControlled && openState !== visible) {
    setOpenState(visible!);
  }

  const onVisibleChange = useCallback(
    (visible: boolean) => {
      if (!isControlled) {
        setOpenState(visible);
      }
      if (onVisibleChangeProp) {
        onVisibleChangeProp(visible);
      }
    },
    [isControlled, onVisibleChangeProp],
  );

  const getOverlayElement = useCallback(() => {
    let overlayElement;
    if (typeof overlay === 'function') {
      overlayElement = (overlay as IOverlayFunc)();
    } else {
      overlayElement = overlay;
    }
    overlayElement = React.Children.only(overlayElement) as React.ReactElement<IMenuProps>;
    return overlayElement;
  }, [overlay]);

  const onClick = useEventCallback((selectInfo: IMenuSelectInfo) => {
    const overlayProps = getOverlayElement().props;
    if (!isControlled) {
      setOpenState(false);
    }
    if (onOverlayClick) {
      onOverlayClick(selectInfo);
    }
    if (overlayProps.onClick) {
      overlayProps.onClick(selectInfo);
    }
  }, []);

  const menu = useMemo(() => {
    const overlayElement = getOverlayElement();
    const extraOverlayProps = {
      size,
      hideRootMenuSpacing: true,
      onClick,
      style: {
        ...overlayElement.props.style,
        boxShadow: shadows.pattern.popper.normal,
      },
    };
    return React.cloneElement(overlayElement, extraOverlayProps);
  }, [getOverlayElement, onClick, shadows.pattern.popper.normal, size]);

  const dropdownTrigger = useMemo(
    () =>
      React.cloneElement(child, {
        ref: handleRef,
        disabled,
      }),
    [child, disabled, handleRef],
  );
  const arrowStyle = useMemo(
    () => ({
      color: theme.colors.pattern.background.higher,
    }),
    [theme.colors.pattern.background.higher],
  );
  const open = isControlled ? visible : openState;
  return (
    <Trigger
      id={id}
      hideArrow={hideArrow}
      arrowStyle={arrowStyle}
      placement={placement}
      popup={menu}
      TransitionComponent={TransitionComponent}
      open={disabled ? false : open}
      offset={DropdownToken.offset[size!]}
      popperProps={popperProps}
      container={getPopupContainer}
      onVisibleChange={onVisibleChange}
      {...other}
    >
      {dropdownTrigger}
    </Trigger>
  );
});

export default Dropdown;
