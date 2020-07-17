import React from 'react';
import styled, { css } from 'styled-components';

import { LeftIcon, RightIcon } from '@muya-ui/theme-light';

import { IInlineButtonPureProps, InlineButton } from '../Button';
import Swipe from '../Swipe';
import { Omit } from '../types';
import addPx from '../utils/addPx';
import memoForwardRef from '../utils/memoForwardRef';
import useTheme from '../utils/useTheme';
import { withThemeForStyled } from '../utils/withTheme';
import { ITabsContainerProps } from './types';
import useTabsContainer from './useTabsContainer';

const InnerButton = styled(InlineButton)``;

const StyledSwipe = styled(Swipe)`
  z-index: 1;
`;

type IButtonContainerProps = Omit<IInlineButtonPureProps, 'type'> &
  Pick<ITabsContainerProps, 'type'> &
  React.HTMLAttributes<HTMLDivElement>;

const BaseNode = styled.div``;

const ButtonContainerPure = memoForwardRef<HTMLDivElement, IButtonContainerProps>((props, ref) => {
  const {
    type,
    size,
    htmlType,
    disabled,
    busy,
    component: asProp,
    children,
    prefixNode,
    suffixNode,
    onClick,
    ...otherProps
  } = props;
  return (
    <BaseNode {...otherProps} ref={ref}>
      <InnerButton onClick={onClick} busy={busy}>
        {children}
      </InnerButton>
    </BaseNode>
  );
});

const ButtonContainer = styled(ButtonContainerPure)<IButtonContainerProps>`
  ${props => {
    const { theme, size = 'm', type } = props;
    const token = theme.components.Tabs;
    const height = type === 'line' ? token.height[size] : token.card.height[size];
    const padding = token.padding[size];
    let paddingCss;
    if (type === 'line' && padding) {
      paddingCss = css`
        padding: ${padding};
      `;
    }
    return css`
      & ${InnerButton} {
        width: ${height}px;
        min-height: ${addPx(height)};
        align-items: center;
        justify-content: center;
        ${paddingCss}
      }
    `;
  }}
`;

const TabsContainerPure = memoForwardRef<HTMLDivElement, ITabsContainerProps>((props, ref) => {
  const {
    children,
    onChange,
    height,
    size = 'm',
    type,
    swipe,
    // from swipe
    enableDiffChildren,
    equalNum,
    gutter,
    duration,
    ...otherProps
  } = props;
  const {
    onPrev,
    onNext,
    onStepsChange,
    hasNext,
    hasPrev,
    stepIndex,
    onTransitionEnd,
  } = useTabsContainer({
    onChange,
  });
  const theme = useTheme();
  const swipable = hasNext || hasPrev;
  const { Tabs: token } = theme.components;
  const tokenIcon = {
    prev: LeftIcon,
    next: RightIcon,
    ...token.icon,
  };
  const PrevIcon = tokenIcon.prev;
  const NextIcon = tokenIcon.next;
  const iconSize = token.iconSize[size];
  const iconStyle = {
    width: iconSize,
    height: iconSize,
  };
  const offSwipe = !swipe;

  const prevBtn =
    swipable && !offSwipe ? (
      <ButtonContainer size={size} theme={theme} type={type} onClick={onPrev} busy={!hasPrev}>
        <PrevIcon style={iconStyle} />
      </ButtonContainer>
    ) : null;
  const nextBtn =
    swipable && !offSwipe ? (
      <ButtonContainer size={size} theme={theme} type={type} onClick={onNext} busy={!hasNext}>
        <NextIcon style={iconStyle} />
      </ButtonContainer>
    ) : null;

  let innerChildren = children;
  if (!offSwipe) {
    const swipeProps = {
      enableDiffChildren,
      equalNum,
      gutter,
      duration,
    };
    innerChildren = (
      <StyledSwipe
        {...swipeProps}
        onTransitionEnd={onTransitionEnd}
        onStepsChange={onStepsChange}
        stepIndex={stepIndex}
      >
        {children}
      </StyledSwipe>
    );
  }

  return (
    <BaseNode {...otherProps} ref={ref}>
      {prevBtn}
      {innerChildren}
      {nextBtn}
    </BaseNode>
  );
});

const TabsContainer = styled(TabsContainerPure)`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  align-items: center;
  flex: 1;
  overflow-x: hidden;
  z-index: 1;
  ${props => {
    const { height } = props;
    if (height) {
      return css`
        height: ${height}px;
        align-items: center;
      `;
    }
  }}
`;

export default withThemeForStyled(TabsContainer);
