import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const SpeedIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M354.795 512L170.667 241.675l108.832-71.008L512 512 279.499 853.333l-108.832-71.008L354.795 512zm341.333 0L512 241.675l108.832-71.008L853.333 512 620.832 853.333 512 782.325 696.128 512z" />
  </SvgIcon>
));

export default SpeedIcon;

export { SpeedIcon };
