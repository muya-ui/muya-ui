import { css, ThemedStyledProps } from 'styled-components';

import { IComponentSizeSpec, ITheme } from '@muya-ui/theme-light';

import addPx from '../utils/addPx';
import { IButtonPureProps, IButtonType } from './types';

/**
 * 需要高亮 hover 态的中性色按钮
 */
export function highlightNeutralColorButtonType(type: IButtonType) {
  return type === 'normal' || type === 'strong' || type === 'secondary';
}

export function siblingCss(
  size: IComponentSizeSpec,
  theme: ITheme,
  inGroup: boolean,
  disableSiblingMargin: boolean,
) {
  const margin = theme.components.Button.siblingSpacing[size];
  if (margin > 0 && !inGroup && !disableSiblingMargin) {
    return css`
      & + & {
        margin-left: ${theme.components.Button.siblingSpacing[size]}px;
      }
    `;
  }
  return '';
}

export const buttonSizeCSS = (props: ThemedStyledProps<IButtonPureProps, ITheme>) => {
  const {
    size = 'm',
    theme,
    shape: propShape,
    block,
    groupType,
    fontWeight: propFontWeight,
    plain,
    width,
  } = props;
  const {
    size: { spec: sizeSpec },
    components,
  } = theme;
  const { Button: btnToken } = components;
  const height = sizeSpec.height[size];
  const padding = btnToken.padding[size];
  const fontWeight = propFontWeight === 'lighter' ? btnToken.fineFontWeight : btnToken.fontWeight;

  const buttonShape = propShape || btnToken.defaultShape;
  const plainIsLight = btnToken.plainIsLight;

  let borderRadiusCSS;
  if (groupType === 'group') {
    borderRadiusCSS = css`
      border-radius: ${btnToken.borderRadius.group};
      margin-left: -1px;
    `;
  } else if (buttonShape === 'circle') {
    borderRadiusCSS = css`
      border-radius: ${btnToken.borderRadius.circle};
    `;
  } else if (buttonShape === 'round') {
    borderRadiusCSS = css`
      border-radius: ${btnToken.borderRadius.round};
    `;
  } else {
    borderRadiusCSS = css`
      border-radius: ${btnToken.borderRadius.normal};
    `;
  }

  let innerLeftPadding = padding;
  let innerRightPadding = padding;
  // 有border的时候为了间距对齐，处理一下 padding
  if ((plain && !plainIsLight) || groupType === 'group') {
    innerLeftPadding = padding - 1;
    innerRightPadding = padding - 1;
  } else if (groupType === 'head') {
    innerRightPadding = padding - 1;
  } else if (groupType === 'tail') {
    innerLeftPadding = padding - 1;
  }
  let innerWidth;
  if (buttonShape === 'square' || buttonShape === 'circle') {
    innerWidth = `${height}px`;
  } else if (block) {
    innerWidth = '100%';
  } else if (width) {
    innerWidth = addPx(width);
  }
  return css`
    height: ${height}px;
    padding: 0 ${innerRightPadding}px 0 ${innerLeftPadding}px;
    font-weight: ${fontWeight};
    font-size: ${btnToken.fontSize[size]}px;
    line-height: ${btnToken.lineHeight[size]}px;
    ${innerWidth &&
      css`
        width: ${innerWidth};
      `}
    ${borderRadiusCSS}
  `;
};
