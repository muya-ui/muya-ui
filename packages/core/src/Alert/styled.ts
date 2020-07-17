import styled, { css } from 'styled-components';

import { IComponentSizeSpec } from '@muya-ui/theme-light';

import { StyledButton, StyledLink } from '../Button/styled';
import { IThemedBaseProps } from '../types';
import { IAlertProps } from './types';

interface IBaseSizeProps {
  $size: IComponentSizeSpec;
}

export interface IStyledAlertProps extends IThemedBaseProps, IBaseSizeProps {
  $type: Required<IAlertProps>['type'];
  $hasTitle?: boolean;
  $hasDesc?: boolean;
  $showIcon?: boolean;
  $showClose?: boolean;
}

export interface IStyledIconProps extends IThemedBaseProps, IBaseSizeProps {
  $type: Required<IAlertProps>['type'];
  $hasTitleAndDesc?: boolean;
}

export interface IStyledCloseProps extends IThemedBaseProps, IBaseSizeProps {
  $hasTitleAndDesc?: boolean;
}

export interface IStyledTitleProps extends IThemedBaseProps, IBaseSizeProps {
  $hasDesc?: boolean;
}

export const StyledAlert = styled.div`
  ${(props: IStyledAlertProps) => {
    const { $type, $hasTitle, $hasDesc, $showIcon, $showClose, $size, theme } = props;
    const {
      typeBg,
      typeBorder,
      borderRadius,
      padding,
      hasIconPaddingLeft,
      hasIconAndDescPaddingLeft,
      hasCloseIconPaddingRight,
      hasTitleAndDescPaddingVertical,
    } = theme.components.Alert;
    let [top, right, bottom, left] = padding[$size];
    if ($showIcon) {
      left = $hasDesc ? hasIconAndDescPaddingLeft[$size] : hasIconPaddingLeft[$size];
    }
    if ($showClose) {
      right = hasCloseIconPaddingRight[$size];
    }
    if ($hasTitle && $hasDesc) {
      top = hasTitleAndDescPaddingVertical[$size];
      bottom = hasTitleAndDescPaddingVertical[$size];
    }
    return css`
      position: relative;
      box-sizing: border-box;
      background-color: ${typeBg[$type!]};
      border: ${typeBorder[$type!]};
      border-radius: ${borderRadius};

      /** 直接改 Button 存在风险，因此覆盖 */
      & ${StyledButton}, & ${StyledLink} {
        vertical-align: unset;
      }

      ${StyledAlertContainer} {
        padding: ${top}px ${right}px ${bottom}px ${left}px;
      }
    `;
  }}
`;

export const StyledAlertContainer = styled.div`
  position: relative;
  margin: 0 auto;
`;

export const StyledIcon = styled.div`
  ${(props: IStyledIconProps) => {
    const { $type, theme, $hasTitleAndDesc, $size } = props;
    const {
      left: iconLeft,
      hasTitleAndDescLeft,
      top: iconTop,
      hasTitleAndDescTop,
    } = theme.components.Alert.icon;
    const { lineHeight } = theme.components.Alert.title;
    const finalLineHeight = $hasTitleAndDesc ? 1 : `${lineHeight[$size]}px`;
    const left = $hasTitleAndDesc ? hasTitleAndDescLeft : iconLeft[$size];
    const top = $hasTitleAndDesc ? hasTitleAndDescTop : iconTop[$size];
    return css`
      position: absolute;
      left: ${left}px;
      top: ${top}px;
      color: ${theme.colors.pattern.feature[$type!]};
      font-size: 0;
      line-height: ${finalLineHeight};
    `;
  }}
`;

export const StyledClose = styled.div`
  ${(props: IStyledCloseProps) => {
    const { theme, $hasTitleAndDesc, $size } = props;
    const { closeIconTop, closeIconRight, hasTitleAndDescCloseIconTop } = theme.components.Alert;
    let finalTop = closeIconTop[$size];
    if ($hasTitleAndDesc) {
      finalTop = hasTitleAndDescCloseIconTop;
    }
    return css`
      position: absolute;
      right: ${closeIconRight}px;
      top: ${finalTop}px;
      line-height: 0;
    `;
  }}
`;

export const StyledTitle = styled.div`
  ${(props: IStyledTitleProps) => {
    const { theme, $size, $hasDesc } = props;
    const {
      colors,
      typography: {
        spec: { fontWeight },
      },
    } = theme;
    const {
      fontSize,
      lineHeight,
      textFine,
      hasDescTextFine,
      hasDescFontSize,
      hasDescLineHeight,
      hasDescMarginBottom,
    } = theme.components.Alert.title;
    const finalTextFine = $hasDesc ? hasDescTextFine : textFine;
    const finalFontSize = $hasDesc ? hasDescFontSize : fontSize[$size];
    const finalLineHeight = $hasDesc ? hasDescLineHeight : lineHeight[$size];
    const finalMarginBottom = $hasDesc ? hasDescMarginBottom : 0;
    return css`
      color: ${colors.pattern.text.title};
      font-size: ${finalFontSize}px;
      line-height: ${finalLineHeight}px;
      font-weight: ${finalTextFine ? fontWeight.regular : fontWeight.semibold};
      margin-bottom: ${finalMarginBottom}px;
    `;
  }}
`;

export const StyledDesc = styled.span`
  ${(props: IThemedBaseProps) => {
    const { theme } = props;
    const { colors } = theme;
    const { fontSize, lineHeight } = theme.components.Alert.desc;
    return css`
      color: ${colors.pattern.text.text};
      font-size: ${fontSize}px;
      line-height: ${lineHeight}px;
    `;
  }}
`;
