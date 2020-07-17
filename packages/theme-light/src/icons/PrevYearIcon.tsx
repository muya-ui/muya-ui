import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const PrevYearIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M577.19 905.575L317.154 524.19a21.67 21.67 0 010-24.378L577.19 118.425a21.67 21.67 0 00-5.743-30.121l-129.8-84.729a21.67 21.67 0 00-29.797 5.851L77.92 499.811a21.67 21.67 0 000 24.378l333.93 490.276a21.67 21.67 0 0029.796 5.96l129.476-84.512a21.67 21.67 0 006.285-30.013z" />
    <path d="M945.574 905.575L685.538 524.19a21.67 21.67 0 010-24.378l260.036-381.386a21.67 21.67 0 00-5.742-30.121L809.814 3.792a21.67 21.67 0 00-29.796 5.851L446.305 499.811a21.67 21.67 0 000 24.378l333.93 490.276a21.67 21.67 0 0029.795 5.96l130.018-84.512a21.67 21.67 0 006.285-30.013z" />
  </SvgIcon>
));

export default PrevYearIcon;

export { PrevYearIcon };
