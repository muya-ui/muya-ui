import React, { useRef, useState, CSSProperties, useEffect, useCallback, useMemo } from 'react';

import { useForkRef } from '@muya-ui/utils';
import ResizeObserver from 'resize-observer-polyfill';

import { Omit } from '../types';
import forkHandler from '../utils/forkHandler';
import { IInputProps } from './types';
import useInputBase from './useInputBase';
import calculateNodeHeight from './calculateNodeHeight';

type IProps = Omit<IInputProps, 'theme'>;

export default function useInput(props: IProps, isControlled: boolean) {
  const {
    defaultValue = '',
    value = '',
    autoFocus = false,
    disabled,
    inputRef: inputRefProp,

    onClear,
    onChange,
    onClick,
    onKeyDown,
    onPressEnter,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    focusWhenClear,
    multiline,
    autosize,
    minRows,
    maxRows,
  } = props;

  const [innerValue, setInnerValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const handleInputRef = useForkRef<HTMLInputElement | HTMLTextAreaElement>(inputRef, inputRefProp);
  const observerRef = useRef<ResizeObserver>();
  const [autosizeStyles, setTextareaStyles] = useState<CSSProperties>({});
  const baseResult = useInputBase({
    autoFocus,
    disabled,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
  });

  const handleClick = useMemo(
    () =>
      forkHandler(e => {
        if (inputRef.current && e.currentTarget === e.target) {
          inputRef.current.focus();
        }
      }, onClick),
    [onClick],
  );

  const setInputValue = useCallback(
    (
      value: string,
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.MouseEvent<HTMLElement>,
    ) => {
      if (!isControlled) {
        setInnerValue(value);
      }
      if (onChange) {
        let event = e;
        if (e.type === 'click') {
          // click clear icon
          const inputTarget = inputRef.current as HTMLInputElement;
          event = Object.create(e);
          event.target = inputTarget;
          event.currentTarget = inputTarget;
          const originalInputValue = inputTarget.value;
          // change input value cause e.target.value should be '' when clear input
          inputTarget.value = '';
          onChange(event as React.ChangeEvent<HTMLInputElement>);
          // reset input value
          inputTarget.value = originalInputValue;
          return;
        }
        onChange(event as React.ChangeEvent<HTMLInputElement>);
      }
    },
    [isControlled, onChange],
  );

  const resizeTextarea = useCallback(() => {
    if (autosize && multiline && inputRef.current) {
      setTextareaStyles(
        calculateNodeHeight(
          inputRef.current as HTMLTextAreaElement,
          isControlled,
          minRows,
          maxRows,
        ),
      );
    }
  }, [autosize, isControlled, maxRows, minRows, multiline]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      resizeTextarea();
      setInputValue(e.target.value, e);
    },
    [resizeTextarea, setInputValue],
  );

  const handleClear = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setInputValue('', e);
      if (onClear) {
        onClear(e);
      }
      if (focusWhenClear && inputRef.current) {
        inputRef.current.focus();
      }
    },
    [focusWhenClear, onClear, setInputValue],
  );

  const handleKeyDown = useMemo(
    () =>
      forkHandler((e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.keyCode === 13 && onPressEnter) {
          onPressEnter(e);
        }
      }, onKeyDown),
    [onKeyDown, onPressEnter],
  );

  if (disabled) {
    inputRef.current && inputRef.current.blur();
  }

  useEffect(() => {
    // textarea autosize
    if (!observerRef.current && inputRef.current && multiline && autosize) {
      observerRef.current = new ResizeObserver(resizeTextarea);
      observerRef.current.observe(inputRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = undefined;
      }
    };
  }, [autosize, multiline, resizeTextarea]);

  useEffect(() => {
    resizeTextarea();
  }, [resizeTextarea]);

  const finalValue = isControlled ? value : innerValue;
  return {
    ...baseResult,

    finalValue,

    handleClick,
    handleChange,
    handleClear,
    handleKeyDown,
    handleInputRef,
    autosizeStyles,
  };
}
