import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const SelectIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M407.787 619.136l454.517-448.47 119.03 116.96-558.4 550.945a21.333 21.333 0 01-29.931.032L42.667 494.1l118.826-117.16 246.294 242.197z" />
  </SvgIcon>
));

export default SelectIcon;

export { SelectIcon };
