import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const TopIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M512 203.733l276.8 276.8-105.6 105.6-96.533-96.533V960a21.333 21.333 0 01-19.734 21.28l-1.6.053H458.667A21.333 21.333 0 01437.333 960V489.579L340.8 586.133l-105.6-105.6 276.8-276.8zM896 42.667A21.333 21.333 0 01917.333 64v106.667A21.333 21.333 0 01896 192H128a21.333 21.333 0 01-21.333-21.333V64A21.333 21.333 0 01128 42.667h768z" />
  </SvgIcon>
));

export default TopIcon;

export { TopIcon };
