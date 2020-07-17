import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import CalendarItem from './CalendarItem';
import { createCheckDisabled, createGetStatus, setOnlyStart } from './calendarPanelUtils';
import { ICalendarItemProps, ICalendarPanelProps } from './innerTypes';
import { ICalendarType } from './types';
import { getDateType, getDaysOfMonth, getDecadeYears, getMonthsOfYear } from './utils';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

const StyledItem = styled(CalendarItem)``;
const StyledItemM = React.memo(StyledItem);
const defaultStyles = {
  panelMonthBlock: '',
  panelYearBlock: '',
  panelDecadeBlock: '',
  panelItem: '',
  panelLabelItem: '',
  panelLabelBlock: '',
};

const Root = styled.div<{ $type?: ICalendarType }>`
  width: 100%;
  ${props => {
    const { $type: viewType, theme } = props;
    const { panel: panelToken } = theme.components.Calendar;
    let typeCss;
    if (viewType === 'month') {
      typeCss = css`
        padding: ${panelToken.containerMonthPadding};
        & ${Container} {
          padding: ${panelToken.monthPadding};
        }
        & ${StyledItem} {
          width: ${(1 / 7) * 100}%;
          margin-bottom: ${panelToken.monthItemMarginBottom}px;
        }
      `;
    } else {
      typeCss = css`
        padding: ${panelToken.containerOtherPadding};
        & ${Container} {
          margin: ${panelToken.otherMargin};
        }
        & ${StyledItem} {
          width: ${(1 / 3) * 100}%;
          margin-bottom: ${panelToken.otherItemMarginBottom}px;
        }
      `;
    }
    return css`
      ${typeCss}
    `;
  }}
`;

const CalendarPanel = memoForwardRef<HTMLDivElement, ICalendarPanelProps>((props, ref) => {
  const {
    viewType,
    viewDate,
    selected,
    range,
    start,
    end,
    isRange,
    disableRange,
    disableDate,
    onItemClick,
    onItemHover,
    hideItemOutside,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,
    todayDate,
    styles,
    min,
    max,
    fixedStart,
    fixedEnd,

    panelBlockProps,

    isWeek = false,
    hoveredWeek,
    selectedWeek,
    disableWeek,

    ...otherProps
  } = props;
  const theme = useTheme();
  const pickStyles = useMemo(() => {
    if (styles) {
      const {
        panelMonthBlock,
        panelYearBlock,
        panelDecadeBlock,
        panelItem,
        panelLabelItem,
        panelLabelBlock,
      } = styles;
      return {
        panelMonthBlock,
        panelYearBlock,
        panelDecadeBlock,
        panelItem,
        panelLabelItem,
        panelLabelBlock,
      };
    }
  }, [styles]);

  const innerStyles = useStyles('calendar', defaultStyles, pickStyles);
  const dates = useMemo(() => {
    if (viewType === 'month') {
      return getDaysOfMonth(viewDate);
    }
    if (viewType === 'year') {
      return getMonthsOfYear(viewDate);
    }
    return getDecadeYears(viewDate);
  }, [viewType, viewDate]);

  // 标签，只有月视图有
  const labelBlock = useMemo(() => {
    if (viewType !== 'month') {
      return;
    }
    const weekLabels = dates.slice(0, 7);
    return (
      <Container {...innerStyles.panelLabelBlock}>
        {weekLabels.map(labelDate => (
          <StyledItemM
            {...innerStyles.panelLabelItem}
            renderMonthLabel={renderMonthLabel}
            date={labelDate}
            isLabel
            viewType="month"
            key={labelDate.unix()}
          />
        ))}
      </Container>
    );
  }, [dates, innerStyles.panelLabelBlock, innerStyles.panelLabelItem, renderMonthLabel, viewType]);

  let blockStyleItem = innerStyles.panelMonthBlock;
  if (viewType === 'year') {
    blockStyleItem = innerStyles.panelYearBlock;
  } else if (viewType === 'decade') {
    blockStyleItem = innerStyles.panelYearBlock;
  }

  const dateItems = useMemo(() => {
    const getStatus = createGetStatus({
      start,
      end,
      range,
      selected,
      viewType,
      isRange,
      viewDate,

      // week
      isWeek,
      hoveredWeek,
      selectedWeek,
    });
    const checkDisabled = createCheckDisabled({
      disableRange,
      disableDate,
      viewType,
      min,
      max,
      start,
      end,

      fixedStart,
      fixedEnd,
      isRange,

      // week
      isWeek,
      disableWeek,
    });
    const rowNum = viewType === 'month' ? 7 : 3;
    const dateType = getDateType(viewType);
    const itemPropsList = dates.map((date, dateIndex) => {
      const status = getStatus(date, dateIndex);
      const disabled = checkDisabled(date);
      let rowType: ICalendarItemProps['rowType'] = 'normal';
      const isCurrent = date.isSame(todayDate, dateType);
      const remain = dateIndex % rowNum;
      if (remain === 0) {
        rowType = 'head';
      } else if (remain === rowNum - 1) {
        rowType = 'tail';
      }
      return {
        hideItemOutside,
        renderDecadeItem,
        renderMonthItem,
        renderYearItem,
        onItemClick,
        onItemHover,
        status,
        disabled,
        rowType,
        date,
        isCurrent,
      };
    });
    if (isRange) {
      setOnlyStart(itemPropsList);
    }

    return itemPropsList.map(dateItem => (
      <StyledItemM
        {...innerStyles.panelItem}
        {...dateItem}
        viewType={viewType}
        key={dateItem.date.unix()}
      />
    ));
  }, [
    dates,
    disableDate,
    disableRange,
    disableWeek,
    end,
    fixedEnd,
    fixedStart,
    hideItemOutside,
    hoveredWeek,
    innerStyles.panelItem,
    isRange,
    isWeek,
    max,
    min,
    onItemClick,
    onItemHover,
    range,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    selected,
    selectedWeek,
    start,
    todayDate,
    viewDate,
    viewType,
  ]);

  return (
    <Root theme={theme} $type={viewType} {...otherProps} ref={ref}>
      {labelBlock}
      <Container {...blockStyleItem} {...panelBlockProps}>
        {dateItems}
      </Container>
    </Root>
  );
});

export default CalendarPanel;
