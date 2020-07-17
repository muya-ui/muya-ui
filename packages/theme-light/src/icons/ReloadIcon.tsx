import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const ReloadIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M732.213 279.765A319.36 319.36 0 00512 192c-176.736 0-320 143.264-320 320s143.264 320 320 320a318.72 318.72 0 00226.56-94.005l105.707 105.461A468.01 468.01 0 01512 981.333C252.8 981.333 42.667 771.2 42.667 512S252.8 42.667 512 42.667a468.587 468.587 0 01325.835 131.477l94.474-94.485a14.101 14.101 0 0123.958 8.149l49.493 379.584a14.101 14.101 0 01-16.448 15.712l-364.587-64.49a14.101 14.101 0 01-7.509-23.862l114.997-114.987z" />
  </SvgIcon>
));

export default ReloadIcon;

export { ReloadIcon };
