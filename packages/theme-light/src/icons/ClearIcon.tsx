import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const ClearIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M602.507 512L730.73 383.787a21.333 21.333 0 000-30.187l-60.342-60.33a21.333 21.333 0 00-30.165 0L512 421.482 383.787 293.269a21.333 21.333 0 00-30.187 0l-60.33 60.342a21.333 21.333 0 000 30.165L421.482 512 293.269 640.213a21.333 21.333 0 000 30.187l60.342 60.33a21.333 21.333 0 0030.165 0L512 602.518l128.213 128.214a21.333 21.333 0 0030.187 0l60.33-60.342a21.333 21.333 0 000-30.165L602.518 512zM512 1024C229.227 1024 0 794.773 0 512S229.227 0 512 0s512 229.227 512 512-229.227 512-512 512z" />
  </SvgIcon>
));

export default ClearIcon;

export { ClearIcon };
