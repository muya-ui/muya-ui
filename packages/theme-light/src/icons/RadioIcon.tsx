import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const RadioIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M512 1024C229.227 1024 0 794.773 0 512S229.227 0 512 0s512 229.227 512 512-229.227 512-512 512zm0-341.333c94.261 0 170.667-76.406 170.667-170.667S606.26 341.333 512 341.333 341.333 417.74 341.333 512 417.74 682.667 512 682.667z" />
  </SvgIcon>
));

export default RadioIcon;

export { RadioIcon };
