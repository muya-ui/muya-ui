import React, { forwardRef, Ref, useMemo } from 'react';
import Dialog from '../Dialog';
import { IDrawerProps } from './types';
import { StyledCustomDialogContainer } from './styled';
import Animation from '../Animation';
import useTheme from '../utils/useTheme';

export default forwardRef(function Drawer(props: IDrawerProps, ref: Ref<HTMLDivElement>) {
  const {
    direction = 'left',
    width = '30%',
    height = '40%',
    slideProps,
    children,
    open,
    ...other
  } = props;
  const theme = useTheme();

  const customDialogContainer = useMemo(
    () => (
      <Animation.Slide
        direction={direction}
        minScale={0}
        timeout={theme.transition.spec.duration.fast}
        in={open}
        ref={ref}
        {...slideProps}
      >
        <StyledCustomDialogContainer
          $direction={direction}
          $width={width}
          $height={height}
          theme={theme}
        >
          {children}
        </StyledCustomDialogContainer>
      </Animation.Slide>
    ),
    [children, direction, height, open, ref, slideProps, theme, width],
  );

  return (
    <Dialog.Base customDialogContainer={customDialogContainer} open={open} ref={ref} {...other} />
  );
});
