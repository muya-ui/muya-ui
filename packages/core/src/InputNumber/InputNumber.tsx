import { useForkRef } from '@muya-ui/utils';

import React, { useRef, useCallback, useMemo } from 'react';

import styled, { css } from 'styled-components';

import { Input } from '../Input';
import memoForwardRef from '../utils/memoForwardRef';
import useTheme from '../utils/useTheme';

import ArrowWrapper from './ArrowWrapper';
import { IStyledArrowProps } from './styled';
import { IInputNumberProps } from './types';
import useInputNumber from './useInputNumber';

const InputNumberWrapper = styled(Input)<IStyledArrowProps>`
  ${props => {
    const { $entered, $hiddenArrow } = props;
    return (
      $entered &&
      !$hiddenArrow &&
      css`
        padding-right: 0;
      `
    );
  }}
`;

const InputNumber = memoForwardRef<HTMLDivElement, IInputNumberProps>((props, ref) => {
  const theme = useTheme();
  const {
    suffixNode,
    onMouseEnter,
    onMouseLeave,
    onCompositionEnd,
    onCompositionStart,
    disabled,
    size = 'm',
    hiddenArrow = false,

    // number
    min = -Infinity,
    max = Infinity,
    precision = 1,
    step = 1,
    iconSize,

    // input
    width,
    defaultValue,
    value,
    onBlur,
    onChange,
    onKeyDown,
    inputRef: inputRefProp,
    ...other
  } = props;

  const isControlled = 'value' in props;
  const finalWidth = width || theme.components.InputNumber.width[size];
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInputRef = useForkRef<HTMLInputElement>(inputRef, inputRefProp);
  const focus = useCallback(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  const {
    handleComposition,
    handleBlur,
    handleChange,
    handleKeyDown,
    inputValue,
    arrowDisabled,
    entered,
    handleMouseEnter,
    handleMouseLeave,
    changeStep,
    handleFocus,
  } = useInputNumber(
    {
      defaultValue,
      onChange,
      onKeyDown,
      onBlur,
      onCompositionStart,
      onCompositionEnd,
      value,
      onMouseEnter,
      onMouseLeave,
      focus,
      step,
      max,
      min,
      precision,
    },
    isControlled,
  );

  const arrowSuffixNode = useMemo(
    () =>
      !disabled ? (
        <ArrowWrapper
          changeStep={changeStep}
          arrowDisabled={arrowDisabled}
          size={size}
          iconSize={iconSize}
        />
      ) : (
        suffixNode
      ),
    [arrowDisabled, changeStep, disabled, iconSize, size, suffixNode],
  );

  const handleCompositionStart = useCallback(
    (e: React.CompositionEvent<HTMLInputElement>) => {
      handleComposition(true, e);
    },
    [handleComposition],
  );

  const handleCompositionEnd = useCallback(
    (e: React.CompositionEvent<HTMLInputElement>) => {
      handleComposition(false, e);
    },
    [handleComposition],
  );

  return (
    <InputNumberWrapper
      $entered={entered}
      $hiddenArrow={hiddenArrow}
      value={inputValue}
      ref={ref}
      size={size}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
      suffixNode={entered && !hiddenArrow ? arrowSuffixNode : suffixNode}
      onChange={handleChange}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      inputRef={handleInputRef}
      width={finalWidth}
      {...other}
    />
  );
});

(InputNumber as any).__MUYA_INPUTNUMBER = true;

export default InputNumber;
