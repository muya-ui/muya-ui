import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const ClockIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M512 106.667c-223.861 0-405.333 181.472-405.333 405.333S288.139 917.333 512 917.333 917.333 735.861 917.333 512 735.861 106.667 512 106.667zM512 0c282.773 0 512 229.227 512 512s-229.227 512-512 512S0 794.773 0 512 229.227 0 512 0zm53.333 521.91l164.864 164.863-75.424 75.414-196.106-196.854v-320h106.666V521.91z" />
  </SvgIcon>
));

export default ClockIcon;

export { ClockIcon };
