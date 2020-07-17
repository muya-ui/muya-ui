import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const AlignlightIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M960 437.333a21.333 21.333 0 0121.333 21.334v106.666A21.333 21.333 0 01960 586.667H533.333A21.333 21.333 0 01512 565.333V458.667a21.333 21.333 0 0121.333-21.334H960zm0 352a21.333 21.333 0 0121.333 21.334v106.666A21.333 21.333 0 01960 938.667H256a21.333 21.333 0 01-21.333-21.334V810.667A21.333 21.333 0 01256 789.333h704zm0-704a21.333 21.333 0 0121.333 21.334v106.666A21.333 21.333 0 01960 234.667H64a21.333 21.333 0 01-21.333-21.334V106.667A21.333 21.333 0 0164 85.333h896z" />
  </SvgIcon>
));

export default AlignlightIcon;

export { AlignlightIcon };
