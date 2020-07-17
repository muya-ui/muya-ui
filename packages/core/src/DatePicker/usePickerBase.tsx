import React, { useMemo } from 'react';

import { CalendarIcon } from '@muya-ui/theme-light';

import { StyledSuffixIcon } from '../styled/components/SuffixIcon';
import useTheme from '../utils/useTheme';

export default function usePickerBase() {
  const theme = useTheme();
  const InputIcon = theme.components.DatePicker.inputIcon || CalendarIcon;
  const suffixNode = useMemo(
    () => (
      <StyledSuffixIcon theme={theme}>
        <InputIcon />
      </StyledSuffixIcon>
    ),
    [theme],
  );

  return {
    suffixNode,
  };
}
