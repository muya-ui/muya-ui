import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const DragIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M373.333 437.333h288V275.797a14.987 14.987 0 0124.128-11.872l322.379 248.32a14.987 14.987 0 01-.544 24.15l-322.39 225.76a14.987 14.987 0 01-23.573-12.267V586.667h-288v162.506a15.605 15.605 0 01-24.394 12.907L18.08 537.003a15.605 15.605 0 01-.565-25.408L348.373 264.02a15.605 15.605 0 0124.96 12.48v160.832z" />
  </SvgIcon>
));

export default DragIcon;

export { DragIcon };
