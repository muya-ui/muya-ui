import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const RightIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M298.667 191.733V834.54a21.333 21.333 0 0033.258 17.685l453.76-306.09a21.333 21.333 0 00.779-34.817l-453.77-336.704a21.333 21.333 0 00-34.027 17.12z" />
  </SvgIcon>
));

export default RightIcon;

export { RightIcon };
