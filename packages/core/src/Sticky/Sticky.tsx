import React, { useRef, Ref } from 'react';
import { useForkRef } from '@muya-ui/utils';
import memoForwardRef from '../utils/memoForwardRef';
import { IStickyProps } from './types';
import { StyledContainer, StyledSticky } from './styled';
import useStyles from '../utils/useStyles';
import useSticky from './useSticky';

const defaultStyles = {
  sticky: '',
};

export default memoForwardRef((props: IStickyProps, ref: Ref<HTMLDivElement>) => {
  const { children, styles, target, onStatusChange, ...others } = props;
  const innerStyles = useStyles('sticky', defaultStyles, styles);
  const divEl = useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(ref, divEl);
  const { style, fixed } = useSticky(props, divEl);
  const height = (divEl.current && divEl.current.offsetHeight) || 0;
  const innerStyle = fixed ? style : {};

  return (
    <StyledContainer $height={fixed ? height : null} ref={handleRef} {...others}>
      <StyledSticky
        $fixed={fixed}
        {...innerStyles.sticky}
        style={{ ...innerStyles.sticky.style, ...innerStyle }}
      >
        {children}
      </StyledSticky>
    </StyledContainer>
  );
});
