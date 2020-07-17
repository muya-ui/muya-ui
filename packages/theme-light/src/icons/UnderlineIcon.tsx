import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const UnderlineIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M181.333 64a21.333 21.333 0 0121.334-21.333h106.666A21.333 21.333 0 01330.667 64v394.667C330.667 558.816 411.85 640 512 640s181.333-81.184 181.333-181.333V64a21.333 21.333 0 0121.334-21.333h106.666A21.333 21.333 0 01842.667 64v394.667c0 182.613-148.054 330.666-330.667 330.666-182.613 0-330.667-148.053-330.667-330.666V64zM128 874.667h768A21.333 21.333 0 01917.333 896v64A21.333 21.333 0 01896 981.333H128A21.333 21.333 0 01106.667 960v-64A21.333 21.333 0 01128 874.667z" />
  </SvgIcon>
));

export default UnderlineIcon;

export { UnderlineIcon };
