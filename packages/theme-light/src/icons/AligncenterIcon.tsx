import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const AligncenterIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M723.134 443.381a21.113 21.113 0 0121.113 21.114v105.567a21.113 21.113 0 01-21.113 21.113H300.866a21.113 21.113 0 01-21.113-21.113V464.495a21.113 21.113 0 0121.113-21.114h422.268zm137.237 348.372a21.113 21.113 0 0121.114 21.113v105.567a21.113 21.113 0 01-21.114 21.113H163.63a21.113 21.113 0 01-21.114-21.113V812.866a21.113 21.113 0 0121.114-21.113h696.74zm95.01-696.743a21.113 21.113 0 0121.114 21.114V221.69a21.113 21.113 0 01-21.114 21.113H68.62a21.113 21.113 0 01-21.114-21.113V116.124A21.113 21.113 0 0168.62 95.01h886.76z" />
  </SvgIcon>
));

export default AligncenterIcon;

export { AligncenterIcon };
