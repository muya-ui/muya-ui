import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const FontcolorIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M604.117 426.667L512 183.467l-92.117 243.2h184.234zM660.683 576H363.317l-59.434 156.885a21.333 21.333 0 01-19.936 13.782H180.235a21.333 21.333 0 01-19.947-28.886L410.795 56.448a21.333 21.333 0 0119.925-13.781h162.56a21.333 21.333 0 0119.947 13.781l250.506 661.333a21.333 21.333 0 01-19.957 28.886H740.053a21.333 21.333 0 01-19.946-13.782L660.683 576zM106.667 832h810.666a21.333 21.333 0 0121.334 21.333V960a21.333 21.333 0 01-21.334 21.333H106.667A21.333 21.333 0 0185.333 960V853.333A21.333 21.333 0 01106.667 832z" />
  </SvgIcon>
));

export default FontcolorIcon;

export { FontcolorIcon };
