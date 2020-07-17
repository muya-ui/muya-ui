import React from 'react';
import { ISvgProps, SvgIcon } from '@muya-ui/theme-light';
import memoForwardRef from '../utils/memoForwardRef';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const circleAnimate = keyframes`
  0% {
    stroke-dasharray: 28.274333882308138 254.46900494077323;
  }
  50% {
    stroke-dasharray: 212.05750411731103 212.05750411731103;
  }
  100% {
    stroke-dasharray: 28.274333882308138 254.46900494077323;
  }
`;

const StyledSpinIcon = styled(SvgIcon)`
  animation: ${rotate} 0.75s linear infinite, ${circleAnimate} 1.5s linear infinite;
`;

export default memoForwardRef<SVGSVGElement, ISvgProps>(
  ({ color = 'currentColor', ...other }: ISvgProps, ref) => (
    <StyledSpinIcon viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" ref={ref} {...other}>
      {/* <circle cx="50" cy="50" r="30" stroke="#ffffcb" strokeWidth="10" fill="none"></circle> */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke={color}
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        transform="rotate(144 50 50)"
      />
    </StyledSpinIcon>
  ),
);
