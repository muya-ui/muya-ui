import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const AlignmentIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M960 437.333a21.333 21.333 0 0121.333 21.334v106.666A21.333 21.333 0 01960 586.667H64a21.333 21.333 0 01-21.333-21.334V458.667A21.333 21.333 0 0164 437.333h896zm0 352a21.333 21.333 0 0121.333 21.334v106.666A21.333 21.333 0 01960 938.667H64a21.333 21.333 0 01-21.333-21.334V810.667A21.333 21.333 0 0164 789.333h896zm0-704a21.333 21.333 0 0121.333 21.334v106.666A21.333 21.333 0 01960 234.667H64a21.333 21.333 0 01-21.333-21.334V106.667A21.333 21.333 0 0164 85.333h896z" />
  </SvgIcon>
));

export default AlignmentIcon;

export { AlignmentIcon };
