import { ITheme } from '@muya-ui/theme-light';

import React, { useMemo } from 'react';

import styled, { css, ThemedStyledProps } from 'styled-components';

import { IInlineButtonProps, InlineButton } from '../Button';
import addPx from '../utils/addPx';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import { withThemeForStyled } from '../utils/withTheme';

import { ITabProps } from './types';

const InnerButton = styled(InlineButton)``;
const BaseNode = styled.div``;

const TabPure = memoForwardRef<HTMLDivElement, ITabProps>((props, ref) => {
  const {
    index,
    selected,
    type,
    divider,
    buttonType: buttonTypeProp,
    // InlineButton
    size,
    htmlType,
    disabled,
    busy,
    component: asProp,
    prefixNode,
    suffixNode,
    onClick,
    loading,
    textFine,
    fontWeight,
    width,
    constant,
    weakLevel,
    href,
    target,
    rel,
    showIndicator,

    styles,
    children,
    ...otherProps
  } = props;
  const innerStyles = useStyles<'item'>(
    'tab',
    {
      item: '',
    },
    styles,
  );

  const buttonType = useMemo(() => {
    if (buttonTypeProp) {
      return buttonTypeProp;
    }
    if (selected) {
      return 'primary';
    }
    if (type === 'card') {
      return 'normal';
    }
    return 'strong';
  }, [buttonTypeProp, selected, type]);

  const buttonProps: IInlineButtonProps = {
    type: buttonType,
    size,
    htmlType,
    disabled,
    onClick,
    busy,
    fontWeight: 'lighter',
    component: asProp,
    prefixNode,
    suffixNode,
    loading,
    width,
    constant,
    weakLevel,
    href,
    target,
    rel,
    styles,
    ...innerStyles.item,
  };

  return (
    <BaseNode {...otherProps} ref={ref}>
      <InnerButton {...buttonProps}>{children}</InnerButton>
    </BaseNode>
  );
});

function lineTabCss(props: ThemedStyledProps<ITabProps, ITheme>) {
  const { theme, size = 'm', selected, showIndicator = false } = props;
  const { Tabs: token } = theme.components;
  const height = token.height[size];
  const padding = token.padding[size];
  let paddingCss;
  if (padding) {
    paddingCss = css`
      padding: ${padding};
    `;
  }
  let selectedCss;
  if (selected && showIndicator) {
    selectedCss = css`
      &::before {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        height: ${token.indicator.activeHeight}px;
        background: ${token.indicator.activeColor};
        width: 100%;
      }
    `;
  }
  return css`
    & ${InnerButton} {
      min-height: ${addPx(height)};
      ${paddingCss}
    }

    position: relative;
    margin-right: ${token.marginRight[size]}px;
    ${selectedCss}
  `;
}

function cardTabCss(props: ThemedStyledProps<ITabProps, ITheme>) {
  const { theme, size = 'm', selected, disabled, busy, divider = 'on' } = props;
  const { colors } = theme;
  const { card } = theme.components.Tabs;
  const height = card.height[size];
  const hasMargin = card.marginRight > 0;

  const interactive = !(busy || disabled);
  let statusCss;
  if (selected) {
    statusCss = css`
      border-color: ${colors.pattern.border.normal};
      border-bottom: none;
      border-top-left-radius: ${card.borderRadius};
      border-top-right-radius: ${card.borderRadius};
      background-color: ${card.bgSelectedColor};
      z-index: 1;
    `;
  } else {
    statusCss = css`
      background-color: ${card.bgColor};
      border-bottom-color: ${colors.pattern.border.normal};
      ${hasMargin &&
        css`
          border-color: ${colors.pattern.border.normal};
          border-bottom: none;
          border-top-left-radius: ${card.borderRadius};
          border-top-right-radius: ${card.borderRadius};
        `}
      ${interactive &&
        css`
          &:hover {
            background-color: ${card.bgHoverColor};
          }
        `}
    `;
  }
  let orderCss;
  const padding = card.padding[size];
  if (divider === 'on') {
    const dividerSize = card.dividerSize[size];
    orderCss = css`
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: ${(height - dividerSize) / 2}px;
        right: -1px;
        height: ${dividerSize}px;
        width: 1px;
        background: ${colors.pattern.border.normal};
      }
    `;
  }
  return css`
    position: relative;
    border: 1px solid transparent;
    margin-right: ${card.marginRight}px;
    & ${InnerButton} {
      height: ${height}px;
      padding: 0 ${padding}px;
      line-height: 1;
    }

    ${statusCss}
    ${orderCss}
    &:last-child {
      border-top-right-radius: ${card.borderRadius};
      margin-right: 0;
    }
  `;
}

const Tab = styled(TabPure)`
  box-sizing: border-box;
  ${(props: ThemedStyledProps<ITabProps, ITheme>) =>
    props.type === 'card' ? cardTabCss(props) : lineTabCss(props)}
`;

export default withThemeForStyled(Tab);
