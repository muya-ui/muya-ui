import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const LocationIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M512 1024C239.85 819.2 106.667 620.427 106.667 421.653 106.667 186.72 286.176 0 512 0s405.333 186.73 405.333 421.653C917.333 620.416 784.15 819.2 512 1024zm0-490.667c70.688 0 128-57.312 128-128s-57.312-128-128-128-128 57.312-128 128 57.312 128 128 128z" />
  </SvgIcon>
));

export default LocationIcon;

export { LocationIcon };
