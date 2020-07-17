import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const PhoneIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M308.117 56.565l77.814 212.79a21.013 21.013 0 01-1.174 17.077l-63.989 120.459a665.664 665.664 0 00297.877 293.653l18.667 9.216 119.157-64a21.013 21.013 0 0117.856-.96l193.814 78.72a21.163 21.163 0 0112.426 25.237L920.512 965.91a21.013 21.013 0 01-24.128 15.062c-219.776-41.216-407.712-139.926-563.84-296.107C176.469 528.714 79.957 344.597 42.987 132.501a21.013 21.013 0 0114.837-23.786l224.523-65.216a21.163 21.163 0 0125.77 13.056z" />
  </SvgIcon>
));

export default PhoneIcon;

export { PhoneIcon };
