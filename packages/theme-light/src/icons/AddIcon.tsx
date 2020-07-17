import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const AddIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M437.333 437.333V64a21.333 21.333 0 0121.334-21.333h106.666A21.333 21.333 0 01586.667 64v373.333H960a21.333 21.333 0 0121.333 21.334v106.666A21.333 21.333 0 01960 586.667H586.667V960a21.333 21.333 0 01-21.334 21.333H458.667A21.333 21.333 0 01437.333 960V586.667H64a21.333 21.333 0 01-21.333-21.334V458.667A21.333 21.333 0 0164 437.333h373.333z" />
  </SvgIcon>
));

export default AddIcon;

export { AddIcon };
