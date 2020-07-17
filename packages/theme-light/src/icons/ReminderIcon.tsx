import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const ReminderIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M512 1024C229.227 1024 0 794.773 0 512S229.227 0 512 0s512 229.227 512 512-229.227 512-512 512zm-42.667-426.667h85.334A21.333 21.333 0 00576 576V234.667a21.333 21.333 0 00-21.333-21.334h-85.334A21.333 21.333 0 00448 234.667V576a21.333 21.333 0 0021.333 21.333zm0 213.334h85.334A21.333 21.333 0 00576 789.333V704a21.333 21.333 0 00-21.333-21.333h-85.334A21.333 21.333 0 00448 704v85.333a21.333 21.333 0 0021.333 21.334z" />
  </SvgIcon>
));

export default ReminderIcon;

export { ReminderIcon };
