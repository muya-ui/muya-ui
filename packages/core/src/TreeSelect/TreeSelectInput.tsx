import { endsWith, omit } from 'lodash';
import React, { cloneElement, Ref, useMemo } from 'react';

import { FoldIcon } from '@muya-ui/theme-light';

import Input, { IInputProps, TagsInput } from '../Input';
import { StyledPopperInputWrapper } from '../Input/styled';
import ExpandIconWrapper from '../styled/components/ExpandIconWrapper';
import ExpandWrapper from '../styled/components/ExpandWrapper';
import addPx from '../utils/addPx';
import useTheme from '../utils/useTheme';
import { allTreeSelectInputProps } from './const';
import { ITreeSelectInputBaseProps, ITreeSelectInputProps } from './types';
import useTreeSelectInput from './useTreeSelectInput';

const TreeSelectInput = React.forwardRef(
  (props: ITreeSelectInputProps, ref: Ref<HTMLDivElement>) => {
    const {
      id,
      disabled,
      placeholder,
      showSearch,
      expandIcon,
      inputValue,
      popupVisible,
      value,
      multiple,
      hasValue,
      width,
      backfill,
      inputRef,
      onClear,
      maxVerticalTagCount,
      maxTagWidth,
      maxTagTextLength,
      prefixNode,
      wrapperStyleItem,
      status,
    } = props;
    const theme = useTheme();
    const {
      components: { Select: token },
    } = theme;
    const { getInputLabel, getTagText, handleRemoveTag, handleInput } = useTreeSelectInput(props);
    const inputRestProps = omit<ITreeSelectInputProps, keyof ITreeSelectInputBaseProps>(
      props,
      allTreeSelectInputProps,
    );

    const finalSuffixNode = useMemo(() => {
      const ExpandIcon = token.expandIcon || FoldIcon;
      return (
        <ExpandWrapper theme={theme} expanded={popupVisible}>
          {expandIcon || (
            <ExpandIconWrapper>
              <ExpandIcon />
            </ExpandIconWrapper>
          )}
        </ExpandWrapper>
      );
    }, [expandIcon, popupVisible, theme, token.expandIcon]);

    const renderSingleModeNode = () => {
      const inputProps: IInputProps = {
        ...inputRestProps,
        disabled,
        width: typeof width === 'string' && endsWith(width, '%') ? '100%' : width,
        placeholder,
        prefixNode,
        value: inputValue,
        inputRef,
        suffixNode: finalSuffixNode,
        clearReplace: true,
        onInput: handleInput,
        onClear,
      };
      const label = getInputLabel();
      if (showSearch && popupVisible) {
        if (!backfill) {
          inputProps.placeholder = `${label}` || placeholder;
        }
      } else {
        inputProps.value = `${label}`;
        inputProps.readOnly = true;
      }
      let inputElement = <Input type="text"></Input>;
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
          ref={ref}
          inputRef={inputRef}
          suffixNode={finalSuffixNode}
          width={typeof width === 'string' && endsWith(width, '%') ? '100%' : width}
          disabled={disabled}
          value={value}
          inputValue={inputValue}
          placeholder={hasValue ? '' : placeholder}
          getTagText={getTagText}
          scrollTopAfterEffect={!popupVisible}
          maxTagTextLength={maxTagTextLength}
          maxVerticalTagCount={maxVerticalTagCount}
          maxTagWidth={maxTagWidth}
          onRemoveTag={handleRemoveTag}
          onInput={handleInput}
          onClear={onClear}
        />
      );
    };

    const renderInput = () => {
      if (multiple) {
        return renderMultipleModeNode();
      } else {
        return renderSingleModeNode();
      }
    };

    return (
      <StyledPopperInputWrapper
        id={id}
        role="combobox"
        tabIndex={0}
        key="selection"
        $pointer={!multiple && !showSearch && !disabled}
        $popupVisible={popupVisible}
        $width={addPx(width)}
        $status={status}
        theme={theme}
        {...wrapperStyleItem}
      >
        {renderInput()}
      </StyledPopperInputWrapper>
    );
  },
);

export default TreeSelectInput;
