import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const ArrangeIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M437.44 732.363V960a21.333 21.333 0 01-36.032 15.467L49.493 641.163a21.333 21.333 0 0114.688-36.8h223.926v-544a21.333 21.333 0 0121.333-21.334h106.667a21.333 21.333 0 0121.333 21.334v672zM586.667 288V60.363a21.333 21.333 0 0136.021-15.467L974.592 379.2a21.333 21.333 0 01-14.688 36.8H736v544a21.333 21.333 0 01-21.333 21.333H608A21.333 21.333 0 01586.667 960V288z" />
  </SvgIcon>
));

export default ArrangeIcon;

export { ArrangeIcon };
