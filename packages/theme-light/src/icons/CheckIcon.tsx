import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const CheckIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M768 42.667c117.824 0 213.333 95.509 213.333 213.333v512c0 117.824-95.509 213.333-213.333 213.333H256c-117.824 0-213.333-95.509-213.333-213.333V256c0-117.824 95.509-213.333 213.333-213.333h512zm0 64H256c-81.365 0-147.52 65.066-149.301 145.994l-.032 3.339v512c0 81.365 65.066 147.52 145.994 149.301l3.339.032h512c81.365 0 147.52-65.066 149.301-145.994l.032-3.339V256c0-81.365-65.066-147.52-145.994-149.301l-3.339-.032z" />
  </SvgIcon>
));

export default CheckIcon;

export { CheckIcon };
