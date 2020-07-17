import { omit } from 'lodash';
import React, { Ref, useRef, useMemo } from 'react';

import { useForkRef } from '@muya-ui/utils';
import { ClearIcon as DefaultClearIcon } from '@muya-ui/theme-light';

import ClearIconWrapper from '../styled/components/ClearIconWrapper';
import memoForwardRef from '../utils/memoForwardRef';
import useTheme from '../utils/useTheme';
import InputTag from './InputTag';
import {
  StyledInputSizer,
  StyledTagsInput,
  StyledTagsInputContentWrapper,
  StyledTagsInputSuffixNodeWrapper,
  StyledTagsInputWrapper,
  StyledTagsWrapper,
} from './styled';
import { IInputTagValue, ITagsInputProps } from './types';
import useTagsInput from './useTagsInput';
import useStyles from '../utils/useStyles';
import mergeStyleItem from '../utils/mergeStyleItem';

const noop = () => {};

const defaultGetTagText = (value: IInputTagValue) =>
  value && typeof value === 'object' ? value.value : value;

const defaultStyles = {
  inputWrapper: '',
  contentWrapper: '',
  tagsWrapper: '',
  input: '',
  tag: '',
};

const TagsInput = memoForwardRef((props: ITagsInputProps, ref: Ref<HTMLDivElement>) => {
  const {
    size = 'm',
    width,
    placeholder,
    disabled = false,
    allowClear = false,
    autoFocus = false,
    scrollTopAfterEffect = false,
    maxTagWidth,
    maxVerticalTagCount = 2.5,
    suffixNode,
    clearIcon,
    className,
    style,
    styles,
    inputRef,
    status,
    getTagText = defaultGetTagText,
    ...restProps
  } = props;
  const theme = useTheme();
  const innerStyles = useStyles('tags-input', defaultStyles, styles);
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
    typography: {
      spec: { fontSize },
    },
    components: { Input: token },
  } = theme;
  const sizerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerInputRef = useRef<HTMLInputElement>(null);
  const handleInputRef = useForkRef(inputRef, innerInputRef);
  const {
    focus,
    entered,
    value,
    inputValue,
    hasValue,
    hasError,
    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    handleClear,
    handleRemoveTag,
    handleInputKeyDown,
    handleInput,
  } = useTagsInput(props, contentRef, sizerRef, innerInputRef);

  const renderSuffixNode = () => {
    let clearNode: React.ReactNode = null;
    if (allowClear && hasValue && !disabled && entered) {
      const SuffixIcon = token.clearIcon || DefaultClearIcon;
      clearNode = (
        <ClearIconWrapper
          key="clear"
          $fontSize={fontSize[token.fontLevel[size]]}
          onClick={handleClear}
        >
          {clearIcon || <SuffixIcon />}
        </ClearIconWrapper>
      );
    }
    if (clearNode) {
      return <StyledTagsInputSuffixNodeWrapper>{clearNode}</StyledTagsInputSuffixNodeWrapper>;
    }
    if (suffixNode) {
      return <StyledTagsInputSuffixNodeWrapper>{suffixNode}</StyledTagsInputSuffixNodeWrapper>;
    }
  };

  const inputProps = omit(restProps, [
    'value',
    'defaultValue',
    'inputValue',
    'defaultInputValue',
    'onAddTag',
    'onRemoveTag',
    'onFocus',
    'onBlur',
    'onInputKeyDown',
    'onKeyDown',
    'onClear',
    'onInput',
    'onInputChange',
    'onClick',
    'onMouseEnter',
    'onMouseLeave',
  ]);

  return (
    <StyledTagsInputWrapper
      theme={theme}
      ref={ref}
      $disabled={disabled}
      $focus={focus}
      $width={width}
      $maxTagWidth={maxTagWidth}
      $maxVerticalTagCount={maxVerticalTagCount}
      $size={size}
      $hasValue={hasValue}
      $hasError={hasError}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...inputWrapperStyleItem}
    >
      <StyledTagsInputContentWrapper {...innerStyles.contentWrapper} ref={contentRef}>
        <StyledTagsWrapper {...innerStyles.tagsWrapper}>
          {value.map((value, index) => (
            <InputTag
              key={value && typeof value === 'object' ? value.value : value}
              theme={theme}
              size={size}
              shape="rect"
              onClose={(e: React.MouseEvent) => handleRemoveTag(index, e)}
              closable
              {...innerStyles.tag}
            >
              {getTagText(value)}
            </InputTag>
          ))}
          {
            <>
              <StyledTagsInput
                {...inputProps}
                ref={handleInputRef}
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={noop}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onInput={handleInput}
                onKeyDown={handleInputKeyDown}
                autoFocus={autoFocus}
                disabled={disabled}
                {...innerStyles.input}
              />
              <StyledInputSizer ref={sizerRef}>{inputValue || placeholder}</StyledInputSizer>
            </>
          }
        </StyledTagsWrapper>
      </StyledTagsInputContentWrapper>
      {renderSuffixNode()}
    </StyledTagsInputWrapper>
  );
});

export default TagsInput;
