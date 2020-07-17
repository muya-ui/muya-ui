import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const StarsIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M517.28 884.16L200.587 992l10.549-334.293L0 388.096l327.253-97.067L506.72 10.667 696.747 291.05 1024 388.107 812.864 657.696 823.424 992z" />
  </SvgIcon>
));

export default StarsIcon;

export { StarsIcon };
