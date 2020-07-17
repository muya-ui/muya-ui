import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const TelephoneIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M917.333 0a21.333 21.333 0 0121.334 21.333v981.334A21.333 21.333 0 01917.333 1024H106.667a21.333 21.333 0 01-21.334-21.333V21.333A21.333 21.333 0 01106.667 0h810.666zM512 746.667A74.667 74.667 0 10512 896a74.667 74.667 0 000-149.333zm277.333-597.334H234.667V672h554.666V149.333z" />
  </SvgIcon>
));

export default TelephoneIcon;

export { TelephoneIcon };
