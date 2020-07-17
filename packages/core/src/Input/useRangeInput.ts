import React, { useMemo, useRef, useState, useCallback } from 'react';

import forkHandler from '../utils/forkHandler';
import { IRangeInputProps } from './types';
import useInputBase from './useInputBase';
import { getRangeDefaultValue } from './utils';

export default function useRangeInput(props: IRangeInputProps) {
  const {
    autoFocus,
    disabled,
    onFocus,
    onBlur,
    onClick,
    value,
    defaultValue,
    onChange,
    onMouseEnter,
    onMouseLeave,
    focusWhenClear,
    onKeyDown,
    onPressEnter,
    onClear,
  } = props;

  const leftInputRef = useRef<HTMLInputElement>(null);
  const rightInputRef = useRef<HTMLInputElement>(null);
  const baseResult = useInputBase({
    autoFocus,
    disabled,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
  });
  const valueFromProps: [string, string] = useMemo(() => {
    if (value) {
      return getRangeDefaultValue(value);
    }
    if (defaultValue) {
      return getRangeDefaultValue(defaultValue);
    }
    return ['', ''];
  }, [defaultValue, value]);
  const [innerValue, setInnerValue] = useState(valueFromProps);

  const finalValue = 'value' in props ? valueFromProps : innerValue;
  const handleClick = useMemo(
    () =>
      forkHandler(e => {
        if (leftInputRef.current && e.currentTarget === e.target) {
          leftInputRef.current.focus();
        }
      }, onClick),
    [onClick],
  );
  const updateValue = useCallback(
    (newValue: [string, string]) => {
      setInnerValue(newValue);
      if (onChange) {
        onChange({ value: newValue });
      }
    },
    [onChange],
  );
  const setInputValue = useCallback(
    (v: string, inputPos: 0 | 1) => {
      const [oldLeft, oldRight] = finalValue;
      const newValue: [string, string] = [oldLeft, oldRight];
      newValue[inputPos] = v;
      updateValue(newValue);
    },
    [finalValue, updateValue],
  );

  const handleLeftChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value, 0);
    },
    [setInputValue],
  );

  const handleRightChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value, 1);
    },
    [setInputValue],
  );

  if (disabled) {
    leftInputRef.current && leftInputRef.current.blur();
    rightInputRef.current && rightInputRef.current.blur();
  }

  const handleClear = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      updateValue(['', '']);
      if (focusWhenClear && leftInputRef.current) {
        leftInputRef.current.focus();
      }
      if (onClear) {
        onClear({
          value: ['', ''],
        });
      }
    },
    [focusWhenClear, onClear, updateValue],
  );

  const handleKeyDown = useMemo(
    () =>
      forkHandler(e => {
        if (e.keyCode === 13 && onPressEnter) {
          onPressEnter({ value: finalValue });
        }
      }, onKeyDown),
    [finalValue, onKeyDown, onPressEnter],
  );

  return {
    ...baseResult,

    finalValue,
    leftInputRef,
    rightInputRef,

    handleClick,
    handleLeftChange,
    handleRightChange,
    handleClear,
    handleKeyDown,
  };
}
