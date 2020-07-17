import React, { Ref } from 'react';
import styled from 'styled-components';

import { ISvgProps } from './types';

export const StyledSvg = styled.svg`
  display: inline-block;
  flex-shrink: 0;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 1em;
  height: 1em;
  overflow: hidden;
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  fill: currentColor;
`;

export default React.forwardRef<SVGSVGElement, ISvgProps>(function SvgIcon(
  props: ISvgProps,
  ref: Ref<SVGSVGElement>,
) {
  const viewBoxSize = 1024;
  const {
    children,
    className,
    viewBox = `0 0 ${viewBoxSize} ${viewBoxSize}`,
    color,
    bgSize = [],
    bgColor,
    fontSize,
    ...other
  } = props;
  const [bgWidthPercent = 0.7, bgHeightPercent = 0.7] = bgSize;
  const bgWidth = bgWidthPercent * viewBoxSize;
  const bgHeight = bgHeightPercent * viewBoxSize;
  const bgX = (viewBoxSize - bgWidth) / 2;
  const bgY = (viewBoxSize - bgHeight) / 2;
  return (
    <StyledSvg
      focusable="false"
      aria-hidden="false"
      viewBox={viewBox}
      className={className}
      ref={ref}
      color={color}
      fontSize={fontSize}
      {...other}
    >
      <>
        {bgColor && <rect width={bgWidth} height={bgHeight} x={bgX} y={bgY} fill={bgColor} />}
        {children}
      </>
    </StyledSvg>
  );
});
