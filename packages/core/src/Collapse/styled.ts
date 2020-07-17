import styled, { css, keyframes } from 'styled-components';
import ExpandWrapper from '../styled/components/ExpandWrapper';

interface IExpandProps {
  $expandIconPosition: 'left' | 'right';
}

interface IDisabledProps {
  $disabled: boolean;
}

// expand 动画
export const expandedRotateKeyframes = keyframes`
  from {
    transform: rotate(-90deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

export const notExpandedRotateKeyframes = keyframes`
  to {
    transform: rotate(-90deg);
  }
`;

export const StyledCollapseItem = styled.div``;

export const StyledCollapseContent = styled.div``;
export const StyledExpandWrapper = styled(ExpandWrapper)<IExpandProps>``;
export const StyledCollapseHeader = styled.div<IDisabledProps>`
  ${props => {
    const {
      theme: {
        components: { Collapse: CollapseToken },
        size: {
          spec: { borderRadius },
        },
      },
      $disabled,
    } = props;
    const interactiveStyle = $disabled
      ? css`
          & > * {
            opacity: ${CollapseToken.disableOpacity};
          }
          & {
            cursor: not-allowed;
          }
        `
      : css`
          &:hover {
            background: ${CollapseToken.background.hover};
          }
          &:active {
            background: ${CollapseToken.background.click};
          }
        `;
    return css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: ${CollapseToken.headerPadding};
      background: ${CollapseToken.background.normal};
      border-radius: ${borderRadius.s1};
      cursor: pointer;
      user-select: none;
      ${interactiveStyle}
    `;
  }}
`;
export const StyledCollapseWrapper = styled.div`
  ${props => {
    const {
      theme: {
        components: { Collapse: CollapseToken },
      },
    } = props;

    return css`
      ${StyledCollapseItem} {
        margin-bottom: ${CollapseToken.panelMarginBottom}px;
        &:last-child {
          margin-bottom: 0;
        }
      }

      ${StyledCollapseContent} {
        padding: ${CollapseToken.contentPadding};
      }
    `;
  }}
`;
