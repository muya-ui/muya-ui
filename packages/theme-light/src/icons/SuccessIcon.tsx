import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const SuccessIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M436.576 574.933l-105.6-105.6a21.333 21.333 0 00-30.165 0l-60.342 60.342a21.333 21.333 0 000 30.165l181.014 181.013c4.17 4.171 9.632 6.262 15.093 6.262s10.923-2.091 15.083-6.251L783.53 408.992a21.333 21.333 0 000-30.165l-60.342-60.342a21.333 21.333 0 00-30.165 0L436.576 574.923zM512 1024C229.227 1024 0 794.773 0 512S229.227 0 512 0s512 229.227 512 512-229.227 512-512 512z" />
  </SvgIcon>
));

export default SuccessIcon;

export { SuccessIcon };
