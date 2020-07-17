import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const GuildLeftIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M501.725 499.81l260.036-381.385a21.67 21.67 0 00-5.742-30.121L626 3.575a21.67 21.67 0 00-29.796 5.851l-333.93 490.385a21.67 21.67 0 000 24.378l333.93 490.276a21.67 21.67 0 0029.796 5.96l129.476-84.512a21.67 21.67 0 006.284-30.013L501.725 524.514a21.67 21.67 0 010-24.703z" />
  </SvgIcon>
));

export default GuildLeftIcon;

export { GuildLeftIcon };
