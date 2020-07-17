import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const StarIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M517.867 771.275l194.026 68.352-6.858-217.238 138.304-176.608-213.494-63.317-120.576-177.92-113.6 177.472-215.008 63.765L318.965 622.4l-6.912 218.976 205.814-70.08zm-.587 112.885L200.587 992l10.549-334.293L0 388.096l327.253-97.067L506.72 10.667 696.747 291.05 1024 388.107 812.864 657.696 823.424 992 517.28 884.16z" />
  </SvgIcon>
));

export default StarIcon;

export { StarIcon };
