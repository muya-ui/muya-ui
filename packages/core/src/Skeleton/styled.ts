import styled, { css } from 'styled-components';

import { skeletonActiveCss, skeletonNormalCss } from '../styled/mixins/skeleton';
import { ISkeletonProps } from './types';

type IBaseSkeletonItemProps = Pick<ISkeletonProps, 'active'>;

export const StyledBaseSkeletonItem = styled.div<IBaseSkeletonItemProps>`
  ${props => {
    const { theme } = props;
    const activeStyle = props.active ? skeletonActiveCss({ theme }) : skeletonNormalCss({ theme });
    return css`
      ${activeStyle}
    `;
  }};
`;

// block
export const StyledBlock = styled(StyledBaseSkeletonItem)`
  width: 100%;
  height: 100%;
`;

// card
export const StyledCardWrapper = styled.div`
  display: inline-flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

export const StyledCardTitle = styled(StyledBaseSkeletonItem)`
  width: ${props => props.theme.components.Skeleton.card.titleWidth};
  height: ${props => props.theme.components.Skeleton.card.titleHeight}px;
  margin-top: ${props => props.theme.spacing.spec.s5}px;
`;

export const StyledCardDesc = styled(StyledBaseSkeletonItem)`
  width: ${props => props.theme.components.Skeleton.card.descWidth};
  height: ${props => props.theme.components.Skeleton.card.descHeight}px;
  margin-top: ${props => props.theme.spacing.spec.s5}px;
`;

export const StyledCardContent = styled(StyledBaseSkeletonItem)`
  flex: 1;
  align-self: stretch;
`;

// paragraph
export const StyledParagraphWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

export const StyledParagraphTitle = styled(StyledBaseSkeletonItem)`
  height: ${props => props.theme.components.Skeleton.paragraph.height}px;
  margin-bottom: ${props => props.theme.components.Skeleton.paragraph.titleMarginBottom}px;
  width: ${props => props.theme.components.Skeleton.paragraph.titleWidth}px;
`;

export const StyledParagraph = styled(StyledBaseSkeletonItem)`
  height: ${props => props.theme.components.Skeleton.paragraph.height}px;
  margin-top: ${props => props.theme.components.Skeleton.paragraph.marginTop}px;
  width: 100%;
`;

// tree
export const StyledTreeSquare = styled(StyledBaseSkeletonItem)`
  height: ${props => props.theme.components.Skeleton.tree.squareSize}px;
  width: ${props => props.theme.components.Skeleton.tree.squareSize}px;
  margin-right: ${props => props.theme.components.Skeleton.tree.squareMarginRight}px;
`;

export const StyledTreeContent = styled(StyledBaseSkeletonItem)`
  flex: 1;
  height: ${props => props.theme.components.Skeleton.tree.contentHeight}px;
`;

export const StyledTreeNode = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledTreeHead = styled(StyledTreeNode)`
  margin-right: ${props => {
    const { squareSize, squareMarginRight } = props.theme.components.Skeleton.tree;
    return `${squareMarginRight + squareSize}px`;
  }};
`;

export const StyledTreeChild = styled(StyledTreeNode)`
  margin-left: ${props => {
    const { squareSize, squareMarginRight } = props.theme.components.Skeleton.tree;
    return `${squareMarginRight + squareSize}px`;
  }};
  margin-top: ${props => props.theme.components.Skeleton.tree.treeNodeMarginTop}px;
  &:nth-child(2n) {
    ${StyledTreeContent} {
      transform: scaleX(0.5);
      transform-origin: left center;
    }
  }
`;

export const StyledTreeWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  & + & {
    margin-top: ${props => props.theme.components.Skeleton.navigation.navigationNodeMarginTop}px;
  }
`;

// navigation
export const StyledNavigationSquare = styled(StyledBaseSkeletonItem)`
  height: ${props => props.theme.components.Skeleton.navigation.squareSize}px;
  width: ${props => props.theme.components.Skeleton.navigation.squareSize}px;
  margin-right: ${props => props.theme.components.Skeleton.navigation.squareMarginRight}px;
`;

export const StyledNavigationNode = styled(StyledBaseSkeletonItem)`
  height: ${props => props.theme.components.Skeleton.navigation.contentHeight}px;
  margin-top: ${props => props.theme.components.Skeleton.navigation.navigationNodeMarginTop}px;
  transform-origin: left center;
`;

export const StyledNavigationWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  ${props => {
    const { navigationNodeScaleList } = props.theme.components.Skeleton.navigation;
    return navigationNodeScaleList.map((v, i) => {
      return css`
        & > ${StyledNavigationNode}:nth-of-type(${navigationNodeScaleList.length}n+${i + 2}) {
          transform: ${`scaleX(${v})`};
        }
      `;
    });
  }}
`;

export const StyledNavigationHead = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props =>
    props.theme.components.Skeleton.navigation.navigationHeadMarginBottom}px;
  ${StyledNavigationNode} {
    margin: 0;
    transform: ${props =>
      `scaleX(${props.theme.components.Skeleton.navigation.navigationHeadScale})`};
    flex: 1;
  }
`;
