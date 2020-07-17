import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const GuildUpIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M524.01 457.323L899.5 713.088a21.333 21.333 0 0029.866-5.973l83.2-127.52a21.333 21.333 0 00-5.845-29.291l-482.71-328.79a21.333 21.333 0 00-24.02 0L17.28 550.295a21.333 21.333 0 00-5.856 29.29l83.2 127.51a21.333 21.333 0 0029.877 5.973L499.99 457.333a21.333 21.333 0 0124.022 0z" />
  </SvgIcon>
));

export default GuildUpIcon;

export { GuildUpIcon };
