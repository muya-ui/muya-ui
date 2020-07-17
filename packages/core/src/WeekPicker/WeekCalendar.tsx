import React, { useMemo } from 'react';
import styled from 'styled-components';

import CalendarFooter from '../Calendar/CalendarFooter';
import CalendarHead from '../Calendar/CalendarHead';
import CalendarPanel from '../Calendar/CalendarPanel';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { IWeekCalendarProps } from './innerTypes';
import useWeekCalendar from './useWeekCalendar';

const Root = styled.div`
  width: ${props => props.theme.components.Calendar.defaultWidth}px;
  background-color: ${props => props.theme.colors.pattern.background.higher};
`;
const defaultStyles = {
  head: '',
  panel: '',
  footer: '',
};

const WeekCalendar = memoForwardRef<HTMLDivElement, IWeekCalendarProps>((props, ref) => {
  const theme = useTheme();

  const {
    // 处理过的数据
    finalUIState,
    finalSelectedWeek,
    stateHoveredWeek,
    finalOptions,
    finalTodayDate,
    otherProps,

    // 事件处理
    handleItemClick,
    handlePrevMonth,
    handleNextMonth,
    handlePrevYear,
    handleNextYear,
    handleSwitch,
    handleItemHover,
    handleLeavePanel,

    // 透传
    styles,
    disableWeek,
    hideItemOutside,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,
  } = useWeekCalendar(props);

  const pickStyles = useMemo(() => {
    if (styles) {
      const { head, panel, footer } = styles;
      return { head, panel, footer };
    }
  }, [styles]);
  const innerStyles = useStyles('calendar', defaultStyles, pickStyles);

  // CalendarFooter 本身就 memo了，单个节点不需要 memo 了
  let footerNode;
  if (finalOptions && finalOptions.length) {
    footerNode = <CalendarFooter {...innerStyles.footer} styles={styles} options={finalOptions} />;
  }

  // 本就是解构了传给 pure component，所以不需要 memo
  const panelProps = {
    styles,
    todayDate: finalTodayDate,
    isWeek: true,
    disableWeek,

    hideItemOutside,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,
  };

  return (
    <Root {...otherProps} theme={theme} ref={ref}>
      <CalendarHead
        {...innerStyles.head}
        styles={styles}
        viewType={finalUIState.viewType}
        viewDate={finalUIState.viewDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onPrevYear={handlePrevYear}
        onNextYear={handleNextYear}
        onSwitch={handleSwitch}
      />
      <CalendarPanel
        {...innerStyles.panel}
        viewType={finalUIState.viewType}
        viewDate={finalUIState.viewDate}
        hoveredWeek={stateHoveredWeek}
        selectedWeek={finalSelectedWeek}
        onItemClick={handleItemClick}
        onItemHover={handleItemHover}
        panelBlockProps={{
          onMouseLeave: handleLeavePanel,
        }}
        {...panelProps}
      />
      {footerNode}
    </Root>
  );
});

export default WeekCalendar;
