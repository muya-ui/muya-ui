import { endsWith, omit } from 'lodash';
import React, { cloneElement, Ref, useMemo } from 'react';

import { FoldIcon } from '@muya-ui/theme-light';

import Input, { IInputProps, TagsInput } from '../Input';
import { StyledPopperInputWrapper } from '../Input/styled';
import ExpandIconWrapper from '../styled/components/ExpandIconWrapper';
import ExpandWrapper from '../styled/components/ExpandWrapper';
import addPx from '../utils/addPx';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { allSelectInputProps } from './const';
import { ISelectInputBaseProps, ISelectInputProps } from './types';
import useSelectInput from './useSelectInput';

const defaultStyles = {
  inputWrapper: '',
  input: '',
};

const SelectInput = memoForwardRef((props: ISelectInputProps, ref: Ref<HTMLDivElement>) => {
  const {
    id,
    disabled,
    placeholder,
    status,
    // tag
    maxVerticalTagCount,
    maxTagWidth,
    maxTagTextLength,
    // search
    showSearch,
    // icon
    expandIcon,
    // state and computed value
    inputValue,
    popupVisible,
    value,
    isMultiple,
    hasValue,
    // other
    mode,
    width,
    backfill,
    hideExpandIcon,
    getInputElement,
    styles,
    style,
    inputRef,
    className,
    onClear,
    prefixNode,
    suffixNode,
  } = props;
  const theme = useTheme();
  const {
    components: { Select: token },
  } = theme;
  const {
    getDefaultModeLabel,
    labelByValue,
    handleAddTag,
    handleRemoveTag,
    handleInput,
    handleInputFocus,
    handleInputBlur,
    handleInputKeyDown,
  } = useSelectInput(props);
  const selectInputStyles = useMemo(() => {
    let selectInputStyles = {};
    if (styles) {
      const { inputWrapper, input } = styles;
      selectInputStyles = { inputWrapper, input };
    }
    return selectInputStyles;
  }, [styles]);
  const innerStyles = useStyles('select', defaultStyles, selectInputStyles);
  const inputRestProps = omit<ISelectInputProps, keyof ISelectInputBaseProps>(
    props,
    allSelectInputProps,
  );

  const finalSuffixNode = useMemo(() => {
    let finalSuffixNode = [];
    if (suffixNode) {
      finalSuffixNode.push(suffixNode);
    }
    if (!hideExpandIcon) {
      const ExpandIcon = token.expandIcon || FoldIcon;
      finalSuffixNode.push(
        <ExpandWrapper key="expand-icon" theme={theme} expanded={popupVisible}>
          {expandIcon || (
            <ExpandIconWrapper>
              <ExpandIcon />
            </ExpandIconWrapper>
          )}
        </ExpandWrapper>,
      );
    }
    return finalSuffixNode;
  }, [expandIcon, hideExpandIcon, popupVisible, suffixNode, theme, token.expandIcon]);

  const renderSingleModeNode = () => {
    const inputProps: IInputProps = {
      ...inputRestProps,
      ...innerStyles.input,
      disabled,
      width: typeof width === 'string' && endsWith(width, '%') ? '100%' : width,
      placeholder,
      value: inputValue,
      inputRef,
      prefixNode,
      suffixNode: finalSuffixNode,
      clearReplace: true,
      onKeyDown: handleInputKeyDown,
      onInput: handleInput,
      onFocus: handleInputFocus,
      onBlur: handleInputBlur,
      onClear,
    };
    const label = getDefaultModeLabel();
    if (showSearch && popupVisible) {
      if (!backfill) {
        inputProps.placeholder = `${label}` || placeholder;
      }
    } else {
      inputProps.value = `${label}`;
      inputProps.readOnly = true;
    }
    let inputElement = <Input type="text"></Input>;
    if (getInputElement) {
      inputElement = getInputElement();
    }
    return cloneElement(inputElement, {
      ref,
      ...inputProps,
    });
  };

  // 渲染 input 和 tag
  const renderMultipleModeNode = () => {
    return (
      <TagsInput
        {...inputRestProps}
        {...innerStyles.input}
        ref={ref}
        inputRef={inputRef}
        suffixNode={finalSuffixNode}
        width={typeof width === 'string' && endsWith(width, '%') ? '100%' : width}
        disabled={disabled}
        value={value}
        styles={selectInputStyles}
        inputValue={inputValue}
        placeholder={hasValue ? '' : placeholder}
        allowAdd={mode === 'tags'}
        getTagText={labelByValue}
        maxTagTextLength={maxTagTextLength}
        maxVerticalTagCount={maxVerticalTagCount}
        maxTagWidth={maxTagWidth}
        scrollTopAfterEffect={!popupVisible}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onInputKeyDown={handleInputKeyDown}
        onInput={handleInput}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onClear={onClear}
      />
    );
  };

  const renderInput = () => {
    if (isMultiple) {
      return renderMultipleModeNode();
    } else {
      return renderSingleModeNode();
    }
  };

  return (
    <StyledPopperInputWrapper
      id={id}
      className={[innerStyles.inputWrapper.className, className].join(' ').trim()}
      style={{ ...innerStyles.inputWrapper.style, ...style }}
      role="combobox"
      tabIndex={0}
      key="selection"
      $pointer={!isMultiple && !showSearch && !disabled}
      $popupVisible={popupVisible}
      $width={addPx(width)}
      $status={status}
      theme={theme}
    >
      {renderInput()}
    </StyledPopperInputWrapper>
  );
});

export default SelectInput;
