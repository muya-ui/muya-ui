import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const CloseIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M512 421.653L871.04 62.592l90.517 90.507-359.04 359.04 358.87 358.901-90.507 90.517L512 602.667 154.507 960.16 64 869.643 421.493 512.16 63.84 154.507 154.357 64 512 421.653z" />
  </SvgIcon>
));

export default CloseIcon;

export { CloseIcon };
