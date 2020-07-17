import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const SentIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M333.888 690.112l362.027-362.027L258.453 614.7 32.267 388.49a21.45 21.45 0 018.384-35.52l904.842-301.6a21.45 21.45 0 0127.136 27.136L671.02 983.339a21.45 21.45 0 01-35.52 8.384l-157.44-157.43a21.333 21.333 0 00-29.494-.64l-78.933 72.288a21.333 21.333 0 01-35.744-15.733V690.112z" />
  </SvgIcon>
));

export default SentIcon;

export { SentIcon };
