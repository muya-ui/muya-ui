import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const SpeedDownIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M512 354.795L241.675 170.667l-71.008 108.832L512 512l341.333-232.501-71.008-108.832L512 354.795zm0 341.333L241.675 512l-71.008 108.832L512 853.333l341.333-232.501L782.325 512 512 696.128z" />
  </SvgIcon>
));

export default SpeedDownIcon;

export { SpeedDownIcon };
