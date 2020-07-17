import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const AdditionIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M576 448V298.667a21.333 21.333 0 00-21.333-21.334h-85.334A21.333 21.333 0 00448 298.667V448H298.667a21.333 21.333 0 00-21.334 21.333v85.334A21.333 21.333 0 00298.667 576H448v149.333a21.333 21.333 0 0021.333 21.334h85.334A21.333 21.333 0 00576 725.333V576h149.333a21.333 21.333 0 0021.334-21.333v-85.334A21.333 21.333 0 00725.333 448H576zm-64 576C229.227 1024 0 794.773 0 512S229.227 0 512 0s512 229.227 512 512-229.227 512-512 512z" />
  </SvgIcon>
));

export default AdditionIcon;

export { AdditionIcon };
