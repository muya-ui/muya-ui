import React, { useRef } from 'react';
import styled, { css } from 'styled-components';

import { useForkRef } from '@muya-ui/utils';

import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import { withThemeForStyled } from '../utils/withTheme';
import CardIndicator from './CardIndicator';
import LineIndicator from './LineIndicator';
import TabsContainer from './TabsContainer';
import { ITabsProps } from './types';
import useLineTabs from './useLineTabs';
import useTabsBase from './useTabsBase';

const BaseNode = styled.div``;
const ExtraContentWrapper = styled.div``;

const defaultStyles = {
  container: '',
  indicator: '',
  extraContentWrapper: '',
};

const LineTabs = memoForwardRef<HTMLDivElement, ITabsProps>((props, ref) => {
  const {
    type,
    index,
    size,
    disabled,
    busy,
    onChange,
    styles,
    swipe,
    // 其余的
    children,
    height,
    tabBarExtraContent,
    lineIndicatorMode,

    // from swipe
    enableDiffChildren,
    equalNum,
    gutter,
    duration,

    ...otherProps
  } = props;
  const innerStyles = useStyles('tabs', defaultStyles, styles);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useForkRef<HTMLDivElement>(containerRef, ref);
  const swipeProps = {
    enableDiffChildren,
    equalNum,
    gutter,
    duration,
  };
  const {
    children: resultChildren,
    indicatorState,
    onContainerChange,
    hideContainerIndicator,
  } = useLineTabs(props, containerRef);

  return (
    <BaseNode {...otherProps} ref={handleRef}>
      <TabsContainer
        {...innerStyles.container}
        {...swipeProps}
        size={size}
        type="line"
        swipe={swipe}
        height={height}
        onChange={onContainerChange}
      >
        {resultChildren}
      </TabsContainer>
      {tabBarExtraContent ? (
        <ExtraContentWrapper {...innerStyles.extraContentWrapper}>
          {tabBarExtraContent}
        </ExtraContentWrapper>
      ) : null}
      <LineIndicator
        {...innerStyles.indicator}
        $hide={hideContainerIndicator}
        $left={indicatorState.left}
        $width={indicatorState.width}
        $transition={indicatorState.transition}
      />
    </BaseNode>
  );
});
const CardTabs = memoForwardRef<HTMLDivElement, ITabsProps>((props, ref) => {
  const {
    type,
    index = 0,
    size,
    disabled,
    busy,
    onChange,
    styles,
    swipe,
    tabBarExtraContent,
    lineIndicatorMode,
    // 其余的
    children,

    // from swipe
    enableDiffChildren,
    equalNum,
    gutter,
    duration,
    ...otherProps
  } = props;
  const innerStyles = useStyles('tabs', defaultStyles, styles);
  const swipeProps = {
    enableDiffChildren,
    equalNum,
    gutter,
    duration,
  };
  const { children: resultChildren } = useTabsBase(props);
  return (
    <BaseNode {...otherProps} ref={ref}>
      <TabsContainer
        {...innerStyles.container}
        {...swipeProps}
        swipe={swipe}
        size={size}
        type="card"
      >
        {resultChildren}
      </TabsContainer>
      {tabBarExtraContent ? (
        <ExtraContentWrapper {...innerStyles.extraContentWrapper}>
          {tabBarExtraContent}
        </ExtraContentWrapper>
      ) : null}
      <CardIndicator {...innerStyles.indicator} />
    </BaseNode>
  );
});

const TabsPure = memoForwardRef<HTMLDivElement, ITabsProps>((props, ref) => {
  const { type = 'line', ...otherProps } = props;
  if (type === 'card') {
    return <CardTabs ref={ref} type="card" {...otherProps} />;
  }
  return <LineTabs ref={ref} type="line" {...otherProps} />;
});

const Tabs = styled(TabsPure)`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  ${props => {
    const { theme, size = 'm', type = 'line' } = props;
    const { Tabs: token } = theme.components;
    const padding = token.padding[size];
    let paddingCss = css`
      /* card indicator 下方背景线bottom: 0，会遮盖extraContent的内容，需要额外处理 */
      padding-bottom: ${token.indicator.bgHeight}px;
    `;
    // line indicator 需要为extraContent增加paddingBottom，确保内容对齐
    if (type === 'line' && padding) {
      paddingCss = css`
        padding: ${padding};
      `;
    }
    return css`
      & ${ExtraContentWrapper} {
        ${paddingCss};
      }
    `;
  }}
`;

export default withThemeForStyled(Tabs);
