import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const UpShortIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M587.957 405.013v470.411a21.333 21.333 0 01-21.333 21.333H459.957a21.333 21.333 0 01-21.333-21.333v-470.4l-145.45 145.45a21.333 21.333 0 01-30.166 0l-75.424-75.423a21.333 21.333 0 010-30.176L498.208 134.25a21.333 21.333 0 0130.176 0l310.613 310.624a21.333 21.333 0 010 30.176l-75.413 75.413a21.333 21.333 0 01-30.176 0l-145.45-145.43z" />
  </SvgIcon>
));

export default UpShortIcon;

export { UpShortIcon };
