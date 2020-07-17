import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const LeftIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M746.667 191.733V834.54a21.333 21.333 0 01-33.259 17.685l-453.76-306.09a21.333 21.333 0 01-.779-34.817L712.64 174.613a21.333 21.333 0 0134.027 17.12z" />
  </SvgIcon>
));

export default LeftIcon;

export { LeftIcon };
