import React, { Children, Ref, useMemo } from 'react';

import {
  ClearIcon as DefaultClearIcon,
  IFontSizeSpec,
  SuccessIcon as DefaultSuccessIcon,
} from '@muya-ui/theme-light';

import Spin from '../Spin';
import ClearIconWrapper from '../styled/components/ClearIconWrapper';
import addPx from '../utils/addPx';
import memoForwardRef from '../utils/memoForwardRef';
import mergeStyleItem from '../utils/mergeStyleItem';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import {
  ExtraNodes,
  StyledInput,
  StyledInputWrapper,
  StyledStatusWrapper,
  StyledTextarea,
  StyledTextareaLimitWrapper,
  StyledTextareaWrapper,
} from './styled';
import TextLimit from './TextLimit';
import { IInputProps } from './types';
import useInput from './useInput';

const defaultStyles = {
  inputWrapper: '',
  textareaWrapper: '',
  statusWrapper: '',
  clearWrapper: '',
  textarea: '',
  textLimitWrapper: '',
  textLimit: '',
  nodeWrapper: '',
  nodeDivider: '',
  input: '',
};

const Input = memoForwardRef<HTMLDivElement, IInputProps>(function Input(props, ref) {
  const {
    size = 'm',
    disabled,
    status,
    allowClear,
    clearReplace,
    limit = 0,
    prefixNode,
    suffixNode,
    width,
    height,
    onMouseEnter,
    onMouseLeave,
    className,
    style,
    inputRef,

    // textarea
    multiline,
    autosize,
    minRows,
    maxRows,

    // input
    defaultValue,
    value,
    autoFocus,
    onClear,
    onFocus,
    onBlur,
    onClick,
    onChange,
    onPressEnter,
    onKeyDown,
    hasFeedback = true,
    focusWhenClear = true,
    styles,
    ...other
  } = props;
  const theme = useTheme();
  const innerStyles = useStyles('input', defaultStyles, styles);

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
  const textareaWrapperStyleItem = useMemo(
    () =>
      mergeStyleItem(
        {
          className,
          style,
        },
        innerStyles.textareaWrapper,
      ),
    [className, innerStyles.textareaWrapper, style],
  );

  // 受控模式使用内部state
  const isControlled = 'value' in props;

  const {
    finalValue,
    handleInputRef,

    handleClick,
    handleChange,
    handleClear,

    // from base
    focus,
    entered,
    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
    handleKeyDown,
    autosizeStyles,
  } = useInput(
    {
      defaultValue,
      value,
      autoFocus,
      disabled,

      onClear,
      onChange,
      onClick,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      onKeyDown,
      onPressEnter,
      focusWhenClear,
      inputRef,
      autosize,
      multiline,
      minRows,
      maxRows,
    },
    isControlled,
  );
  const textareaStyleItem = useMemo(
    () =>
      mergeStyleItem(
        {
          style: autosize ? autosizeStyles : {},
        },
        innerStyles.textarea,
      ),
    [autosize, autosizeStyles, innerStyles.textarea],
  );
  const exceedLimit = limit > 0 && finalValue.length > limit; // 文字超出limit
  const hasError = exceedLimit || status === 'error';

  const innerSuffixNodeList = useMemo(() => {
    const innerSuffixNode = [];
    Children.forEach(suffixNode, child => {
      innerSuffixNode.push(child);
    });

    // 字数限制
    if (limit) {
      innerSuffixNode.unshift(<TextLimit value={finalValue} limit={limit} />);
    }

    // 状态反馈
    if (status && hasFeedback) {
      if (status === 'loading') {
        innerSuffixNode.unshift(
          <StyledStatusWrapper
            theme={theme}
            status={status}
            key="status"
            {...innerStyles.statusWrapper}
          >
            <Spin />
          </StyledStatusWrapper>,
        );
      } else {
        const statusIcon = {
          success: DefaultSuccessIcon,
          error: DefaultClearIcon,
          ...theme.components.Input.statusIcon,
        };
        const StatusIcon = statusIcon[status];
        innerSuffixNode.unshift(
          <StyledStatusWrapper
            theme={theme}
            status={status}
            key="status"
            {...innerStyles.statusWrapper}
          >
            <StatusIcon />
          </StyledStatusWrapper>,
        );
      }
    }

    // 清除输入框功能
    if (allowClear && finalValue && entered && !disabled) {
      const token = theme.components.Input;
      const ClearIcon = token.clearIcon || DefaultClearIcon;
      const {
        typography: {
          spec: { fontSize },
        },
      } = theme;
      const clearNode = (
        <ClearIconWrapper
          key="clear"
          $fontSize={fontSize[token.fontLevel[size!] as IFontSizeSpec]}
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
    return innerSuffixNode;
  }, [
    allowClear,
    clearReplace,
    disabled,
    entered,
    finalValue,
    handleClear,
    hasFeedback,
    innerStyles.clearWrapper,
    innerStyles.statusWrapper,
    limit,
    size,
    status,
    suffixNode,
    theme,
  ]);

  const finalChildren = useMemo(() => {
    if (multiline) {
      return (
        <StyledTextareaWrapper
          theme={theme}
          disabled={disabled}
          hasError={hasError}
          focus={focus}
          $width={addPx(width)}
          size={size}
          onClick={handleClick}
          className={className}
          style={style}
          ref={ref}
          {...textareaWrapperStyleItem}
        >
          <StyledTextarea
            ref={handleInputRef as Ref<HTMLTextAreaElement>}
            value={finalValue}
            disabled={disabled}
            theme={theme}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            limit={limit}
            size={size}
            autoFocus={autoFocus}
            onKeyDown={handleKeyDown}
            autosize={autosize}
            $height={addPx(height)}
            {...textareaStyleItem}
            {...other}
          />
          <StyledTextareaLimitWrapper theme={theme} size={size} {...innerStyles.textLimitWrapper}>
            <TextLimit value={finalValue} limit={limit} {...innerStyles.textLimit} />
          </StyledTextareaLimitWrapper>
        </StyledTextareaWrapper>
      );
    }

    return (
      <StyledInputWrapper
        theme={theme}
        disabled={disabled}
        hasError={hasError}
        focus={focus}
        $width={addPx(width)}
        $height={addPx(height)}
        size={size}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={ref}
        {...inputWrapperStyleItem}
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
          ref={handleInputRef as Ref<HTMLInputElement>}
          value={finalValue}
          disabled={disabled}
          theme={theme}
          size={size as any}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          {...innerStyles.input}
          {...other}
        />
        <ExtraNodes
          $type="suffix"
          theme={theme}
          size={size}
          nodes={innerSuffixNodeList}
          $nodeStyleItem={innerStyles.nodeWrapper}
          $dividerStyleItem={innerStyles.nodeDivider}
        />
      </StyledInputWrapper>
    );
  }, [
    autoFocus,
    autosize,
    className,
    disabled,
    finalValue,
    focus,
    handleBlur,
    handleChange,
    handleClick,
    handleFocus,
    handleInputRef,
    handleKeyDown,
    handleMouseEnter,
    handleMouseLeave,
    hasError,
    height,
    innerStyles.input,
    innerStyles.nodeDivider,
    innerStyles.nodeWrapper,
    innerStyles.textLimit,
    innerStyles.textLimitWrapper,
    innerSuffixNodeList,
    inputWrapperStyleItem,
    limit,
    multiline,
    other,
    prefixNode,
    ref,
    size,
    style,
    textareaStyleItem,
    textareaWrapperStyleItem,
    theme,
    width,
  ]);
  return finalChildren;
});

(Input as any).__MUYA_INPUT = true;

export default Input;
