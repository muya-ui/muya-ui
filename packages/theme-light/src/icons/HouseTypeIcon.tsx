import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const HouseTypeIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M661.333 586.667V672A21.333 21.333 0 01640 693.333H533.333A21.333 21.333 0 01512 672V352a21.333 21.333 0 0121.333-21.333H640A21.333 21.333 0 01661.333 352v85.333H832V192H192v245.333h160a21.333 21.333 0 0121.333 21.334v106.666A21.333 21.333 0 01352 586.667H192V832h640V586.667H661.333zM64 42.667h896A21.333 21.333 0 01981.333 64v896A21.333 21.333 0 01960 981.333H64A21.333 21.333 0 0142.667 960V64A21.333 21.333 0 0164 42.667z" />
  </SvgIcon>
));

export default HouseTypeIcon;

export { HouseTypeIcon };
