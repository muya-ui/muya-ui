import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const NextYearIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M706.379 499.81L446.343 118.426a21.67 21.67 0 015.634-30.121L581.995 3.792a21.67 21.67 0 0129.796 5.851l334.146 490.168a21.67 21.67 0 010 24.378l-333.93 490.276a21.67 21.67 0 01-29.795 5.96l-130.018-84.512a21.67 21.67 0 01-6.284-30.013l260.036-381.386a21.67 21.67 0 00.433-24.703zm-368.384 0L77.959 118.426a21.67 21.67 0 015.959-30.121L213.936 3.792a21.67 21.67 0 0129.796 5.851l333.82 490.168a21.67 21.67 0 010 24.378l-333.929 490.276a21.67 21.67 0 01-29.796 5.96L84.351 935.913a21.67 21.67 0 01-6.284-30.013l260.036-381.386a21.67 21.67 0 00-.108-24.703z" />
  </SvgIcon>
));

export default NextYearIcon;

export { NextYearIcon };
