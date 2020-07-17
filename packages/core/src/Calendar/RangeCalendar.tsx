import React, { useMemo } from 'react';
import styled from 'styled-components';

import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import CalendarFooter from './CalendarFooter';
import CalendarHead from './CalendarHead';
import CalendarPanel from './CalendarPanel';
import { IRangeCalendarProps } from './types';
import useRangeCalendar from './useRangeCalendar';

const LeftCalendar = styled.div`
  width: ${props => props.theme.components.Calendar.defaultWidth}px;
  border-right: 1px solid ${props => props.theme.colors.pattern.border.normal};
`;

const RightCalendar = styled.div`
  width: ${props => props.theme.components.Calendar.defaultWidth}px;
`;

const Container = styled.div`
  display: flex;
`;

const Root = styled.div`
  position: relative;
  background-color: ${props => props.theme.colors.pattern.background.higher};
`;

const defaultStyles = {
  head: '',
  panel: '',
  footer: '',
  container: '',
  leftCalendar: '',
  rightCalendar: '',
};

const RangeCalendar = memoForwardRef<HTMLDivElement, IRangeCalendarProps>((props, ref) => {
  const theme = useTheme();
  const {
    finalState,
    finalUIState,
    finalFixedEnd,
    finalFixedStart,
    finalOptions,
    otherProps,

    // 事件处理
    handleItemHover,
    handleLeftSwitch,
    handleLeftClick,
    handleLeftPrevMonth,
    handleLeftPrevYear,
    handleLeftNextMonth,
    handleLeftNextYear,

    handleRightSwitch,
    handleRightClick,
    handleRightPrevMonth,
    handleRightPrevYear,
    handleRightNextMonth,
    handleRightNextYear,

    finalDisableRange,
    finalTodayDate,
    // 透传
    styles,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,
    hideItemOutside,
    disableDate,
    minRangeLength,
    maxRangeLength,
  } = useRangeCalendar(props);
  const pickStyles = useMemo(() => {
    if (styles) {
      const { head, panel, footer, container, leftCalendar, rightCalendar } = styles;
      return { head, panel, footer, container, leftCalendar, rightCalendar };
    }
  }, [styles]);
  const innerStyles = useStyles('calendar', defaultStyles, pickStyles);
  const [viewLeftType, viewRightType] = finalUIState.viewType;
  const [viewLeftDate, viewRightDate] = finalUIState.viewDate;

  // CalendarFooter 本身就 memo了，单个节点不需要 memo 了
  let footerNode;
  if (finalOptions && finalOptions.length) {
    footerNode = <CalendarFooter {...innerStyles.footer} styles={styles} options={finalOptions} />;
  }

  // 本就是解构了传给 pure component，所以不需要 memo
  const basePanelProps = {
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,
    disableDate,
    fixedStart: finalFixedStart,
    fixedEnd: finalFixedEnd,
    disableRange: finalDisableRange,
    range: finalState.range,
    start: finalState.start,
    end: finalState.end,
    todayDate: finalTodayDate,
    isRange: true,
    onItemHover: handleItemHover,
    min: minRangeLength,
    max: maxRangeLength,
    hideItemOutside,
  };

  return (
    <Root theme={theme} {...otherProps} ref={ref}>
      <Container {...innerStyles.container}>
        <LeftCalendar theme={theme} {...innerStyles.leftCalendar}>
          <CalendarHead
            {...innerStyles.head}
            viewType={viewLeftType}
            viewDate={viewLeftDate}
            onSwitch={handleLeftSwitch}
            onPrevMonth={handleLeftPrevMonth}
            onPrevYear={handleLeftPrevYear}
            onNextMonth={handleLeftNextMonth}
            onNextYear={handleLeftNextYear}
          />
          <CalendarPanel
            {...innerStyles.panel}
            {...basePanelProps}
            viewType={viewLeftType}
            viewDate={viewLeftDate}
            onItemClick={handleLeftClick}
          />
        </LeftCalendar>
        <RightCalendar theme={theme} {...innerStyles.rightCalendar}>
          <CalendarHead
            {...innerStyles.head}
            viewType={viewRightType}
            viewDate={viewRightDate}
            onSwitch={handleRightSwitch}
            onPrevMonth={handleRightPrevMonth}
            onPrevYear={handleRightPrevYear}
            onNextMonth={handleRightNextMonth}
            onNextYear={handleRightNextYear}
          />
          <CalendarPanel
            {...innerStyles.panel}
            {...basePanelProps}
            viewType={viewRightType}
            viewDate={viewRightDate}
            onItemClick={handleRightClick}
          />
        </RightCalendar>
      </Container>
      {footerNode}
    </Root>
  );
});

export default RangeCalendar;
