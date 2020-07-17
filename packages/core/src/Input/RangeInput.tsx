import React, { Children, useRef, useMemo } from 'react';

import { useForkRef } from '@muya-ui/utils';
import { ClearIcon as DefaultClearIcon } from '@muya-ui/theme-light';

import ClearIconWrapper from '../styled/components/ClearIconWrapper';
import addPx from '../utils/addPx';
import memoForwardRef from '../utils/memoForwardRef';
import mergeStyleItem from '../utils/mergeStyleItem';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { ExtraNodes, StyledInput, StyledInputWrapper } from './styled';
import { IRangeInputElement, IRangeInputProps, IRangeInputStyleKeys } from './types';
import { ICustomStylePropMap } from '../types';
import useRangeInput from './useRangeInput';

const RangeInput = memoForwardRef<IRangeInputElement, IRangeInputProps>((props, ref) => {
  const {
    size = 'm',
    disabled,
    status,
    prefixNode,
    suffixNode,
    middleNode,
    allowClear,
    clearReplace,
    width,
    height,
    onMouseEnter,
    onMouseLeave,
    className,
    style,
    styles,

    // input
    value,
    defaultValue,
    placeholder = [],

    autoFocus = false,
    onFocus,
    onBlur,
    onClear,
    onClick,
    onChange,
    onKeyDown,
    onPressEnter,
    focusWhenClear = true,
    inputProps,
    ...other
  } = props;
  const theme = useTheme();
  const defaultStyles = useMemo<ICustomStylePropMap<IRangeInputStyleKeys>>(
    () => ({
      inputWrapper: '',
      headInput: '',
      tailInput: '',
      clearWrapper: '',
      nodeWrapper: '',
      nodeDivider: '',
    }),
    [],
  );
  const innerStyles = useStyles('range-input', defaultStyles, styles);

  const inputWrapperStyleItem = useMemo(
    () =>
      mergeStyleItem(
        {
          className,
          style,
        },
        innerStyles.inputWrapper,
      ),
    [className, innerStyles.inputWrapper, style],
  );

  const {
    finalValue,
    focus,
    entered,
    leftInputRef,
    rightInputRef,

    handleFocus,
    handleBlur,
    handleClick,
    handleLeftChange,
    handleRightChange,
    handleClear,
    handleMouseEnter,
    handleMouseLeave,
    handleKeyDown,
  } = useRangeInput(props);
  const innerRef = useRef<IRangeInputElement>(null);
  const more = useRef<Partial<IRangeInputElement>>({
    focus(position: 0 | 1 = 0, option?: FocusOptions) {
      if (position === 1) {
        rightInputRef.current!.focus(option);
      } else {
        leftInputRef.current!.focus(option);
      }
    },
    blur(position: 0 | 1 = 0) {
      if (position === 1) {
        rightInputRef.current!.blur();
      } else {
        leftInputRef.current!.blur();
      }
    },
  });
  const handleRef = useForkRef<IRangeInputElement>(ref, innerRef, more.current);

  const innerSuffixNode: React.ReactNode[] = [];
  Children.forEach(suffixNode, child => {
    innerSuffixNode.push(child);
  });
  const [leftValue, rightValue] = finalValue;
  // 清除输入框功能
  if (allowClear && (leftValue || rightValue) && entered && !disabled) {
    const {
      typography: {
        spec: { fontSize },
      },
      components: { Input: token },
    } = theme;
    const ClearIcon = token.clearIcon || DefaultClearIcon;
    const clearNode = (
      <ClearIconWrapper
        key="clear"
        $fontSize={fontSize[token.fontLevel[size!]]}
        onClick={handleClear}
        {...innerStyles.clearWrapper}
      >
        <ClearIcon />
      </ClearIconWrapper>
    );
    if (clearReplace) {
      innerSuffixNode.shift();
    }
    innerSuffixNode.unshift(clearNode);
  }

  const inputWidth = width !== undefined ? width : theme.components.Input.rangeInputWidth[size];

  return (
    <StyledInputWrapper
      theme={theme}
      disabled={disabled}
      focus={focus}
      $width={addPx(inputWidth)}
      $height={addPx(height)}
      size={size}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      hasError={status === 'error'}
      ref={handleRef as (el: HTMLDivElement) => void}
      {...inputWrapperStyleItem}
      {...other}
    >
      <ExtraNodes
        $type="prefix"
        theme={theme}
        size={size}
        nodes={prefixNode}
        $nodeStyleItem={innerStyles.nodeWrapper}
        $dividerStyleItem={innerStyles.nodeDivider}
      />
      <StyledInput
        value={leftValue}
        disabled={disabled}
        theme={theme}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleLeftChange}
        onKeyDown={handleKeyDown}
        autoFocus={autoFocus}
        placeholder={placeholder[0]}
        size={size as any}
        ref={leftInputRef}
        {...inputProps}
      />
      <ExtraNodes
        $type="suffix"
        theme={theme}
        size={size}
        nodes={middleNode}
        full
        $nodeStyleItem={innerStyles.nodeWrapper}
        $dividerStyleItem={innerStyles.nodeDivider}
      />
      <StyledInput
        value={rightValue}
        disabled={disabled}
        theme={theme}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleRightChange}
        onKeyDown={handleKeyDown}
        autoFocus={autoFocus}
        size={size as any}
        placeholder={placeholder[1]}
        ref={rightInputRef}
        {...inputProps}
      />
      <ExtraNodes
        $type="suffix"
        theme={theme}
        size={size}
        nodes={innerSuffixNode}
        $nodeStyleItem={innerStyles.nodeWrapper}
        $dividerStyleItem={innerStyles.nodeDivider}
      />
    </StyledInputWrapper>
  );
});

export default RangeInput;
