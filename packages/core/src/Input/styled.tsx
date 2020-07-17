import React, { Children, useMemo } from 'react';
import styled, { css } from 'styled-components';

import { IComponentSizeSpec, IFontSizeSpec } from '@muya-ui/theme-light';

import ellipsisStyle from '../styled/mixins/ellipsis';
import { scrollBarStyle } from '../ScrollView/styled';
import { ICustomStyleItem, ISizeSpecBaseProps, IThemedBaseProps } from '../types';
import addPx from '../utils/addPx';
import InputTag from './InputTag';
import { IInputProps, IInputPureProps } from './types';

export type addonNodeType = 'suffix' | 'prefix';

export interface IStyledNodeProps extends IThemedBaseProps, ISizeSpecBaseProps {
  $type: addonNodeType;
  $small?: addonNodeType;
  nodes?: React.ReactNode;
  full?: boolean;
}

export interface IStyledExtraNodesProps extends IStyledNodeProps {
  $nodeStyleItem: ICustomStyleItem;
  $dividerStyleItem: ICustomStyleItem;
}

export interface IStyledWrapperProps extends IInputPureProps {
  /**
   * 容器是否聚焦，聚焦状态展示特殊样式
   *
   * @type {boolean}
   * @memberof IStyledWrapperProps
   */
  focus?: boolean;
  /**
   * 是否展示错误状态的样式
   *
   * @type {boolean}
   * @memberof IStyledWrapperProps
   */
  hasError?: boolean;
  $width?: string;
  $height?: string;
}

export interface IStyledTagsInputProps extends IThemedBaseProps {
  $disabled: boolean;
  $focus?: boolean;
  $width?: number | string;
  $size: IComponentSizeSpec;
  $hasValue: boolean;
  $maxVerticalTagCount: number;
  $maxTagWidth?: number;
  $hasError: boolean;
}

export interface IPopperInputWrapperProps extends IThemedBaseProps {
  $popupVisible: boolean;
  $width: string;
  $pointer: boolean;
  $status?: 'loading' | 'success' | 'error';
}

export function makeWrapperStyle(props: IStyledWrapperProps & IThemedBaseProps) {
  const { theme, size, disabled, focus, $width, $height, hasError } = props;
  const {
    colors: { pattern: colorsPattern },
    typography: {
      spec: { fontSize, lineHeight },
    },
    transition: {
      pattern: { easing, duration },
    },
    components: { Input: token },
  } = theme;
  const fontLevel = token.fontLevel[size!] as IFontSizeSpec;

  // 错误样式
  const errorStyle = css`
    border-color: ${colorsPattern.feature.error};
    box-shadow: ${token.errorFocusShadow};
  `;

  // 聚焦样式
  const focusStyle = css`
    border-color: ${token.borderColor.focused};
    box-shadow: ${token.focusShadow};
  `;

  // 禁用样式
  const disabledStyle = css`
    background: ${colorsPattern.background.disabled};
    cursor: not-allowed;
    input,
    svg {
      cursor: not-allowed;
    }
  `;

  const widthStyle =
    $width &&
    css`
      width: ${$width};
    `;
  const heightStyle =
    $height &&
    css`
      height: ${$height};
    `;
  return css`
    display: inline-flex;
    position: relative;
    box-sizing: border-box;
    align-items: center;
    font-size: ${fontSize[fontLevel]}px;
    line-height: ${lineHeight[fontLevel]}px;
    border-radius: ${token.borderRadius[size!]};
    border: 1px solid ${token.borderColor.normal};
    transition: border ${duration.status}ms ${easing.status};
    vertical-align: middle;
    background-color: ${token.bgColor};
    &:hover {
      /* 特殊状态下，hover不添加样式  */
      border-color: ${!(focus || disabled || hasError) && token.borderColor.hover};
    }

    ${widthStyle}
    ${heightStyle}
    ${focus && focusStyle}
    ${hasError && errorStyle}
    ${disabled && disabledStyle}
  `;
}

export function makeInputWrapperStyle(props: IStyledWrapperProps & IThemedBaseProps) {
  const { theme, size } = props;
  const { inputPadding, inputWidth, inputHeight } = theme.components.Input;
  return css`
    width: ${inputWidth[size!]}px;
    height: ${inputHeight[size!]}px;
    padding: 0 ${inputPadding[size!]}px;
  `;
}

export function makeTextareaStyle(props: IStyledWrapperProps & IThemedBaseProps) {
  const { theme, size, limit, resize = 'vertical', $height, autosize } = props;
  const {
    typography: {
      spec: { fontSize, lineHeight },
    },
    components: { Input: token },
  } = theme;
  const heightStyle =
    $height &&
    css`
      height: ${$height};
    `;
  const fontLevel = token.fontLevel[size!] as IFontSizeSpec;
  const padding = autosize ? token.autosizeTextareaPadding : token.textareaPadding;
  const limitStyle =
    limit &&
    limit > 0 &&
    css`
      ::-webkit-scrollbar {
        width: 0;
      }

      /* because border-box, use border to mantain the height */
      border-bottom: ${token.textareaLimitMarginBottom[size!]}px solid transparent;
      padding-bottom: 0;
      -ms-overflow-style: none;
      resize: none;
    `;
  return css`
    resize: ${resize};
    width: ${token.textareaWidth[size!]}px;
    height: ${token.textareaHeight[size!]}px;
    font-size: ${fontSize[fontLevel]}px;
    line-height: ${lineHeight[fontLevel]}px;
    padding: ${padding[size!].map(p => `${p}px `)};
    ${heightStyle}
    ${limitStyle}
  `;
}

export function makeInputStyle(props: IInputProps & IThemedBaseProps) {
  const {
    theme: {
      colors,
      typography: {
        spec: { fontSize, lineHeight },
      },
      components: { Input: token },
    },
    disabled,
    size,
  } = props;
  const fontLevel = token.fontLevel[size!] as IFontSizeSpec;
  return css`
    display: inline-block;
    outline: none;
    border: 0;
    padding: 0;
    margin: 0;
    flex: 1;

    /*
      the input has defalut width; should fix it
      see:  https://stackoverflow.com/questions/42421361/input-button-elements-not-shrinking-in-a-flex-container
    */
    min-width: 0;
    background: none;
    font-size: ${fontSize[fontLevel]}px;
    line-height: ${lineHeight[fontLevel]}px;
    caret-color: ${colors.spec.brand};
    color: ${disabled ? colors.pattern.text.disabled : token.color};
    ${disabled &&
      css`
        /* fix disabled input color */
        -webkit-text-fill-color: currentColor;
        opacity: 1;
      `}

    &::selection {
      background: ${token.selectionBackground};
    }
    &::placeholder {
      color: ${colors.pattern.text.placeholder};
    }
  `;
}

export function makeStatusWrapperStyle(props: IInputProps & IThemedBaseProps) {
  const { theme, status } = props;
  if (status) {
    return css`
      line-height: 0;
      cursor: default;
      color: ${theme.colors.pattern.feature[status!]};
    `;
  }
}

export function makeTextareaLimitWrapper(props: IInputProps & IThemedBaseProps) {
  const { theme, size } = props;
  const { right, bottom } = theme.components.Input.textareaLimitPosition[size!];
  return css`
    position: absolute;
    right: ${right}px;
    bottom: ${bottom}px;
  `;
}

export const StyledInputWrapper = styled.div<IStyledWrapperProps>`
  ${makeInputWrapperStyle}
  ${makeWrapperStyle}
`;

export const StyledTextareaWrapper = styled.div<IStyledWrapperProps>`
  ${makeWrapperStyle}
`;

export const StyledInput = styled.input<IInputProps>`
  ${makeInputStyle}
`;

export const StyledTextarea = styled.textarea<IInputProps & IStyledWrapperProps>`
  ${makeInputStyle}
  ${makeTextareaStyle}
`;

function makeAddonNodeMarginStyle(props: IStyledNodeProps) {
  const { theme, size, $type, $small } = props;
  const spacing = theme.components.Input.inputPadding[size!];
  const left = theme.components.Input.inputAddonNodeMargin[size!];

  let marginRight = spacing;
  let marginLeft = spacing;
  if ($small === 'prefix') {
    marginRight = left;
  } else if ($small === 'suffix') {
    marginLeft = left;
  }
  return $type === 'prefix'
    ? css`
        margin-right: ${marginRight}px;
      `
    : css`
        margin-left: ${marginLeft}px;
      `;
}

export const StyledNodeWrapper = styled.div<IStyledNodeProps>`
  ${props => {
    const { theme, children } = props;
    const token = theme.components.Input;
    const { darktip, secondary, assistant } = theme.colors.pattern.text;

    // 字符串节点固定颜色。React节点有特殊颜色
    const elementStyle =
      typeof children !== 'string' &&
      css`
        color: ${darktip};
        &:hover {
          color: ${secondary};
        }
        &:active {
          color: ${assistant};
        }

        cursor: pointer;
      `;

    return css`
      ${makeAddonNodeMarginStyle(props)}
      line-height: 0;
      color: ${token.color};
      flex-shrink: 0;
      outline: none;
      cursor: default;
      user-select: none;
      display: flex;
      height: 100%;
      align-items: center;
      ${elementStyle}
    `;
  }}
`;

export const StyledDivider = styled.div<IStyledNodeProps>`
  ${props => {
    const { theme, size = 'm' } = props;
    const fontLevel = theme.components.Input.fontLevel[size!] as IFontSizeSpec;
    return css`
      ${makeAddonNodeMarginStyle(props)}
      width: 1px;
      height: ${theme.typography.spec.fontSize[fontLevel]}px;
      flex-shrink: 0;
      cursor: default;
      user-select: none;
      background: ${theme.colors.pattern.background.divider};
    `;
  }}
`;

export function ExtraNodes(props: IStyledExtraNodesProps) {
  const { nodes, $type, size, theme, full, $nodeStyleItem, $dividerStyleItem } = props;
  return useMemo(() => {
    if (!nodes) {
      return null;
    }
    const childNum = Children.count(nodes);
    return (
      <>
        {Children.map(nodes, (child, index) => {
          if (!child) return null;
          let $small: addonNodeType | undefined;
          if (!full && index === childNum - 1 && $type === 'prefix') {
            $small = 'prefix';
          }

          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <StyledDivider $type={$type} theme={theme} size={size} {...$dividerStyleItem} />
              )}
              <StyledNodeWrapper
                $type={$type}
                theme={theme}
                size={size}
                {...$nodeStyleItem}
                $small={$small}
              >
                {child}
              </StyledNodeWrapper>
            </React.Fragment>
          );
        })}
        {full && <StyledNodeWrapper $type={$type} theme={theme} size={size} {...$nodeStyleItem} />}
      </>
    );
  }, [$dividerStyleItem, $nodeStyleItem, $type, full, nodes, size, theme]);
}

export const StyledStatusWrapper = styled.div`
  ${makeStatusWrapperStyle}
`;

export const StyledTextareaLimitWrapper = styled.div`
  ${makeTextareaLimitWrapper}
`;

// tags input
export const StyledTagsInputContentWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  outline: none;
`;

export const StyledTagsWrapper = styled.div`
  align-self: flex-start;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const StyledTagsInput = styled.input`
  display: inline-block;
  overflow: hidden;
  background: transparent;
  border-width: 0;
  margin: 0;
  padding: 0;
  outline: 0;
  margin-bottom: 4px;
`;

export const StyledInputSizer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  height: 0;
  overflow: scroll;
  white-space: pre;
  line-height: 1;
`;

export const StyledTagsInputSuffixNodeWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: auto;
`;

const tagsInputCss = (props: IStyledTagsInputProps) => {
  const {
    theme: {
      colors: { pattern: colorsPattern },
      typography: {
        spec: { fontSize },
      },
      size: { spec: sizeSpec },
      transition: {
        pattern: { duration, easing },
      },
      components: { Input: token },
    },
    $size,
    $width,
    $focus,
    $disabled,
    $hasValue,
    $maxVerticalTagCount,
    $maxTagWidth,
    $hasError,
  } = props;
  const hasStatus = $focus || $disabled || $hasError;
  const finalWidth = $width || sizeSpec.width[$size!];
  let computedMaxTagWidth = $maxTagWidth;
  if (!$maxTagWidth && typeof finalWidth === 'number') {
    computedMaxTagWidth =
      finalWidth - token.tagsInput.contentPaddingRight[$size] - token.inputTag.outerPadding * 2;
  }
  const fontLevel = token.fontLevel[$size];
  const disabledCss = css`
    background: ${colorsPattern.background.disabled};
    border: 1px solid ${token.borderColor.normal};
    cursor: not-allowed;
  `;
  // 错误样式
  const errorStyle = css`
    border-color: ${colorsPattern.feature.error};
    box-shadow: ${$focus ? token.errorFocusShadow : 'none'};
  `;
  return css`
    position: relative;
    display: inline-flex;
    overflow: hidden;
    outline: none;
    box-sizing: border-box;
    width: ${addPx(finalWidth)};
    border: 1px solid ${$focus ? token.borderColor.focused : token.borderColor.normal};
    box-shadow: ${$focus ? token.focusShadow : 'none'};
    border-radius: ${token.borderRadius[$size]};
    background: ${token.bgColor};
    line-height: 1;
    font-size: ${fontSize[fontLevel]}px;
    transition: border ${duration.status}ms ${easing.status};
    cursor: text;
    &:hover {
      border-color: ${!hasStatus && token.borderColor.hover};
    }

    ${$hasValue &&
      css`
        padding: ${token.tagsInput.wrapperPadding};
      `};
    ${$disabled && disabledCss}
    ${$hasError && errorStyle}

    ${StyledTagsInputContentWrapper} {
      padding-left: ${token.inputPadding[$size]}px;
      padding-right: ${token.tagsInput.contentPaddingRight[$size]}px;
      max-height: ${$maxVerticalTagCount * (token.inputHeight[$size] - 2) - 12}px;
      ${$hasValue &&
        css`
          padding-left: 0;
        `};
      ${scrollBarStyle({ theme: props.theme, hideEndButton: true })};
    }
    ${StyledTagsInputSuffixNodeWrapper} {
      right: ${token.inputPadding[$size]}px;
    }
    ${StyledTagsInput} {
      width: ${$focus ? '1em' : '1px'};
      color: ${colorsPattern.text.text};
    }
    input {
      &[readonly] {
        cursor: ${$disabled ? 'not-allowed' : 'pointer'};
      }
      &::placeholder {
        color: ${colorsPattern.text.placeholder};
      }
    }
    ${StyledInputSizer} {
      font-size: ${fontSize[fontLevel]}px;
    }
    ${StyledTagsWrapper} {
      ${!$hasValue &&
        css`
          height: ${token.inputHeight[$size] - 2}px;
          ${StyledTagsInput} {
            margin-bottom: 0;
          }
        `}
    }
    ${InputTag} {
      max-width: ${computedMaxTagWidth}px;
    }
  `;
};

export const StyledTagsInputWrapper = styled.div`
  ${tagsInputCss}
`;

export const StyledPopperInputWrapper = styled.div<IPopperInputWrapperProps>`
  position: relative;
  display: inline-block;
  outline: none;
  ${StyledInput} {
    ${ellipsisStyle};
  }

  ${props => {
    const { $pointer, $popupVisible, $width, $status, theme } = props;
    let openStyle;
    let widthStyle;
    let pointerStyle;
    if ($popupVisible && $status !== 'error') {
      openStyle = css`
        ${StyledTagsInputWrapper}, ${StyledInputWrapper} {
          border-color: ${theme.components.Input.borderColor.focused};
        }
      `;
    }
    if ($width) {
      widthStyle = css`
        width: ${$width};
      `;
    }
    if ($pointer) {
      pointerStyle = css`
        ${StyledInputWrapper}, ${StyledTagsInputWrapper} {
          cursor: pointer;
          input,
          svg {
            cursor: pointer;
          }
        }
      `;
    }
    return css`
      ${widthStyle};
      ${openStyle};
      ${pointerStyle}
    `;
  }}
`;
