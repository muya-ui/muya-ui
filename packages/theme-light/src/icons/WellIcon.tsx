import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const WellIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M512 1024C229.227 1024 0 794.773 0 512S229.227 0 512 0s512 229.227 512 512-229.227 512-512 512zm91.317-419.179c-17.92 34.624-52.8 56.523-91.306 56.523-38.507 0-73.387-21.899-91.307-56.533a53.333 53.333 0 00-94.72 49.066C361.974 723.36 433.034 768 512.011 768c78.976 0 150.037-44.64 186.026-114.133a53.333 53.333 0 00-94.72-49.067zM362.667 448a64 64 0 100-128 64 64 0 000 128zm298.666 0a64 64 0 100-128 64 64 0 000 128z" />
  </SvgIcon>
));

export default WellIcon;

export { WellIcon };
