import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const TagIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M21.333 85.333h981.334A21.333 21.333 0 011024 106.667v810.666a21.333 21.333 0 01-21.333 21.334H21.333A21.333 21.333 0 010 917.333V106.667a21.333 21.333 0 0121.333-21.334zM192 256a21.333 21.333 0 00-21.333 21.333v85.334A21.333 21.333 0 00192 384h277.333a21.333 21.333 0 0021.334-21.333v-85.334A21.333 21.333 0 00469.333 256H192zm0 256a21.333 21.333 0 00-21.333 21.333v85.334A21.333 21.333 0 00192 640h448a21.333 21.333 0 0021.333-21.333v-85.334A21.333 21.333 0 00640 512H192z" />
  </SvgIcon>
));

export default TagIcon;

export { TagIcon };
