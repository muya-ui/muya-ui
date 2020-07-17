import styled, { css } from 'styled-components';

import { ITheme } from '@muya-ui/theme-light';

import { scrollBarStyle } from '../ScrollView/styled';
import addPx from '../utils/addPx';
import { StyledTree } from '../Tree/styled';

export interface IStyledTreePopupProps {
  theme: ITheme;
  $width: string | number;
  $showEmptyView: boolean;
}

export const StyledTreeScrollContainer = styled.div``;

export const StyledTreePopup = styled.div<IStyledTreePopupProps>`
  ${props => {
    const {
      theme: {
        shadows,
        colors,
        components: { TreeSelect: token },
      },
      $width,
      $showEmptyView,
    } = props;
    let emptyStyle;
    if ($showEmptyView) {
      emptyStyle = css`
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 0;
        min-height: ${token.treeHeight}px;
      `;
    }
    return css`
      box-sizing: border-box;
      width: ${addPx($width)};
      box-shadow: ${shadows.pattern.popper.normal};
      padding-right: ${token.popupPadding}px;
      padding-bottom: ${token.popupPadding}px;
      background: ${colors.pattern.background.higher};
      ${emptyStyle};
      ${StyledTreeScrollContainer} {
        max-height: ${token.treeHeight}px;
        overflow: auto;
        ${scrollBarStyle({ theme: props.theme, hideEndButton: true })};
        ${StyledTree} {
          overflow: unset;
        }
      }
    `;
  }}
`;

export const StyledTreeNodeLabelWithIcon = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
