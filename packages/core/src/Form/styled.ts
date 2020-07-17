import styled, { css } from 'styled-components';

import { IComponentSizeSpec, ITheme } from '@muya-ui/theme-light';

import { ILabelPosition } from './types';

interface IStyledFormItemProps {
  $inline: boolean;
  $labelWidth: string;
  $labelPosition: ILabelPosition;
  $size: IComponentSizeSpec;
  $inlineAndNoLabel: boolean;
  $theme: ITheme;
  $inlineSpacing: number;
}

export const StyledLabel = styled.label``;

export const StyledInnerLabel = styled.span``;

export const StyledInputWrapper = styled.div``;

export const StyledRequiredWrapper = styled.div``;

export const StyledError = styled.div``;

export const StyledFormItem = styled.div<IStyledFormItemProps>`
  ${props => {
    const {
      $inline,
      $labelWidth,
      $labelPosition,
      $size,
      $theme,
      $inlineAndNoLabel,
      $inlineSpacing,
    } = props;
    const {
      labelPaddingRight,
      labelHeight,
      topLabelPaddingBottom,
      requiredTipMarginRight,
      requiredFontLevel,
      labelFontSizeLevel,
      errorMinHeight,
      errorPaddingBottom,
      errorPaddingTop,
    } = $theme.components.Form;

    // inline模式 & 没有传label，label容器是不渲染的，error也就不需要margin-left了
    const errorMarginStyle = css`
      margin-left: ${$inlineAndNoLabel ? 0 : $labelWidth};
    `;
    // label在上时要特殊处理
    const labelStyle =
      $labelPosition === 'top'
        ? css`
            ${StyledLabel} {
              text-align: left;
              padding-bottom: ${topLabelPaddingBottom[$size]}px;
            }
            ${StyledInputWrapper} {
              flex-flow: column nowrap;
            }
          `
        : css`
            ${StyledLabel} {
              display: flex;
              align-items: center;
              align-self: flex-start;
              width: ${$labelWidth};
              min-height: ${labelHeight[$size]}px;
              justify-content: ${$labelPosition === 'right' ? 'flex-end' : 'flex-start'};
              padding-right: ${labelPaddingRight[$size]}px;
            }
            ${StyledError} {
              ${errorMarginStyle}
            }
            ${StyledInputWrapper} {
              align-items: center;
            }
          `;

    return css`
      vertical-align: top;
      ${$inline &&
        css`
          display: inline-block;
          margin-right: ${$inlineSpacing}px;
          &:last-of-type {
            margin-right: 0;
          }
        `}
      ${StyledLabel} {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        flex-shrink: 0;
        font-size: ${$theme.typography.spec.fontSize[labelFontSizeLevel[$size]]}px;
        line-height: ${$theme.typography.spec.lineHeight[labelFontSizeLevel[$size]]}px;
        color: ${$theme.colors.pattern.text.text};
      }
      ${StyledRequiredWrapper} {
        margin-right: ${requiredTipMarginRight}px;
        color: ${$theme.colors.spec.danger};
        font-size: ${$theme.typography.spec.fontSize[requiredFontLevel]}px;
        line-height: 1;
        padding-top: 2px;
      }
      ${StyledError} {
        box-sizing: border-box;
        padding-top: ${errorPaddingTop}px;
        padding-bottom: ${errorPaddingBottom}px;
        min-height: ${errorMinHeight[$size]}px;
      }
      ${StyledInnerLabel} {
        display: inline-flex;
        position: relative;
        align-items: flex-start;
      }
      ${StyledInputWrapper} {
        display: flex;
      }
      ${labelStyle}
    `;
  }}
`;
