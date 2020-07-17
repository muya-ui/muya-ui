import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const InformIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M853.333 704h64a21.333 21.333 0 0121.334 21.333V832a21.333 21.333 0 01-21.334 21.333H106.667A21.333 21.333 0 0185.333 832V725.333A21.333 21.333 0 01106.667 704h64V341.333C170.667 152.821 323.488 0 512 0c188.512 0 341.333 152.821 341.333 341.333V704zm-468.81 213.333h254.944C633.6 977.131 578.773 1024 512 1024s-121.6-46.87-127.477-106.667z" />
  </SvgIcon>
));

export default InformIcon;

export { InformIcon };
