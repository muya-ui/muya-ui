import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const PaixuIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M782.336 436.81H246.199a18.578 18.578 0 01-15.653-28.746L485.888 13.751a18.578 18.578 0 0130.72-.732l280.869 394.387a18.578 18.578 0 01-15.141 29.403zm0 154.038H246.199a18.578 18.578 0 00-15.653 28.672l255.342 394.386a18.578 18.578 0 0030.72.732l280.869-394.46a18.578 18.578 0 00-15.141-29.33z" />
  </SvgIcon>
));

export default PaixuIcon;

export { PaixuIcon };
