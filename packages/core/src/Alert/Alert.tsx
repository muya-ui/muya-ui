import React, { Ref, useCallback, useMemo, useState } from 'react';

import {
  ClearIcon,
  CloseIcon,
  InformIcon,
  ReminderIcon,
  SuccessIcon,
} from '@muya-ui/theme-light';

import Animation from '../Animation';
import IconButton from '../IconButton';
import addPx from '../utils/addPx';
import memoForwardRef from '../utils/memoForwardRef';
import mergeStyleItem from '../utils/mergeStyleItem';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import {
  StyledAlert,
  StyledAlertContainer,
  StyledClose,
  StyledDesc,
  StyledIcon,
  StyledTitle,
} from './styled';
import { IAlertProps } from './types';

const defaultStyles = {
  wrapper: '',
  container: '',
  icon: '',
  title: '',
  desc: '',
  close: '',
};
const Alert = memoForwardRef((props: IAlertProps, ref: Ref<HTMLDivElement>) => {
  const theme = useTheme();
  const token = theme.components.Alert;
  const {
    children,
    type = 'info',
    showClose,
    title,
    description,
    showIcon = token.defaultShowIcon,
    onClose,
    visible = true,
    styles,
    size = 'm',
    className,
    style,
    appear = true,
    timeout,
    childrenAsTitle,
    TransitionComponent = Animation.Collapse,
    ...otherProps
  } = props;

  const innerStyles = useStyles('alert', defaultStyles, styles);
  const wrapperStyleItem = useMemo(
    () =>
      mergeStyleItem(
        {
          className,
          style,
        },
        innerStyles.wrapper,
      ),
    [className, innerStyles.wrapper, style],
  );
  const isControlled = 'visible' in props;
  let innerTitle: React.ReactNode = title;
  if (!title && (typeof children === 'string' || (children && childrenAsTitle))) {
    innerTitle = children;
  }
  const hasTitle = !!innerTitle;
  const hasDesc = !!description;
  // 同时存在 title 和 desc 是两种样式
  const hasTitleAndDesc = hasTitle && hasDesc;
  const [state, setState] = useState(true);
  const finalVisible = isControlled ? visible : state;

  const iconNode = useMemo(() => {
    if (showIcon) {
      const typeIcon = token.typeIcon || {
        success: SuccessIcon,
        info: InformIcon,
        warning: ReminderIcon,
        error: ClearIcon,
      };
      const Icon = typeIcon[type];
      const iconBgColor = token.icon.bgColor[type];
      const fontSize = hasTitleAndDesc
        ? token.icon.hasTitleAndDescSize[size]
        : token.icon.size[size];
      return (
        <StyledIcon
          {...innerStyles.icon}
          theme={theme}
          $type={type}
          $hasTitleAndDesc={hasTitleAndDesc}
          $size={size}
        >
          <Icon bgColor={iconBgColor} fontSize={addPx(fontSize)} />
        </StyledIcon>
      );
    }
  }, [
    hasTitleAndDesc,
    innerStyles.icon,
    showIcon,
    size,
    theme,
    token.icon.bgColor,
    token.icon.hasTitleAndDescSize,
    token.icon.size,
    token.typeIcon,
    type,
  ]);

  const titleNode = useMemo(() => {
    if (hasTitle) {
      return (
        <StyledTitle {...innerStyles.title} theme={theme} $size={size} $hasDesc={hasDesc}>
          {innerTitle}
        </StyledTitle>
      );
    } else if (children) {
      return children;
    }
  }, [children, hasDesc, hasTitle, innerStyles.title, innerTitle, size, theme]);

  const contentNode = useMemo(() => {
    if (hasDesc) {
      return (
        <StyledDesc theme={theme} {...innerStyles.desc}>
          {description}
        </StyledDesc>
      );
    }
  }, [description, hasDesc, innerStyles.desc, theme]);

  const handleClose = useCallback(() => {
    if (!isControlled) {
      setState(false);
    }
    onClose && onClose();
  }, [isControlled, onClose]);

  const closeNode = useMemo(() => {
    if (showClose) {
      const Icon = theme.components.Alert.closeIcon || CloseIcon;
      const closeIconButtonSize = theme.components.Alert.closeIconButtonSize;
      return (
        <StyledClose
          theme={theme}
          $size={size}
          $hasTitleAndDesc={hasTitleAndDesc}
          {...innerStyles.close}
        >
          <IconButton size={closeIconButtonSize[size!]} onClick={handleClose}>
            <Icon />
          </IconButton>
        </StyledClose>
      );
    }
  }, [handleClose, hasTitleAndDesc, innerStyles.close, showClose, size, theme]);

  return (
    <TransitionComponent in={finalVisible} appear={appear} timeout={timeout}>
      <StyledAlert
        theme={theme}
        ref={ref}
        $hasTitle={hasTitle}
        $hasDesc={hasDesc}
        $showIcon={showIcon}
        $showClose={showClose}
        $type={type}
        $size={size}
        {...otherProps}
        {...wrapperStyleItem}
      >
        <StyledAlertContainer {...innerStyles.container}>
          {iconNode}
          {titleNode}
          {contentNode}
          {closeNode}
        </StyledAlertContainer>
      </StyledAlert>
    </TransitionComponent>
  );
});

export default Alert;
