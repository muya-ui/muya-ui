import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const ${ iconName } = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="${ svgData.attributes.viewBox }" {...props}>
    ${ path }
  </SvgIcon>
));

export default ${ iconName };

export { ${ iconName } };
