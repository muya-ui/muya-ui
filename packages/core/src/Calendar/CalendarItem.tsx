import { Dayjs } from 'dayjs';
import React, { useMemo } from 'react';
import styled, { css, CSSObject } from 'styled-components';

import { ITheme } from '@muya-ui/theme-light';

import { IThemedBaseProps } from '../types';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { ICalendarItemProps } from './innerTypes';
import { transformItemStatus } from './utils';

const ItemBlock = styled.div`
  position: relative;
  height: 100%;
`;

const InnerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

interface IRootProps {
  $rowType: ICalendarItemProps['rowType'];
  $status: ICalendarItemProps['status'];
  $viewType: ICalendarItemProps['viewType'];
  $current: boolean;
  $label: boolean;
  $hide: boolean;
  $disabled: boolean;
}

// 根据在一行中的位置和是否是区间选中来判断左右使用的是 padding 还是 margin
function getGutterCss(
  rowType: ICalendarItemProps['rowType'],
  status: ICalendarItemProps['status'],
  innerGutter: number,
) {
  const cssObj: CSSObject = {};

  if (rowType === 'head' || status === 'range-start') {
    cssObj.marginLeft = innerGutter;
  } else {
    cssObj.paddingLeft = innerGutter;
  }

  if (rowType === 'tail' || status === 'range-end') {
    cssObj.marginRight = innerGutter;
  } else {
    cssObj.paddingRight = innerGutter;
  }
  return cssObj;
}

/**
 * 获取 item 的 color
 * @param status 状态
 * @param isCurrent 是否是今天
 * @param $disabled 是否禁用
 * @param theme 主题
 */
function getItemColor(
  status: ICalendarItemProps['status'],
  isCurrent: boolean,
  $disabled: boolean,
  theme: ITheme,
) {
  const itemToken = theme.components.Calendar.item;
  if (status === 'selected' || status === 'range-end' || status === 'range-start') {
    return itemToken.color.selected;
  }

  if (status === 'range' || status === 'range-hovered') {
    return itemToken.color.current;
  }

  if ($disabled) {
    return itemToken.color.disabled;
  }

  if (status === 'outside') {
    return itemToken.color.outside;
  }

  if (status === 'normal' && isCurrent) {
    return itemToken.color.current;
  }

  return itemToken.color.normal;
}

function getItemCss(props: IRootProps & IThemedBaseProps) {
  const { $viewType = 'month', $disabled, theme, $status = 'normal', $label, $rowType } = props;
  const itemToken = theme.components.Calendar.item;
  const innerGutter = $viewType === 'month' ? itemToken.gutterInMonth : itemToken.gutterOther;
  const isInRange = $status === 'range-end' || $status === 'range-start' || $status === 'range';
  const blockCssObj: CSSObject = {};
  const innerItemCssObj: CSSObject = {};
  const innerItemActiveCssObj: CSSObject = {};
  const innerItemHoverCssObj: CSSObject = {};
  if ($status === 'normal' && !$disabled && !$label) {
    innerItemHoverCssObj.backgroundColor = itemToken.background.hover;
    innerItemActiveCssObj.backgroundColor = itemToken.background.click;
    innerItemActiveCssObj.color = itemToken.color.current;
  } else if ($status === 'selected' || $status === 'range-end' || $status === 'range-start') {
    innerItemCssObj.backgroundColor = itemToken.background.selected;
    if (!$disabled) {
      innerItemActiveCssObj.backgroundColor = itemToken.background.selectedClick;
    }
  } else if ($status === 'hovered') {
    blockCssObj.backgroundColor = itemToken.background.hover;
  } else if ($status === 'range-hovered') {
    blockCssObj.backgroundColor = itemToken.background.rangeClick;
  } else if ($status === 'range' && !$disabled) {
    innerItemHoverCssObj.backgroundColor = itemToken.background.range;
    innerItemActiveCssObj.backgroundColor = itemToken.background.rangeClick;
  }

  if (isInRange) {
    blockCssObj.backgroundColor = itemToken.background.range;
  }

  if ($disabled && isInRange) {
    innerItemCssObj.opacity = theme.opacity.pattern.disabled;
  }

  return css`
    & ${ItemBlock} {
      ${getGutterCss($rowType, $status, innerGutter)}
      ${blockCssObj}
    }

    & ${InnerItem} {
      border-radius: ${itemToken.borderRadius};
      ${innerItemCssObj}
      &:hover {
        ${innerItemHoverCssObj}
      }
      &:active {
        ${innerItemActiveCssObj}
      }
    }
  `;
}

const Root = styled.div<IRootProps>`
  ${props => {
    const { theme, $status = 'normal', $current, $label, $hide, $disabled } = props;

    const cssObj: CSSObject = {
      color: getItemColor($status, $current, $disabled, theme),
    };

    const itemToken = theme.components.Calendar.item;
    if ($disabled) {
      cssObj.cursor = 'not-allowed';
    } else if (!$label) {
      cssObj.cursor = 'pointer';
    }

    if ($hide) {
      cssObj.visibility = 'hidden';
    }

    if ($current && ($status === 'normal' || $status === 'range') && !$disabled) {
      cssObj.fontWeight = theme.typography.spec.fontWeight.semibold;
    }

    return css`
      user-select: none;
      box-sizing: border-box;
      position: relative;
      height: ${itemToken.height}px;
      font-size: ${itemToken.fontSize}px;
      line-height: ${itemToken.fontSize}px;
      ${cssObj}
      ${getItemCss(props)}
    `;
  }}
`;

const defaultRenderMonthLabel = (date: Dayjs) => date.format('dd');
const defaultRenderMonthItem = (date: Dayjs) => date.format('D');
const defaultRenderYearItem = (date: Dayjs) => date.format('MMM');
const defaultRenderDecadeItem = (date: Dayjs) => date.format('YYYY');

const defaultStyles = {
  panelItemWrapper: '',
  panelItemContent: '',
};
const CalendarItem = memoForwardRef<HTMLDivElement, ICalendarItemProps>((props, ref) => {
  const {
    status = 'normal',
    date,
    viewType,
    rowType,
    children,
    isCurrent,
    disabled = false,
    isLabel,
    styles,
    hideItemOutside,
    renderDecadeItem = defaultRenderDecadeItem,
    renderMonthItem = defaultRenderMonthItem,
    renderYearItem = defaultRenderYearItem,
    renderMonthLabel = defaultRenderMonthLabel,
    onItemClick,
    onItemHover,
    onClick,
    onMouseEnter,
    ...otherProps
  } = props;
  const theme = useTheme();
  const pickStyles = useMemo(() => {
    if (styles) {
      const { panelItemWrapper, panelItemContent } = styles;
      return { panelItemWrapper, panelItemContent };
    }
  }, [styles]);
  const innerStyles = useStyles('calendar', defaultStyles, pickStyles);
  const hideItem = status === 'outside' && viewType === 'month' && hideItemOutside === 'month';
  const innerStatus = transformItemStatus(status, disabled);
  const handleClick = () => {
    if (disabled) {
      return;
    }
    onItemClick && onItemClick(date, innerStatus);
  };
  const handleEnter = () => {
    if (disabled) {
      return;
    }
    onItemHover && onItemHover(date, innerStatus);
  };
  let innerNode;
  if (isLabel) {
    innerNode = renderMonthLabel(date);
  } else if (viewType === 'month') {
    innerNode = renderMonthItem(date, innerStatus);
  } else if (viewType === 'year') {
    innerNode = renderYearItem(date, innerStatus);
  } else if (viewType === 'decade') {
    innerNode = renderDecadeItem(date, innerStatus);
  }

  return (
    <Root
      {...otherProps}
      $disabled={disabled}
      theme={theme}
      $viewType={viewType}
      $rowType={rowType}
      $status={status}
      $current={!!isCurrent}
      $label={!!isLabel}
      $hide={hideItem}
      onClick={handleClick}
      onMouseEnter={handleEnter}
      ref={ref}
    >
      <ItemBlock {...innerStyles.panelItemWrapper}>
        <InnerItem {...innerStyles.panelItemContent}>{innerNode}</InnerItem>
      </ItemBlock>
    </Root>
  );
});

export default CalendarItem;
