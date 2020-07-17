import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const BreadcrumbsIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M225.835 93.259l77.29-78.091a21.29 21.29 0 0130.144-.128l478.187 475.125a21.29 21.29 0 010 30.208L319.723 1008.96a21.29 21.29 0 01-30.155-.128l-77.28-78.08a21.29 21.29 0 01.117-30.09l382.752-380.289a21.29 21.29 0 000-30.208L225.963 123.34a21.29 21.29 0 01-.128-30.08z" />
  </SvgIcon>
));

export default BreadcrumbsIcon;

export { BreadcrumbsIcon };
