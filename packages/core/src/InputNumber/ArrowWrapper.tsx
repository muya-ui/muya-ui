import React, { useState } from 'react';
import { FoldIcon, UnfoldIcon } from '@muya-ui/theme-light';
import { StyledArrowSuffixNodeWrapper, StyledDownArrow, StyledUpArrow } from './styled';
import { IInputNumberArrowWrapperProps } from './innerTypes';
import useTheme from '../utils/useTheme';

const ArrowWrapper = (props: IInputNumberArrowWrapperProps) => {
  const { size, arrowDisabled, changeStep, iconSize } = props;
  const theme = useTheme();
  const [upEntered, setUpEntered] = useState(false);
  const [downEntered, setDownEntered] = useState(false);
  const UpIcon = theme.components.InputNumber.upArrowIcon || UnfoldIcon;
  const DownIcon = theme.components.InputNumber.downArrowIcon || FoldIcon;
  return (
    <StyledArrowSuffixNodeWrapper size={size} theme={theme}>
      <StyledUpArrow
        $entered={upEntered}
        $arrowDisabled={arrowDisabled}
        $iconSize={iconSize}
        onMouseEnter={() => setUpEntered(true)}
        onMouseLeave={() => setUpEntered(false)}
        size={size}
        theme={theme}
        onClick={() => changeStep('up')}
      >
        <UpIcon />
      </StyledUpArrow>
      <StyledDownArrow
        $entered={downEntered}
        $arrowDisabled={arrowDisabled}
        $iconSize={iconSize}
        onMouseEnter={() => setDownEntered(true)}
        onMouseLeave={() => setDownEntered(false)}
        size={size}
        theme={theme}
        onClick={() => changeStep('down')}
      >
        <DownIcon />
      </StyledDownArrow>
    </StyledArrowSuffixNodeWrapper>
  );
};

export default ArrowWrapper;
