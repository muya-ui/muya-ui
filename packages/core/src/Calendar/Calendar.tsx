import React, { useMemo } from 'react';
import styled from 'styled-components';

import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import CalendarFooter from './CalendarFooter';
import CalendarHead from './CalendarHead';
import CalendarPanel from './CalendarPanel';
import { ICalendarProps } from './types';
import useCalendar from './useCalendar';

const Root = styled.div`
  width: ${props => props.theme.components.Calendar.defaultWidth}px;
  background-color: ${props => props.theme.colors.pattern.background.higher};
`;
const defaultStyles = {
  head: '',
  panel: '',
  footer: '',
};

const Calendar = memoForwardRef<HTMLDivElement, ICalendarProps>((props, ref) => {
  const {
    finalUIState,
    finalSelectedDate,
    finalOptions,
    handleItemClick,
    handlePrevMonth,
    handleNextMonth,
    handlePrevYear,
    handleNextYear,
    handleSwitch,
    finalDisableRange,
    finalTodayDate,
    otherProps,

    // 透传回去的属性
    styles,
    hideItemOutside,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,
    disableDate,
  } = useCalendar(props);
  const theme = useTheme();
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
    disableRange: finalDisableRange,
    disableDate,

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
        selected={finalSelectedDate}
        viewDate={finalUIState.viewDate}
        onItemClick={handleItemClick}
        {...panelProps}
      />
      {footerNode}
    </Root>
  );
});

export default Calendar;
