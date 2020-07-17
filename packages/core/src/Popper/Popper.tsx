import PopperJS, { Placement, PopperOptions } from 'popper.js';
import React, { Ref, useCallback, useEffect, useRef, useState } from 'react';

import { setRef, useForkRef } from '@muya-ui/utils';

import Portal from '../Portal';
import useTheme from '../utils/useTheme';
import { IPopperChildProps, IPopperProps } from './types';
import styled, { css } from 'styled-components';

export function flipPlacement(placement: Placement) {
  const direction = (typeof window !== 'undefined' && document.body.getAttribute('dir')) || 'ltr';

  if (direction !== 'rtl') {
    return placement;
  }

  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';
    case 'bottom-start':
      return 'bottom-end';
    case 'top-end':
      return 'top-start';
    case 'top-start':
      return 'top-end';
    default:
      return placement;
  }
}

function getAnchorEl(anchorEl: IPopperProps['anchorEl']) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const defaultPopperOptions: PopperOptions = {};

interface IStyledPopperProps {
  $zIndex: number;
  $shouldHide: boolean;
}

const StyledPopper = styled.div<IStyledPopperProps>`
  position: absolute;
  left: 0;
  top: 0;
  z-index: ${props => props.$zIndex};
  ${props =>
    props.$shouldHide &&
    css`
      width: 0px;
      height: 0px;
      overflow: hidden;
      visibility: hidden;
    `}
`;

/**
 * Poppers rely on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
 */
const Popper = React.forwardRef(function Popper(props: IPopperProps, ref: Ref<HTMLDivElement>) {
  const {
    anchorEl,
    children,
    container,
    disablePortal = false,
    keepMounted = true,
    lazyMount = true,
    modifiers,
    open,
    placement: placementProps = 'bottom',
    popperOptions = defaultPopperOptions,
    popperRef: popperRefProp,
    transition = false,
    transitionProps,
    zIndex,
    ...other
  } = props;
  const tooltipRef = useRef<HTMLDivElement>(null);
  const ownRef = useForkRef<HTMLDivElement | null>(tooltipRef, ref);

  const popperRef = useRef<PopperJS>(null);
  const handlePopperRef = useForkRef<PopperJS | null>(popperRef, popperRefProp);
  const handlePopperRefRef = useRef<typeof handlePopperRef>(null);
  const firstMountRef = useRef(false);
  const theme = useTheme();

  useEnhancedEffect(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);

  React.useImperativeHandle(popperRefProp, () => popperRef.current, []);

  const [exited, setExited] = useState(!open);
  const [placement, setPlacement] = useState<Placement>();

  const handlePopperUpdate = useCallback(
    (data: PopperJS.Data) => {
      if (data.placement !== placement) {
        setPlacement(data.placement);
      }
    },
    [placement],
  );

  const handleOpen = useCallback(() => {
    const popperNode = tooltipRef.current;

    if (!popperNode || !anchorEl || !open) {
      return;
    }

    if (popperRef.current) {
      popperRef.current.destroy();
      if (handlePopperRefRef.current) {
        handlePopperRefRef.current(null);
      }
    }

    const popperReferenceElement = getAnchorEl(anchorEl);
    if (popperReferenceElement) {
      const popper = new PopperJS(popperReferenceElement, popperNode, {
        placement: flipPlacement(placementProps),
        positionFixed: true,
        ...popperOptions,
        modifiers: {
          preventOverflow: {
            // boundariesElement: disablePortal ? 'scrollParent' : 'window',
            enabled: false,
          },
          hide: {
            enabled: false,
          },
          ...modifiers,
          ...popperOptions.modifiers,
        },
        // We could have been using a custom modifier like react-popper is doing.
        // But it seems this is the best public API for this use case.
        onCreate: data => {
          handlePopperUpdate(data);
          popperOptions.onCreate && popperOptions.onCreate(data);
        },
        onUpdate: data => {
          handlePopperUpdate(data);
          popperOptions.onUpdate && popperOptions.onUpdate(data);
        },
      });

      if (handlePopperRefRef.current) {
        handlePopperRefRef.current(popper);
      }
    }
  }, [anchorEl, handlePopperUpdate, modifiers, open, placementProps, popperOptions]);

  const handleRef = useCallback(
    node => {
      setRef(ownRef, node);
      handleOpen();
    },
    [ownRef, handleOpen],
  );

  const handleEnter = (node: HTMLElement, isAppearing: boolean) => {
    setExited(false);
    if (transitionProps && transitionProps.onEnter) {
      transitionProps.onEnter(node, isAppearing);
    }
  };

  const handleClose = () => {
    if (!popperRef.current) {
      return;
    }

    popperRef.current.destroy();
    if (handlePopperRefRef.current) {
      handlePopperRefRef.current(null);
    }
  };

  const handleExited = (node: HTMLElement) => {
    setExited(true);
    handleClose();
    if (transitionProps && transitionProps.onExited) {
      transitionProps.onExited(node);
    }
  };

  useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  useEffect(() => {
    // Let's update the popper position.
    handleOpen();
  }, [handleOpen]);

  useEffect(() => {
    return () => {
      handleClose();
    };
  }, []);

  useEffect(() => {
    if (!open && !transition) {
      // Otherwise handleExited will call this.
      handleClose();
    }
  }, [open, transition]);

  /**
   * Popper 关闭的情况下有两种情况是不需要渲染的：
   * 1. 第一次渲染 Popper 且开启了 lazyMount 的情况下，用于预防提前渲染无用的节点
   * 2. keepMounted 为 false，且未开启动画或者已经退出的情况下
   * 需要保持内部组件状态的话需要将 keepMounted 设为 true
   */
  if (
    !open &&
    ((lazyMount && !firstMountRef.current) || (!keepMounted && (!transition || exited)))
  ) {
    return null;
  }

  const childProps: IPopperChildProps = {
    placement: placement || flipPlacement(placementProps),
  };

  if (transition) {
    childProps.transitionProps = {
      ...transitionProps,
      in: open,
      onEnter: handleEnter,
      onExited: handleExited,
    };
  }

  // 如果是第一次渲染菜单，那么将 ref 设为 true
  if (!firstMountRef.current) {
    firstMountRef.current = true;
  }

  const shouldHide = transition ? exited : !open;

  return (
    <Portal disablePortal={disablePortal} container={container}>
      <StyledPopper
        ref={handleRef}
        role="tooltip"
        $zIndex={zIndex || theme.zIndex.pattern.popper}
        $shouldHide={shouldHide}
        {...other}
      >
        {typeof children === 'function' ? children(childProps) : children}
      </StyledPopper>
    </Portal>
  );
});

export default Popper;
