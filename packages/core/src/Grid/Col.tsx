import React, { Ref, useMemo } from 'react';

import useStyles from '../utils/useStyles';
import { useRow } from './RowContext';
import { StyledCol } from './styled';
import { IColProps } from './types';
import { getBreakpointProp, getResponsiveProp } from './utils';

const Col = React.forwardRef((props: IColProps, ref: Ref<HTMLDivElement>) => {
  const {
    children,
    span,
    order,
    offset,
    push,
    pull,
    styles,
    className,
    style,
    ...restProps
  } = props;
  const innerStyles = useStyles(
    'col',
    {
      wrapper: '',
    },
    styles,
  );
  const { gutter, breakpoint, equalNum } = useRow();
  const sizeProps = useMemo(() => {
    return {
      span: getResponsiveProp(getBreakpointProp(props, 'span'), breakpoint),
      order: getResponsiveProp(getBreakpointProp(props, 'order'), breakpoint),
      pull: getResponsiveProp(getBreakpointProp(props, 'pull'), breakpoint),
      push: getResponsiveProp(getBreakpointProp(props, 'push'), breakpoint),
      offset: getResponsiveProp(getBreakpointProp(props, 'offset'), breakpoint),
    };
  }, [breakpoint, props]);
  return (
    <StyledCol
      {...restProps}
      className={[innerStyles.wrapper.className, className].join(' ').trim()}
      style={{ ...innerStyles.wrapper.style, ...style }}
      ref={ref}
      $gutter={gutter!}
      $equalNum={equalNum}
      $span={sizeProps.span}
      $order={sizeProps.order}
      $offset={sizeProps.offset}
      $push={sizeProps.push}
      $pull={sizeProps.pull}
    >
      {children}
    </StyledCol>
  );
});

export default Col;
