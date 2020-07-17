import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const FoldIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M832.267 277.333H189.46a21.333 21.333 0 00-17.685 33.259l306.09 453.76a21.333 21.333 0 0034.817.779L849.387 311.36a21.333 21.333 0 00-17.12-34.027z" />
  </SvgIcon>
));

export default FoldIcon;

export { FoldIcon };
