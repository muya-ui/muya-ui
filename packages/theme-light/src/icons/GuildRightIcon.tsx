import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const GuildRightIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M522.187 499.81L262.15 118.426a21.67 21.67 0 015.959-30.121L398.128 3.792a21.67 21.67 0 0129.796 5.851l333.82 490.168a21.67 21.67 0 010 24.378l-333.929 490.276a21.67 21.67 0 01-29.795 5.96l-129.477-84.512a21.67 21.67 0 01-6.284-30.013l260.036-381.386a21.67 21.67 0 00-.108-24.703z" />
  </SvgIcon>
));

export default GuildRightIcon;

export { GuildRightIcon };
