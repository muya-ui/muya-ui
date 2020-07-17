import React, { ReactElement, useRef, useState, useMemo, useCallback } from 'react';

import { useLockScroll, useEventCallback, useForkRef } from '@muya-ui/utils';

import Animation from '../Animation';
import Portal, { portalUtils } from '../Portal';
import forkHandler from '../utils/forkHandler';
import useTheme from '../utils/useTheme';
import DialogContainer from './StyledContainer';
import DialogRoot from './StyledRoot';
import { IDialogBaseProps } from './types';
import addPx from '../utils/addPx';
import memoForwardRef from '../utils/memoForwardRef';

export default memoForwardRef<HTMLDivElement, IDialogBaseProps>((props, ref) => {
  const {
    disablePortal,
    open = false,
    container,
    children,
    onRendered,
    disableEscapeKeyDown,
    disableMaskClick,
    onClose,
    onMaskClick,
    onEscapeKeyDown,
    hideMask,
    onEntered,
    onExited,
    lazyMount = false,
    destroyOnClose,

    // container props
    size,
    fullWidth,
    fullScreen,
    disableSize,
    dialogContainerProps,
    customDialogContainer,
    width,
    height,
    maxHeight,
    zIndex,
    rootRef,
    ...other
  } = props;
  const theme = useTheme();
  const [exited, setExited] = useState(!open);

  const dialogRef = useRef<HTMLDivElement>(null);
  const handleRootRef = useForkRef(dialogRef, rootRef);
  const firstMountRef = useRef(false);

  const handleMaskClick = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    // 弹窗点击蒙层时的回调
    if (onMaskClick) {
      onMaskClick(event);
    }

    if (!disableMaskClick && onClose) {
      onClose(event, 'maskClick');
    }
  }, []);

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    // We don't take event.defaultPrevented into account:
    //
    // event.preventDefault() is meant to stop default behaviours like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default behaviors.
    if (event.key !== 'Escape') {
      return;
    }
    event.stopPropagation();

    // 按下ESC键触发的回调
    if (onEscapeKeyDown) {
      onEscapeKeyDown(event);
    }

    if (!disableEscapeKeyDown && onClose) {
      onClose(event, 'escapeKeyDown');
    }
  }, []);

  const handleEntered = useMemo(
    () =>
      forkHandler(() => {
        if (open && dialogRef.current) {
          // 禁用ESC键时，不需要focus
          !disableEscapeKeyDown && dialogRef.current.focus();
        }
      }, onEntered),
    [disableEscapeKeyDown, onEntered, open],
  );

  const handleExited = useMemo(
    () =>
      forkHandler(() => {
        setExited(true);
      }, onExited),
    [onExited],
  );

  const handleEnter = useCallback(() => {
    setExited(false);
  }, []);

  /**
   * effect: dialog出现时隐藏container的滚动条
   * 1. 当前动画处于非exited状态，隐藏container的滚动条
   * 2. 此处使用exited，是希望关闭弹窗时，弹窗动画执行完毕之后，再隐藏滚动条
   * 3. 如果不使用exited，直接使用open，弹窗动画未执行完毕时，滚动条就隐藏了，此时页面会有跳动的感觉
   */
  useLockScroll(!exited, portalUtils.getPortalContainer(container) as HTMLElement);

  const childrenWithProps = useMemo(
    () =>
      React.Children.map(children, child => {
        const props =
          React.isValidElement(child) && typeof child.type === 'string' ? {} : { fullWidth };
        return child && React.cloneElement(child as ReactElement, props);
      }),
    [children, fullWidth],
  );

  const dialogContainer = useMemo(
    () =>
      customDialogContainer || (
        <DialogContainer
          theme={theme}
          $size={size}
          $fullScreen={fullScreen}
          $fullWidth={fullWidth}
          $disableSize={disableSize}
          $width={addPx(width)}
          $height={addPx(height)}
          $maxHeight={addPx(maxHeight)}
          ref={ref}
          {...dialogContainerProps}
        >
          {typeof children === 'string' ? children : childrenWithProps}
        </DialogContainer>
      ),
    [
      children,
      childrenWithProps,
      customDialogContainer,
      dialogContainerProps,
      disableSize,
      fullScreen,
      fullWidth,
      height,
      maxHeight,
      ref,
      size,
      theme,
      width,
    ],
  );

  const rootChildren = useMemo<React.ReactNode>(() => {
    // destroyOnClose逻辑，在弹窗关闭并且动画执行完毕之后，才会渲染null
    if (destroyOnClose && !open && exited) {
      return null;
    }

    // lazyMount开启 && 初次渲染，执行懒加载，不渲染子节点
    if (lazyMount && !firstMountRef.current && !open && exited) {
      return null;
    }
    return dialogContainer;
  }, [destroyOnClose, dialogContainer, exited, lazyMount, open]);

  // 第一次渲染后，将firstMountRef设置为true
  if (!firstMountRef.current) {
    firstMountRef.current = true;
  }

  return (
    <Portal disablePortal={disablePortal} container={container} onRendered={onRendered}>
      <Animation.Fade
        in={open}
        onEntered={handleEntered}
        onExited={handleExited}
        onEnter={handleEnter}
      >
        <DialogRoot
          theme={theme}
          role="presentation"
          ref={handleRootRef}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          onClick={handleMaskClick}
          $hideMask={hideMask}
          $container={portalUtils.getPortalContainer(container)}
          $zIndex={zIndex}
          {...other}
        >
          {rootChildren}
        </DialogRoot>
      </Animation.Fade>
    </Portal>
  );
});
