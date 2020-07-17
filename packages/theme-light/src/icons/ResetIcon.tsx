import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const ResetIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M232.437 533.333c35.2 194.528 205.366 341.334 409.206 341.334V1024c-307.371 0-558.4-245.632-565.088-552.928L74.667 384h289.642v149.333H232.427zm140.896-384V0c307.371 0 558.4 245.632 565.078 552.928L940.309 640H650.667V490.667h131.872c-35.211-194.528-205.366-341.334-409.206-341.334z" />
  </SvgIcon>
));

export default ResetIcon;

export { ResetIcon };
