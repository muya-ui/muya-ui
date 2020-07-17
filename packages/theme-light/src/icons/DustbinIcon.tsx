import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const DustbinIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M192 320h640a21.333 21.333 0 0121.333 21.333v661.334A21.333 21.333 0 01832 1024H192a21.333 21.333 0 01-21.333-21.333V341.333A21.333 21.333 0 01192 320zm384 192v341.333h128V512H576zm-256 0v341.333h128V512H320zM661.333 85.333h245.334A21.333 21.333 0 01928 106.667v106.666a21.333 21.333 0 01-21.333 21.334H96a21.333 21.333 0 01-21.333-21.334V106.667A21.333 21.333 0 0196 85.333h266.667v-64A21.333 21.333 0 01384 0h256a21.333 21.333 0 0121.333 21.333v64z" />
  </SvgIcon>
));

export default DustbinIcon;

export { DustbinIcon };
