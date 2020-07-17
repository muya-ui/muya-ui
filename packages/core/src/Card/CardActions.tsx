import React from 'react';
import { ICardActionsProps } from './types';
import { StyledCardActions } from './styled';
import useTheme from '../utils/useTheme';
import memoForwardRef from '../utils/memoForwardRef';

const CardActions = memoForwardRef<HTMLDivElement, ICardActionsProps>((props, ref) => {
  const { children, padding, bordered = true, ...others } = props;
  const theme = useTheme();

  return (
    <StyledCardActions theme={theme} $padding={padding} $bordered={bordered} ref={ref} {...others}>
      {children}
    </StyledCardActions>
  );
});

export default CardActions;
