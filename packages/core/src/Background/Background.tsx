import React from 'react';
import styled, { css } from 'styled-components';

import { IThemedBaseProps } from '../types';
import addPx from '../utils/addPx';
import memoForwardRef from '../utils/memoForwardRef';
import useTheme from '../utils/useTheme';
import { IBackgroundProps } from './types';
import warning from 'warning';

interface IRootProps {
  $type?: IBackgroundProps['type'];
  $display?: React.CSSProperties['display'];
  $backgroundColor?: string;
  $color?: string;
  $height?: string | number;
  $width?: string | number;
}

function baseCSS({
  $display,
  $width,
  $backgroundColor,
  $color,
  $height,
  $type = 'global',
  theme,
}: IRootProps & IThemedBaseProps) {
  let backgroundColor;
  if ($backgroundColor) {
    backgroundColor = $backgroundColor;
  } else {
    backgroundColor = theme.colors.pattern.background[$type];
  }
  const color = $color || theme.colors.pattern.text.text;
  return css({
    display: $display,
    backgroundColor,
    color,
    width: addPx($width),
    height: addPx($height),
  });
}

const RootDiv = styled.div<IRootProps>`
  ${baseCSS}
`;
const RootSpan = styled.div<IRootProps>`
  ${baseCSS}
`;

const Background = memoForwardRef<HTMLDivElement | HTMLSpanElement, IBackgroundProps>(
  (props, ref) => {
    const { type, component, display, backgroundColor, width, height, color, ...other } = props;
    const theme = useTheme();
    const Root = component === 'span' ? RootSpan : RootDiv;
    warning(
      !(type === 'scrollBar' || type === 'scrollBarHover'),
      '[Background]: type scrollBar and scrollBarHover is deprecated, will removed in 0.5.0',
    );
    return (
      <Root
        {...other}
        $type={type}
        $color={color}
        $display={display}
        $width={width}
        $height={height}
        $backgroundColor={backgroundColor}
        theme={theme}
        ref={ref as any}
      />
    );
  },
);

export default Background;
