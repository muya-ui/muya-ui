import React from 'react';
import styled from 'styled-components';

import useTheme from '../utils/useTheme';
import { IInputProps } from './types';
import memoForwardRef from '../utils/memoForwardRef';

export type ITextLimitProps = Pick<IInputProps, 'value' | 'limit'>;

export const LimitWrapper = styled.span`
  font-weight: ${props => props.theme.typography.spec.fontWeight.semibold};
  color: ${props => props.theme.colors.pattern.text.darktip};
  cursor: default;
`;

export const LimitDanerWrapper = styled(LimitWrapper)`
  color: ${props => props.theme.colors.pattern.feature.error};
`;

export default memoForwardRef<HTMLDivElement, ITextLimitProps>((props, ref) => {
  const { limit, value = '' } = props;
  const theme = useTheme();
  if (!(limit && limit > 0)) return null;
  const { length } = value;
  return (
    <LimitWrapper ref={ref} theme={theme}>
      {length > limit ? <LimitDanerWrapper theme={theme}>{length}</LimitDanerWrapper> : length}/
      {limit}
    </LimitWrapper>
  );
});
