import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const FilterIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M107.563 42.667h802.005a21.333 21.333 0 0116.747 34.56l-273.27 346.026a21.333 21.333 0 00-4.586 13.227v413.728a21.333 21.333 0 01-12.587 19.456l-241.835 108.8a21.333 21.333 0 01-30.08-19.456V436.384a21.333 21.333 0 00-4.48-13.077L90.72 77.077a21.333 21.333 0 0116.853-34.41z" />
  </SvgIcon>
));

export default FilterIcon;

export { FilterIcon };
