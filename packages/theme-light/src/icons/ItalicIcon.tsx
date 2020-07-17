import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const ItalicIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M437.333 42.667H736q21.333 0 21.333 21.333v85.333q0 21.334-21.333 21.334H437.333q-21.333 0-21.333-21.334V64q0-21.333 21.333-21.333zM288 853.333h298.667A21.333 21.333 0 01608 874.667V960a21.333 21.333 0 01-21.333 21.333H288A21.333 21.333 0 01266.667 960v-85.333A21.333 21.333 0 01288 853.333zm74.667 2.838v125.162H512V871.83l149.333-704V42.667H512V152.17z" />
  </SvgIcon>
));

export default ItalicIcon;

export { ItalicIcon };
