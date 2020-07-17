import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const SpeedTopIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M512 669.205l270.325 184.128 71.008-108.832L512 512 170.667 744.501l71.008 108.832L512 669.205zm0-341.333L782.325 512l71.008-108.832L512 170.667 170.667 403.168 241.675 512 512 327.872z" />
  </SvgIcon>
));

export default SpeedTopIcon;

export { SpeedTopIcon };
