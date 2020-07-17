import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const PicIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M968.48 936.917a21.259 21.259 0 01-8.48 1.75H785.173L663.296 816.8l92.533-92.544L968.48 936.917zm12.853-198.357L755.84 513.067 557.707 711.189 199.573 353.077 42.667 509.973V106.667A21.333 21.333 0 0164 85.333h896a21.333 21.333 0 0121.333 21.334V738.57zm-407.36 200.107H64a21.333 21.333 0 01-21.333-21.334v-196.16l156.906-156.906 374.4 374.4zM736 405.333A74.667 74.667 0 10736 256a74.667 74.667 0 000 149.333z" />
  </SvgIcon>
));

export default PicIcon;

export { PicIcon };
