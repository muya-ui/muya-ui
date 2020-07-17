import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const CopyIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M960 42.667A21.333 21.333 0 01981.333 64v725.333A21.333 21.333 0 01960 810.667H768V960a21.333 21.333 0 01-21.333 21.333H64A21.333 21.333 0 0142.667 960V277.333A21.333 21.333 0 0164 256h149.333V64a21.333 21.333 0 0121.334-21.333H960zM618.667 405.333H192V832h426.667V405.333zM832 192H362.667v64h384A21.333 21.333 0 01768 277.333v384h64V192z" />
  </SvgIcon>
));

export default CopyIcon;

export { CopyIcon };
