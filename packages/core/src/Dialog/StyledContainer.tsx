import styled, { css } from 'styled-components';

import { IComponentSizeSpec } from '@muya-ui/theme-light';

import { IThemedBaseProps } from '../types';

interface IStyledDialogContainerProps extends IThemedBaseProps {
  $fullScreen?: boolean;
  $fullWidth?: boolean;
  $size?: IComponentSizeSpec;
  $disableSize?: boolean;
  $maxHeight: string;
  $width: string;
  $height: string;
}

// 这里没有用min-width，因为容器需要限制宽度，如有需要外部可以禁用默认宽高
function makeContainerStyle(props: IStyledDialogContainerProps) {
  const {
    $size = 'l',
    $disableSize,
    $fullWidth,
    $fullScreen,
    $width,
    $height,
    $maxHeight,
    theme,
  } = props;
  let minSizeStyle;
  let fullWidthStyle;
  let fullScreenStyle;
  let customWidthStyle;
  let customHeightStyle;
  let customMaxHeightStyle;

  // disableSize为true，禁用默认样式
  if (!$disableSize) {
    const currentMinSize = theme.components.Dialog.size[$size];
    minSizeStyle = css`
      width: ${currentMinSize.width}px;
      min-height: ${currentMinSize.height}px;
    `;
  }

  if ($fullWidth) {
    const { marginTopAndBottom, widthPrecent } = theme.components.Dialog.fullWidth;
    fullWidthStyle = css`
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      margin: ${marginTopAndBottom}px 0;
      width: ${widthPrecent}%;
      min-height: calc(100% - ${2 * marginTopAndBottom}px);
      max-height: calc(100% - ${2 * marginTopAndBottom}px);
    `;
  }

  if ($fullScreen) {
    fullScreenStyle = css`
      left: 0;
      top: 0;
      transform: none;
      margin: 0;
      width: 100%;
      min-height: 100%;
      max-height: 100%;
      max-width: 100%;
      border-radius: 0;
    `;
  }

  if ($width) {
    customWidthStyle = css`
      width: ${$width};
    `;
  }

  if ($height) {
    customHeightStyle = css`
      height: ${$height};
    `;
  }

  if ($maxHeight) {
    customMaxHeightStyle = css`
      max-height: ${$maxHeight};
    `;
  }

  return css`
    ${minSizeStyle}
    ${fullWidthStyle}
    ${fullScreenStyle}
    ${customWidthStyle}
    ${customHeightStyle}
    ${customMaxHeightStyle}
  `;
}

export default styled.div<IStyledDialogContainerProps>`
  ${props => {
    const {
      colors,
      components: { Dialog: token },
    } = props.theme;
    return css`
      display: flex;
      flex-flow: column nowrap;
      position: absolute;
      left: 50%;
      box-sizing: border-box;
      pointer-events: auto;
      top: ${token.top}%;
      transform: ${`translate(-50%, -${token.top}%)`};
      background: ${colors.pattern.background.higher};
      border-radius: ${token.containerBorderRadius};
      box-shadow: ${token.shadow};
      ${makeContainerStyle}
    `;
  }}
`;
