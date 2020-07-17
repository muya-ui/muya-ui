import React from 'react';
import { ICardContentProps } from './types';
import { StyledCardContent } from './styled';
import useTheme from '../utils/useTheme';
import memoForwardRef from '../utils/memoForwardRef';

const CardContent = memoForwardRef<HTMLDivElement, ICardContentProps>((props, ref) => {
  const { children, padding, ...others } = props;
  const theme = useTheme();

  return (
    <StyledCardContent theme={theme} $padding={padding} ref={ref} {...others}>
      {children}
    </StyledCardContent>
  );
});

export default CardContent;
