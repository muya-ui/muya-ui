import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const RotateIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M725.333 557.323a21.333 21.333 0 0121.334 21.333v384a21.333 21.333 0 01-21.334 21.333H106.667a21.333 21.333 0 01-21.334-21.333v-384a21.333 21.333 0 0121.334-21.333h618.666zm-128 149.333H234.667v128h362.666v-128zM553.6 422.379L448 527.979l-263.99-264L448 0l105.6 105.6-89.067 89.045h57.323c246.55 0 448.043 191.254 452.053 430.08l.064 7.254V785.29H824.64V631.989c0-156.8-132.224-285.408-297.75-287.968l-5.034-.032-46.656-.01 78.4 78.4z" />
  </SvgIcon>
));

export default RotateIcon;

export { RotateIcon };
