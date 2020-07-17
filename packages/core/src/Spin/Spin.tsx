import React, { Ref, useState, cloneElement, useEffect } from 'react';

import { colorUtils } from '@muya-ui/theme-light';

import { InlineButton } from '../Button';
import Dialog from '../Dialog';
import SpinIcon from './SpinIcon';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { StyledDescWrapper, StyledIconWrapper, StyledSpinContent } from './styled';
import { ISpinProps } from './types';
import { setRef } from '@muya-ui/utils';
import { getPortalContainer } from '../Portal/utils';
import memoForwardRef from '../utils/memoForwardRef';

export default memoForwardRef((props: ISpinProps, ref: Ref<SVGSVGElement>) => {
  const {
    fullscreen,
    spinning = true,
    container,
    dialogProps = {},
    size = 'm',
    desc,
    cancelText,
    onCancel,
    direction = 'column',
    children,

    color,
    fontSize,
    styles,
    ...other
  } = props;
  const theme = useTheme();
  const innerStyles = useStyles(
    'spin',
    {
      desc: '',
      button: '',
    },
    styles,
  );
  const {
    colors,
    components: { Spin: token },
  } = theme;
  const mainColor = color || colors.spec.brand;
  const [innerContainer, setInnerContainer] = useState<HTMLElement | null>(null);
  const handleRef = (node: HTMLElement) => {
    setRef((children as any).ref, node);
    setInnerContainer(node);
  };

  const content = (
    <>
      {desc && (
        <StyledDescWrapper {...innerStyles.desc} size={size} theme={theme} cancelText={cancelText}>
          {desc}
        </StyledDescWrapper>
      )}
      {cancelText && (
        <InlineButton {...innerStyles.button} size={size} type="primary" onClick={onCancel}>
          {cancelText}
        </InlineButton>
      )}
    </>
  );

  const Icon = (
    <StyledSpinContent theme={theme} direction={direction}>
      <StyledIconWrapper size={!desc && !cancelText ? undefined : size} theme={theme}>
        <SpinIcon ref={ref} fontSize={fontSize} color={mainColor} {...other} />
      </StyledIconWrapper>
      {direction === 'column' ? <span>{content}</span> : content}
    </StyledSpinContent>
  );

  // 传入container or children，开启区域加载功能
  const isBlockLoading = !!children || !!container;

  // fullscreen为true，开启全屏加载功能
  const isFullscreenLoading = fullscreen;

  useEffect(() => {
    const finalContainer = container ? getPortalContainer(container) : innerContainer;
    // 全屏模式不会使用finalContainer，因此无需设置样式
    if (!isFullscreenLoading && finalContainer) {
      const { position } = window.getComputedStyle(finalContainer);
      // position未设置 或者 position为static，组件为其设置默认的position，使区域加载生效
      if (!position || position === 'static') {
        (finalContainer as HTMLElement).style.position = 'relative';
      }
    }
  }, [container, innerContainer, isFullscreenLoading]);

  // 区域加载 / 全屏加载，使用Dialog.Base
  if (isFullscreenLoading || isBlockLoading) {
    return (
      <>
        {children && cloneElement(children, { ref: handleRef })}
        <Dialog.Base
          open={spinning}
          container={isFullscreenLoading ? undefined : container || innerContainer}
          disableEscapeKeyDown
          disableMaskClick
          disableSize
          {...dialogProps}
          style={{
            background: colorUtils.transparentize(
              token.maskOpacity,
              colors.pattern.background.higher,
            ),
            ...dialogProps.style,
          }}
          dialogContainerProps={{
            style: {
              background: 'transparent',
              boxShadow: 'none',
              top: '50%',
            },
            ...dialogProps.dialogContainerProps,
          }}
        >
          {Icon}
        </Dialog.Base>
      </>
    );
  }

  if (!spinning) {
    return null;
  }

  return Icon;
});
