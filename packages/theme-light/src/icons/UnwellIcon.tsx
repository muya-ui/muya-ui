import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const UnwellIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M512 1024C229.227 1024 0 794.773 0 512S229.227 0 512 0s512 229.227 512 512-229.227 512-512 512zm91.317-284.8a53.333 53.333 0 0094.72-49.067C662.048 620.651 590.987 576 512.011 576c-78.976 0-150.038 44.64-186.027 114.133a53.333 53.333 0 0094.72 49.067c17.92-34.635 52.8-56.533 91.307-56.533 38.506 0 73.386 21.898 91.306 56.533zM362.667 448a64 64 0 100-128 64 64 0 000 128zm298.666 0a64 64 0 100-128 64 64 0 000 128z" />
  </SvgIcon>
));

export default UnwellIcon;

export { UnwellIcon };
