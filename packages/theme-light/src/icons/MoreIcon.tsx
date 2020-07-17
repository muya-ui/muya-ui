import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const MoreIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M448 426.667h128q21.333 0 21.333 21.333v128q0 21.333-21.333 21.333H448q-21.333 0-21.333-21.333V448q0-21.333 21.333-21.333zm-384 0h128q21.333 0 21.333 21.333v128q0 21.333-21.333 21.333H64q-21.333 0-21.333-21.333V448q0-21.333 21.333-21.333zm768 0h128q21.333 0 21.333 21.333v128q0 21.333-21.333 21.333H832q-21.333 0-21.333-21.333V448q0-21.333 21.333-21.333z" />
  </SvgIcon>
));

export default MoreIcon;

export { MoreIcon };
