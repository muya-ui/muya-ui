import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const FontbgcolorIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M64 42.667h896A21.333 21.333 0 01981.333 64v896A21.333 21.333 0 01960 981.333H64A21.333 21.333 0 0142.667 960V64A21.333 21.333 0 0164 42.667zM592.832 544H431.168L512 319.072 592.832 544zm53.664 149.333l52.427 145.878a21.333 21.333 0 0020.074 14.122h104a21.333 21.333 0 0020.075-28.544l-229.995-640a21.333 21.333 0 00-20.074-14.122H430.997a21.333 21.333 0 00-20.074 14.122l-229.995 640a21.333 21.333 0 0020.075 28.544h104a21.333 21.333 0 0020.074-14.122l52.416-145.878h268.992z" />
  </SvgIcon>
));

export default FontbgcolorIcon;

export { FontbgcolorIcon };
