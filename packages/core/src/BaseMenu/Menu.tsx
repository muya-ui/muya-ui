import React, { Ref, useMemo } from 'react';

import useTheme from '../utils/useTheme';
import { StyledBaseMenu, StyledBaseMenuWrapper } from './styled';
import { IBaseMenuProps } from './types';
import { getMenuItemCountFromChildren } from './utils';

const Menu = React.forwardRef((props: IBaseMenuProps, ref: Ref<HTMLDivElement>) => {
  const { maxItemCountPerPage, width, size, children, onScroll, ...restProps } = props;
  const theme = useTheme();
  const hasScrollBar = useMemo(() => {
    if (maxItemCountPerPage) {
      let count = getMenuItemCountFromChildren(children);
      return count > maxItemCountPerPage;
    } else {
      return false;
    }
  }, [children, maxItemCountPerPage]);
  const wrapperWidth = useMemo(() => {
    if (width && typeof width === 'object') {
      return width[size!];
    } else {
      return width;
    }
  }, [size, width]);

  return (
    <StyledBaseMenu
      ref={ref}
      theme={theme}
      $size={size}
      $width={wrapperWidth}
      $hasScrollBar={hasScrollBar}
      $maxItemCountPerPage={maxItemCountPerPage}
      {...restProps}
    >
      <StyledBaseMenuWrapper onScroll={onScroll}>{children}</StyledBaseMenuWrapper>
    </StyledBaseMenu>
  );
});

Menu.defaultProps = {
  size: 'm',
};

export default React.memo(Menu);
