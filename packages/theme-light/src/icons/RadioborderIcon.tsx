import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const RadioborderIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M512 960c247.424 0 448-200.576 448-448S759.424 64 512 64 64 264.576 64 512s200.576 448 448 448zm0 64C229.227 1024 0 794.773 0 512S229.227 0 512 0s512 229.227 512 512-229.227 512-512 512z" />
  </SvgIcon>
));

export default RadioborderIcon;

export { RadioborderIcon };
