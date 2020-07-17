import { endsWith, omit } from 'lodash';
import React, { Ref, useMemo } from 'react';

import { FoldIcon } from '@muya-ui/theme-light';

import Input, { TagsInput } from '../Input';
import { StyledPopperInputWrapper } from '../Input/styled';
import ExpandIconWrapper from '../styled/components/ExpandIconWrapper';
import ExpandWrapper from '../styled/components/ExpandWrapper';
import addPx from '../utils/addPx';
import memoForwardRef from '../utils/memoForwardRef';
import useTheme from '../utils/useTheme';
import { allCascaderInputProps } from './const';
import { ICascaderInputBaseProps, ICascaderInputProps } from './types';

const CascaderInput = memoForwardRef((props: ICascaderInputProps, ref: Ref<HTMLDivElement>) => {
  const {
    id,
    status,
    disabled,
    placeholder,
    inputValue,
    inputRef,
    expandIcon,
    popupVisible,
    multiple,
    width,
    maxTagTextLength,
    maxVerticalTagCount,
    maxTagWidth,
    style,
    className,
    onRemoveTag,
    onClear,
  } = props;
  const theme = useTheme();
  const {
    components: { Select: token },
  } = theme;
  const inputRestProps = omit<ICascaderInputProps, keyof ICascaderInputBaseProps>(
    props,
    allCascaderInputProps,
  );

  const suffixNode = useMemo(() => {
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

  const singleModeNode = useMemo(() => {
    return (
      <Input
        {...inputRestProps}
        ref={ref}
        inputRef={inputRef}
        suffixNode={suffixNode}
        type="text"
        disabled={disabled}
        width={typeof width === 'string' && endsWith(width, '%') ? '100%' : width}
        placeholder={placeholder}
        value={inputValue as string}
        clearReplace
        readOnly
        onClear={onClear}
      />
    );
  }, [
    disabled,
    inputRef,
    inputRestProps,
    inputValue,
    onClear,
    placeholder,
    ref,
    suffixNode,
    width,
  ]);

  // 渲染 input 和 tag
  const multipleModeNode = useMemo(() => {
    return (
      <TagsInput
        {...inputRestProps}
        ref={ref}
        suffixNode={suffixNode}
        inputRef={inputRef}
        width={typeof width === 'string' && endsWith(width, '%') ? '100%' : width}
        disabled={disabled}
        value={inputValue as string[]}
        placeholder={inputValue.length > 0 ? '' : placeholder}
        scrollTopAfterEffect={popupVisible}
        maxTagTextLength={maxTagTextLength}
        maxVerticalTagCount={maxVerticalTagCount}
        maxTagWidth={maxTagWidth}
        onRemoveTag={onRemoveTag}
        onClear={onClear}
        readOnly
      />
    );
  }, [
    disabled,
    inputRef,
    inputRestProps,
    inputValue,
    maxTagTextLength,
    maxTagWidth,
    maxVerticalTagCount,
    onClear,
    onRemoveTag,
    placeholder,
    popupVisible,
    ref,
    suffixNode,
    width,
  ]);

  return (
    <StyledPopperInputWrapper
      id={id}
      role="combobox"
      tabIndex={0}
      key="selection"
      $pointer={!disabled}
      $popupVisible={popupVisible}
      $width={addPx(width)}
      $status={status}
      theme={theme}
      style={style}
      className={className}
    >
      {multiple ? multipleModeNode : singleModeNode}
    </StyledPopperInputWrapper>
  );
});

export default CascaderInput;
