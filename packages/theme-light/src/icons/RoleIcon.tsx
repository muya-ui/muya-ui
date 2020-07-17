import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const RoleIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M517.707 533.333c-141.206 0-251.04-109.834-251.04-239.626 0-141.206 109.834-251.04 251.04-251.04 129.792 0 239.626 109.834 239.626 251.04 0 129.792-109.834 239.626-239.626 239.626zm-251.04 64l101.408 263.659a21.333 21.333 0 0019.914 13.675h248.022a21.333 21.333 0 0019.914-13.675l101.408-263.659H896a85.333 85.333 0 0185.333 85.334V960A21.333 21.333 0 01960 981.333H64A21.333 21.333 0 0142.667 960V682.667A85.333 85.333 0 01128 597.333h138.667zm170.666 0h149.334l-19.414 194.123a21.333 21.333 0 01-21.226 19.21h-68.054a21.333 21.333 0 01-21.226-19.21l-19.414-194.123z" />
  </SvgIcon>
));

export default RoleIcon;

export { RoleIcon };
