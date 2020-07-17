import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const SpeedLeftIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M669.205 512l184.128-270.325-108.832-71.008L512 512l232.501 341.333 108.832-71.008L669.205 512zm-341.333 0L512 241.675l-108.832-71.008L170.667 512l232.501 341.333L512 782.325 327.872 512z" />
  </SvgIcon>
));

export default SpeedLeftIcon;

export { SpeedLeftIcon };
