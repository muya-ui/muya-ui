import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const EditIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M938.667 512V234.667v682.666a21.333 21.333 0 01-21.334 21.334H106.667a21.333 21.333 0 01-21.334-21.334V106.667a21.333 21.333 0 0121.334-21.334H512v149.334H234.667v554.666h554.666V512h149.334zM825.312 96l105.6 105.6-377.323 377.312L448 473.312z" />
  </SvgIcon>
));

export default EditIcon;

export { EditIcon };
