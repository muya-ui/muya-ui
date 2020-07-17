import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const GuildDownIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M499.99 566.677L124.5 310.912a21.333 21.333 0 00-29.866 5.973l-83.2 127.52a21.333 21.333 0 005.845 29.291l482.71 328.79a21.333 21.333 0 0024.02 0l482.71-328.78a21.333 21.333 0 005.856-29.29l-83.2-127.51a21.333 21.333 0 00-29.877-5.973L524.01 566.667a21.333 21.333 0 01-24.022 0z" />
  </SvgIcon>
));

export default GuildDownIcon;

export { GuildDownIcon };
