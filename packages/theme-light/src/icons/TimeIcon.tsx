import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const TimeIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M576 448V234.667a21.333 21.333 0 00-21.333-21.334h-85.334A21.333 21.333 0 00448 234.667v320A21.333 21.333 0 00469.333 576h320a21.333 21.333 0 0021.334-21.333v-85.334A21.333 21.333 0 00789.333 448H576zm-64 576C229.227 1024 0 794.773 0 512S229.227 0 512 0s512 229.227 512 512-229.227 512-512 512z" />
  </SvgIcon>
));

export default TimeIcon;

export { TimeIcon };
