import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const CheckboxIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M768 42.667c117.824 0 213.333 95.509 213.333 213.333v512c0 117.824-95.509 213.333-213.333 213.333H256c-117.824 0-213.333-95.509-213.333-213.333V256c0-117.824 95.509-213.333 213.333-213.333h512zm15.53 366.325a21.333 21.333 0 000-30.165l-60.34-60.342a21.333 21.333 0 00-30.166 0L436.565 574.923l-105.589-105.59a21.333 21.333 0 00-28.8-1.248l-1.376 1.248-60.341 60.342a21.333 21.333 0 000 30.165l181.013 181.013a21.27 21.27 0 0014.23 6.24h1.727l1.707-.138a21.237 21.237 0 0012.512-6.091z" />
  </SvgIcon>
));

export default CheckboxIcon;

export { CheckboxIcon };
