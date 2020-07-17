import { RefObject, useEffect, useRef, useState } from 'react';
import { shallowEqualArrays } from 'shallow-equal';

import { usePrevious } from '@muya-ui/utils';

import { KeyCode } from '../utils/keyCode';
import { ITagsInputProps } from './types';
import useInputBase from './useInputBase';

export default function useTagsInput(
  props: ITagsInputProps,
  contentRef: RefObject<HTMLDivElement>,
  sizerRef: RefObject<HTMLDivElement>,
  inputRef: RefObject<HTMLInputElement>,
) {
  const {
    allowAdd = false,
    autoFocus = false,
    disabled = false,
    scrollTopAfterEffect = false,
    value = [],
    defaultValue = [],
    inputValue = '',
    defaultInputValue = '',
    maxTagTextLength,
    status,
    onFocus,
    onBlur,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onChange,
    onClear,
    onRemoveTag,
    onAddTag,
    onInputChange,
    onInput,
    onInputKeyDown,
  } = props;
  const baseResult = useInputBase({
    autoFocus,
    disabled,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
  });
  const { current: isControlled } = useRef('value' in props);
  const { current: isInputControlled } = useRef('inputValue' in props);
  const [valueState, setValueState] = useState(isControlled ? value : defaultValue);
  const [inputValueState, setInputValueState] = useState(
    isInputControlled ? inputValue : defaultInputValue,
  );
  const preValueState = usePrevious(valueState);
  const hasValue = valueState && valueState.length > 0;
  const hasError = status === 'error';

  const handleInputChange = (value: string) => {
    if (!isInputControlled) {
      setInputValueState(value);
    }
    if (onInputChange) {
      onInputChange(value);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
    inputRef.current && inputRef.current.focus();
  };

  const handleClear = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    // 清空 tag
    if (!isControlled) {
      setValueState([]);
    }
    if (onChange) {
      onChange([]);
    }
    if (onClear) {
      onClear(e);
    }
    // 清空 input
    handleInputChange('');
    inputRef.current && inputRef.current.focus();
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const newInputValue = (e.target as HTMLInputElement).value;
    if (typeof maxTagTextLength === 'undefined' || newInputValue.length <= maxTagTextLength!) {
      handleInputChange(newInputValue);
    }
    if (onInput) {
      onInput(e);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValueState.length > 0 && e.keyCode === KeyCode.BACKSPACE) {
      return;
    }
    if (e.keyCode === KeyCode.BACKSPACE) {
      const len = valueState.length;
      if (len > 0) {
        handleRemoveTag(len - 1, e);
      }
    }
    if (e.keyCode === KeyCode.ENTER) {
      handleAddTag(e);
    }
    if (onInputKeyDown) {
      onInputKeyDown(e);
    }
  };

  const handleRemoveTag = (index: number, e: React.KeyboardEvent | React.MouseEvent) => {
    const newValueState = [...valueState];
    newValueState.splice(index, 1);
    if (!isControlled) {
      setValueState(newValueState);
    }
    if (onChange) {
      onChange(newValueState);
    }
    if (onRemoveTag) {
      onRemoveTag(valueState[index], index, e);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent | React.FocusEvent) => {
    if (allowAdd && inputValueState) {
      const newValueState = [...valueState, inputValueState];
      if (!isControlled) {
        setValueState(newValueState);
      }
      if (onChange) {
        onChange(newValueState);
      }
      handleInputChange('');
      if (onAddTag) {
        onAddTag(inputValueState, e);
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    baseResult.handleFocus(e);
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    baseResult.handleBlur(e);
    handleAddTag(e);
  };

  if (isControlled && !shallowEqualArrays(value, valueState)) {
    setValueState(value);
  }

  if (isInputControlled && inputValue !== inputValueState) {
    setInputValueState(inputValue);
  }

  useEffect(() => {
    // resize input
    if (inputRef.current && sizerRef.current) {
      const inputWidth = Math.ceil(sizerRef.current!.scrollWidth);
      if (inputWidth > 0) {
        inputRef.current!.style.width = `${inputWidth}px`;
      } else {
        inputRef.current!.style.width = '';
      }
    }
    if (scrollTopAfterEffect && !baseResult.focus && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  });

  useEffect(() => {
    if (baseResult.focus && !shallowEqualArrays(preValueState!, valueState) && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [baseResult.focus, contentRef, preValueState, valueState]);

  return {
    ...baseResult,
    value: valueState,
    inputValue: inputValueState,
    hasValue,
    hasError,
    handleFocus,
    handleBlur,
    handleClick,
    handleClear,
    handleInput,
    handleInputKeyDown,
    handleRemoveTag,
    handleAddTag,
  };
}
