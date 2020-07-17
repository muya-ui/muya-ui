import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const ShareIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M341.333 85.333v149.334H234.667v554.666h554.666V682.667h149.334v234.666a21.333 21.333 0 01-21.334 21.334H106.667a21.333 21.333 0 01-21.334-21.334V106.667a21.333 21.333 0 0121.334-21.334h234.666zm576 0a21.333 21.333 0 0121.334 21.334V512H789.333V348.139L547.381 590.112l-105.6-105.6 249.846-249.845H512V85.333h405.333z" />
  </SvgIcon>
));

export default ShareIcon;

export { ShareIcon };
