import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const HalfcheckboxIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M768 42.667c117.824 0 213.333 95.509 213.333 213.333v512c0 117.824-95.509 213.333-213.333 213.333H256c-117.824 0-213.333-95.509-213.333-213.333V256c0-117.824 95.509-213.333 213.333-213.333h512zM789.333 448H234.667a21.333 21.333 0 00-21.334 21.333v85.334A21.333 21.333 0 00234.667 576h554.666a21.333 21.333 0 0021.334-21.333v-85.334A21.333 21.333 0 00789.333 448z" />
  </SvgIcon>
));

export default HalfcheckboxIcon;

export { HalfcheckboxIcon };
