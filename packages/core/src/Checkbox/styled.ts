import { HtmlHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { IComponentSizeSpec, StyledSvg } from '@muya-ui/theme-light';

import { ellipsisWithWidth } from '../styled/mixins/ellipsis';

interface IStyledCheckboxLabelBaseProps {
  $size: IComponentSizeSpec;
  $checked: boolean;
  $disabled: boolean;
  $indeterminate: boolean;
  $width?: string | number;
  $ellipsis: boolean;
}

type IStyledCheckboxLabelProps = IStyledCheckboxLabelBaseProps &
  HtmlHTMLAttributes<HTMLLabelElement>;

export const StyledCheckboxInput = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`;

export const StyledCheckboxSpan = styled.span`
  position: relative;
  top: -0.09em;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  outline: none;
  cursor: pointer;
`;

export const StyledCheckboxIconWrap = styled.span``;

export const StyledCheckboxContent = styled.span``;

// 注意，在 Button 里会覆盖 这里的 line-height
export const StyledCheckboxLabel = styled.label<IStyledCheckboxLabelProps>`
  ${props => {
    const {
      theme: {
        opacity,
        transition: { pattern: transitionPattern },
        typography: {
          spec: { fontSize, lineHeight },
        },
        components: { Checkbox: token },
      },
      $disabled,
      $size,
      $indeterminate,
      $checked,
      $width,
      $ellipsis,
    } = props;
    const { iconColor, iconFontSize, textIconSpacing } = token;
    const fontLevel = token.fontLevel[$size];
    const size = iconFontSize[$size];

    return css`
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      display: inline-block;
      font-size: ${fontSize[fontLevel]}px;
      line-height: 0;
      font-variant: tabular-nums;
      font-feature-settings: 'tnum';
      color: ${token.labelColor};
      cursor: pointer;

      ${StyledCheckboxContent} {
        padding: 0 ${textIconSpacing[$size]}px;
        line-height: ${lineHeight[fontLevel]}px;
      }

      ${StyledCheckboxIconWrap} {
        position: relative;
        display: inline-flex;
        vertical-align: text-top;
        font-size: ${size}px;
        height: ${size}px;
        width: ${size}px;
        line-height: ${size}px;
        padding: 0;
        color: ${$checked ? iconColor.checked.normal : iconColor.unChecked.normal};

        ${StyledSvg} {
          z-index: 1;
          transition: color ${transitionPattern.easing.status} ${
      transitionPattern.duration.status
    }ms;
        }
      }

      ${$disabled &&
        css`
          cursor: not-allowed;
          opacity: ${opacity.pattern.disabled};
          ${StyledCheckboxInput}, ${StyledCheckboxSpan} {
            cursor: not-allowed;
          }
        `}

      ${!$disabled &&
        !$indeterminate &&
        css`
          &:hover ${StyledCheckboxIconWrap} ${StyledSvg} {
            color: ${$checked ? iconColor.checked.hover : iconColor.unChecked.hover};
          }
          &:active ${StyledCheckboxIconWrap} ${StyledSvg} {
            color: ${$checked ? iconColor.checked.click : iconColor.unChecked.click};
          }
        `}

      ${$indeterminate &&
        css`
          ${StyledCheckboxIconWrap} ${StyledSvg} {
            color: ${iconColor.indeterminate.normal};
          }
          &:hover ${StyledCheckboxIconWrap} ${StyledSvg} {
            color: ${iconColor.indeterminate.hover};
          }
          &:active ${StyledCheckboxIconWrap} ${StyledSvg} {
            color: ${iconColor.indeterminate.click};
          }
        `}

      ${ellipsisWithWidth($ellipsis, $width)}
    `;
  }}
`;

export const StyledCheckboxGroup = styled.div`
  ${StyledCheckboxLabel} {
    margin-right: ${props => props.theme.components.Checkbox.marginRightInGroup}px;
  }
`;
