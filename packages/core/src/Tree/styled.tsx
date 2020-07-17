import styled, { css, keyframes } from 'styled-components';

import { IComponentSizeSpec } from '@muya-ui/theme-light';

import { StyledCheckboxLabel, StyledCheckboxSpan } from '../Checkbox/styled';
import ellipsisStyle from '../styled/mixins/ellipsis';
import { itemDisabledStyle, itemNormalStyle, itemSelectedStyle } from '../styled/mixins/item';
import listResetStyle from '../styled/mixins/listReset';
import { scrollBarStyle } from '../ScrollView/styled';
import { IThemedBaseProps } from '../types';
import Typography from '../Typography';

export interface IStyledTreeProps extends IThemedBaseProps {
  $size: IComponentSizeSpec;
  $scrollable: boolean;
}

export interface IStyledTreeNodeProps extends IThemedBaseProps {
  $size: IComponentSizeSpec;
  $isLeaf: boolean;
  $level: number;
  $selected: boolean;
  $disabled: boolean;
  $dragNodeHighlight: boolean;
  $dragOver: boolean;
  $dragOverGapTop: boolean;
  $dragOverGapBottom: boolean;
  $showLine: boolean;
}

// expand 动画
export const expandedRotateKeyframes = keyframes`
  to {
    transform: rotate(90deg);
  }
`;

export const notExpandedRotateKeyframes = keyframes`
  from {
    transform: rotate(90deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

export const StyledTitle = styled(Typography.Text)``;

export const StyledTreeIconWrapper = styled.div``;

// node content
export const StyledTreeNodeContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const StyledTreeNodeLabel = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const StyledChildTree = styled.ul`
  ${listResetStyle};
`;

export const StyleExpandHotZone = styled.div``;

export const StyledExpandHotZoneLine = styled.div``;

export const StyledTreeNodeSelectorWrapper = styled.div`
  display: inline-flex;
  width: 100%;
`;

export const StyledTreeNodeSelector = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
`;

// node
const treeNodeCss = (props: IStyledTreeNodeProps) => {
  const {
    theme: {
      colors,
      transition: {
        pattern: { duration, easing },
      },
      components: { Tree: token },
    },
    $size,
    $dragNodeHighlight,
    $dragOver,
    $dragOverGapTop,
    $dragOverGapBottom,
    $isLeaf,
    $level,
    $selected,
    $disabled,
    $showLine,
  } = props;
  return css`
    position: relative;
    display: flex;
    flex-direction: column;
    & > ${StyledTreeNodeContent} {
      margin: ${token.contentMargin}px;
      height: ${token.nodeHeight[$size]}px;
      line-height: ${token.lineHeight[$size]}px;
      padding-left: ${$level === 0 ? token.firstNodePaddingLeft[$size] : 0}px;
      padding-right: ${token.contentPaddingRight[$size]}px;
      cursor: pointer;
      z-index: 1;
      transition: background-color ${duration.status}ms ${easing.status},
        color ${duration.status}ms ${easing.status};
      ${itemNormalStyle(token)}
      ${$level === 0 && `color: ${token.rootLevelColor}`};
      ${$dragOverGapTop &&
        css`
          border-top: 1px solid ${token.dragOverGapColor};
        `}
      ${$dragOverGapBottom &&
        css`
          border-bottom: 1px solid ${token.dragOverGapColor};
        `}
      ${$dragOver &&
        css`
          background: ${token.dragOverBgColor};
        `}
      ${$dragNodeHighlight &&
        css`
          opacity: ${token.dragNodeHighlightOpacity};
        `}
      ${$selected &&
        css`
          ${itemSelectedStyle(token)}
          ${StyledExpandHotZoneLine} {
            background: transparent;
          }
        `}
      ${$disabled && itemDisabledStyle(token)}
      ${$isLeaf &&
        $level !== 0 &&
        css`
          margin-left: 0;
          padding-left: ${token.contentMargin}px;
        `}

      &:hover ${StyledExpandHotZoneLine} {
        background: transparent;
      }
    }

    ${StyledTreeIconWrapper} {
      font-size: ${token.iconFontSize[$size]}px;
      margin-right: ${token.iconWrapperMarginRight}px;
    }

    ${StyledCheckboxSpan} {
      top: 0;
    }

    ${StyledCheckboxLabel} {
      margin-right: ${token.checkboxMarginRight}px;
    }

    ${StyleExpandHotZone} {
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      line-height: ${token.nodeHeight[$size]}px;
      width: ${token.expandIconWrapperWidth}px;
      height: ${token.nodeHeight[$size]}px;
      margin-right: ${token.expandIconWrapperMarginRight}px;
      cursor: pointer;
    }

    ${$showLine &&
      !$isLeaf &&
      css`
        &::before {
          position: absolute;
          top: ${token.lineVertical.top}px;
          bottom: ${token.lineVertical.bottom}px;
          left: ${$level === 0
            ? token.lineVertical.firstLevelLeft
            : token.lineVertical.otherLevelLeft}px;
          width: ${token.lineSize}px;
          background: ${colors.pattern.background.divider};
          content: ' ';
        }
      `}

    ${$showLine &&
      $level > 0 &&
      css`
        ${StyledExpandHotZoneLine} {
          position: relative;
          width: 100%;
          height: ${token.lineSize}px;
          background: ${colors.pattern.background.divider};
          left: ${token.lineHorizontal.left}px;
        }
        ${StyleExpandHotZone}::before {
          position: absolute;
          top: ${token.lineHorizontal.beforeTop}px;
          left: ${token.lineHorizontal.beforeLeft}px;
          height: ${token.lineSize}px;
          width: ${token.lineHorizontal.beforeWidth}px;
          background: ${colors.pattern.background.divider};
          content: ' ';
        }
      `}

    ${StyledTitle} {
      font-size: ${token.fontSize[$size]}px;
      line-height: ${token.lineHeight[$size]}px;
      color: inherit;
      white-space: nowrap;
    }

    & > ${StyledChildTree} {
      padding-left: ${
        $level === 0 ? token.childIndent + token.firstNodePaddingLeft[$size] : token.childIndent
      }px;
    }
  `;
};

// tree
export const StyledTreeNode = styled.li`
  ${listResetStyle};
  ${treeNodeCss};
`;

const scrollableCss = css`
  ${StyledTreeNodeContent} {
    width: fit-content;
  }
`;

const notScrollableCss = css`
  overflow: hidden;
  ${StyledTreeNodeSelectorWrapper} {
    ${ellipsisStyle};
    ${StyledTitle} {
      ${ellipsisStyle};
    }
    ${StyledTreeNodeSelector} {
      overflow: hidden;
    }
  }
`;

const treeCss = (props: IStyledTreeProps) => {
  const {
    theme: {
      colors: { pattern: colorsPattern },
      components: { Tree: token },
    },
    $size,
    $scrollable,
  } = props;
  return css`
    box-sizing: border-box;
    background: ${colorsPattern.background.block};
    font-size: ${token.fontSize[$size]}px;
    color: ${colorsPattern.text.text};
    font-variant: tabular-nums;
    font-feature-settings: 'tnum';
    overflow: auto;
    ${$scrollable ? scrollableCss : notScrollableCss};
  `;
};

export const StyledTree = styled.ul`
  ${listResetStyle};
  ${treeCss};
  ${scrollBarStyle};
`;
