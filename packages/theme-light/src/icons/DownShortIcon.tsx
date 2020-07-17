import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const DownShortIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M587.957 619.733v-470.4A21.333 21.333 0 00566.624 128H459.957a21.333 21.333 0 00-21.333 21.333v470.4l-145.45-145.44a21.333 21.333 0 00-30.166 0l-75.424 75.435a21.333 21.333 0 000 30.165l310.624 310.624a21.333 21.333 0 0030.176 0l310.613-310.624a21.333 21.333 0 000-30.165l-75.413-75.435a21.333 21.333 0 00-30.176 0l-145.45 145.451z" />
  </SvgIcon>
));

export default DownShortIcon;

export { DownShortIcon };
