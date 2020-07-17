import React, { CSSProperties, MouseEvent, useState, useMemo, useCallback } from 'react';

import { ClearIcon, InformIcon, ReminderIcon } from '@muya-ui/theme-light';

import Button from '../Button';
import PopoverCard from '../PopoverCard';
import useTheme from '../utils/useTheme';
import { StyledIconWrapper, StyledInlineButton, StyledTitleWrapper } from './styled';
import { IPopconfirmProps } from './types';
import memoForwardRef from '../utils/memoForwardRef';

export default memoForwardRef<HTMLDivElement, IPopconfirmProps>((props, ref) => {
  const {
    // Trigger相关
    defaultOpen,
    open: openProp,
    onVisibleChange,
    // PopoverCard相关
    title,
    content,
    actions,
    style,
    className,
    // Button相关
    onCancel,
    onConfirm,
    cancelText,
    confirmText,
    cancelButtonType,
    confirmButtonType: confirmButtonTypeProp = 'primary',
    useInlineButton,
    // 确认框类型
    type,
    // 自定义图标
    icon,
    ...other
  } = props;
  const theme = useTheme();

  const icons = {
    info: InformIcon,
    warning: ReminderIcon,
    error: ClearIcon,
    ...theme.components.Popconfirm.icons,
  };

  const { paddingLeftWithType, width } = theme.components.Popconfirm;

  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const isControlled = 'open' in props;
  const open = isControlled ? openProp : innerOpen;

  const handleVisibleChange = useCallback(
    (visible: boolean) => {
      if (!isControlled) {
        setInnerOpen(visible);
      }

      if (onVisibleChange) {
        onVisibleChange(visible);
      }
    },
    [isControlled, onVisibleChange],
  );

  const handleConfirm = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      // 非受控模式，点击确认关闭确认框
      if (!isControlled) {
        setInnerOpen(false);
      }

      if (onConfirm) {
        onConfirm(e);
      }
    },
    [isControlled, onConfirm],
  );

  const handleCancel = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      // 非受控模式，点击确认关闭确认框
      if (!isControlled) {
        setInnerOpen(false);
      }

      if (onCancel) {
        onCancel(e);
      }
    },
    [isControlled, onCancel],
  );

  // 确认按钮类型
  const confirmButtonType = useMemo(() => {
    if (type === 'error') {
      return 'danger';
    }
    return confirmButtonTypeProp;
  }, [confirmButtonTypeProp, type]);

  // 确认图标
  const innerIcon = useMemo(() => {
    if (icon) {
      return icon;
    }

    if (type) {
      const IconComp = icons[type];
      return <IconComp />;
    }
  }, [icon, icons, type]);

  const cancelButton = useMemo(
    () =>
      useInlineButton ? (
        <StyledInlineButton key="cancel" size="s" type={cancelButtonType} onClick={handleCancel}>
          {cancelText}
        </StyledInlineButton>
      ) : (
        <Button key="cancel" size="s" plain type={cancelButtonType} onClick={handleCancel}>
          {cancelText}
        </Button>
      ),
    [cancelButtonType, cancelText, handleCancel, useInlineButton],
  );

  const confirmButton = useMemo(
    () =>
      useInlineButton ? (
        <StyledInlineButton key="confirm" size="s" onClick={handleConfirm} type={confirmButtonType}>
          {confirmText}
        </StyledInlineButton>
      ) : (
        <Button key="confirm" size="s" onClick={handleConfirm} type={confirmButtonType}>
          {confirmText}
        </Button>
      ),
    [confirmButtonType, confirmText, handleConfirm, useInlineButton],
  );

  const innerActions = useMemo(
    () => [cancelText ? cancelButton : null, confirmText ? confirmButton : null],
    [cancelButton, cancelText, confirmButton, confirmText],
  );

  const innerTitle = useMemo(
    () => (
      <StyledTitleWrapper>
        <StyledIconWrapper theme={theme} $type={type}>
          {innerIcon}
        </StyledIconWrapper>
        {title}
      </StyledTitleWrapper>
    ),
    [innerIcon, theme, title, type],
  );

  const innerStyle: CSSProperties = useMemo(
    () => ({
      width,
      paddingLeft: type ? `${paddingLeftWithType}px` : undefined,
      ...style,
    }),
    [paddingLeftWithType, style, type, width],
  );

  return (
    <PopoverCard
      ref={ref}
      open={open}
      title={type ? innerTitle : title}
      content={content}
      actions={actions ? actions : innerActions}
      style={innerStyle}
      className={className}
      onVisibleChange={handleVisibleChange}
      {...other}
    />
  );
});
