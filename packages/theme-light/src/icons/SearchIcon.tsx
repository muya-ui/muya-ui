import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const SearchIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M657.813 551.541L975.04 868.78c8.384 8.384 8.384 21.973 0 30.368l-75.893 75.904a21.472 21.472 0 01-30.368 0L551.552 657.803a331.2 331.2 0 01-176.128 50.378c-183.787 0-332.757-148.981-332.757-332.757 0-183.787 148.981-332.757 332.757-332.757s332.757 148.981 332.757 332.757a331.2 331.2 0 01-50.378 176.117zM375.424 557.9c100.779 0 182.475-81.696 182.475-182.475S476.203 192.94 375.424 192.94s-182.485 81.706-182.485 182.485S274.645 557.9 375.424 557.9z" />
  </SvgIcon>
));

export default SearchIcon;

export { SearchIcon };
