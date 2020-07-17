import { IInputTagValue } from '../Input';
import { ITagInputAddEvent, ITagInputRemoveEvent } from '../Input/types';
import { ISelectInputProps, ISelectSingleValueType } from './types';

export default function useSelectInput(props: ISelectInputProps) {
  const {
    maxTagTextLength,
    inputValue,
    value,
    allOptions,
    isSearchMode,
    popupVisible,
    onInput,
    onInputChange,
    onFocus,
    onBlur,
    onKeyDown,
    onAddTag,
    onSearch,
    onDeselect,
    mode,
  } = props;
  /**
   * default 模式下获取展示的 label
   */
  const getDefaultModeLabel = (): React.ReactNode => {
    let optionValue = value[0];
    let option;
    if (typeof optionValue === 'undefined') {
      return '';
    } else {
      option = optionByValue(optionValue);
      if (option) {
        return option.label || option.value;
      }
      return '';
    }
  };

  /**
   * 获取 value 对应的 option 对象
   */
  const optionByValue = (value: ISelectSingleValueType) => {
    if (value && typeof value === 'object') {
      return allOptions[value.value] || { ...value };
    } else {
      return allOptions[value] || { value };
    }
  };

  /**
   * 获取 value 对应的 label 值
   */
  const labelByValue = (value: IInputTagValue) => {
    let option = optionByValue(value);
    return option.label || option.value;
  };

  // tag event
  const handleAddTag = (inputValue: string, e: ITagInputAddEvent) => {
    onAddTag(inputValue, e);
  };

  const handleRemoveTag = (value: IInputTagValue, index: number, e: ITagInputRemoveEvent) => {
    onDeselect(optionByValue(value), index, e);
  };

  // input event
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const newInputValue = (e.target as HTMLInputElement).value;
    if (mode !== 'tags') {
      onInputChange(newInputValue);
    } else {
      if (typeof maxTagTextLength === 'undefined' || newInputValue.length <= maxTagTextLength!) {
        onInputChange(newInputValue);
      }
    }
    if (isSearchMode && onSearch) {
      onSearch(newInputValue);
    }
    if (onInput) {
      onInput(e);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(isSearchMode && popupVisible)) {
      e.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (mode === 'tags' && inputValue) {
      onAddTag(inputValue, e);
    }
    if (onBlur) {
      onBlur(e);
    }
  };

  return {
    // utils
    getDefaultModeLabel,
    optionByValue,
    labelByValue,
    // tag
    handleRemoveTag,
    handleAddTag,
    // input
    handleInput,
    handleInputFocus: onFocus,
    handleInputBlur,
    handleInputKeyDown,
  };
}
