import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const MinusIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M64 437.333h896q21.333 0 21.333 21.334v106.666q0 21.334-21.333 21.334H64q-21.333 0-21.333-21.334V458.667q0-21.334 21.333-21.334z" />
  </SvgIcon>
));

export default MinusIcon;

export { MinusIcon };
