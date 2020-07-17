import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Button, InlineButton } from '../Button';
import CalendarFooter from '../Calendar/CalendarFooter';
import CalendarHead from '../Calendar/CalendarHead';
import CalendarPanel from '../Calendar/CalendarPanel';
import { useLocale } from '../Locale';
import TimePickerPanel from '../TimePicker/TimePickerPanel';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { IDateTimeCalendarProps } from './innerTypes';
import useDateTimeCalendar from './useDateTimeCalendar';

const Root = styled.div`
  background-color: ${props => props.theme.colors.pattern.background.higher};
`;
const StyledPanel = styled.div`
  display: flex;
`;
const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${props => props.theme.colors.pattern.border.normal};
  height: ${props => props.theme.components.Calendar.dateTimeCalendar.footerHeight}px;
`;
const StyledDatePanel = styled.div`
  width: ${props => props.theme.components.Calendar.defaultWidth}px;
  border-right: 1px solid ${props => props.theme.colors.pattern.border.normal};
`;
const StyledTimePanel = styled.div``;
const StyledTimeHead = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.pattern.border.normal};
  height: ${props => props.theme.components.Calendar.head.height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props =>
    props.theme.components.Calendar.dateTimeCalendar.timeHeadMarginBottom}px;
`;

const StyledSpace = styled.span`
  display: inline-flex;
  width: ${props => props.theme.spacing.spec.s6}px;
`;
const StyledButtonContainer = styled.div`
  padding: 0 ${props => props.theme.spacing.spec.s3}px;
`;
const defaultStyles = {
  head: '',
  panel: '',
  footer: '',
  dateTimePanel: '',
  dateCol: '',
  timeCol: '',
  timeHead: '',
  timeHeadText: '',
  timePanel: '',
  footerContainer: '',
  buttonContainer: '',
  clearButton: '',
  confirmButton: '',
};

const DateTimeCalendar = memoForwardRef<HTMLDivElement, IDateTimeCalendarProps>((props, ref) => {
  const {
    timePickerPanelProps,
    timePanelTitle,
    finalValue,
    otherProps,
    calendarState,
    finalOptions,

    // 事件处理
    handleClear,
    handleConfirm,

    // 直接透传
    styles,
    allowClear,
    hideItemOutside,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,
  } = useDateTimeCalendar(props);
  const theme = useTheme();
  const locale = useLocale();
  const pickStyles = useMemo(() => {
    if (styles) {
      const {
        head,
        panel,
        footer,
        dateTimePanel,
        dateCol,
        timeCol,
        timeHead,
        timeHeadText,
        timePanel,
        footerContainer,
        buttonContainer,
        clearButton,
        confirmButton,
      } = styles;
      return {
        head,
        panel,
        footer,
        dateTimePanel,
        dateCol,
        timeCol,
        timeHead,
        timeHeadText,
        timePanel,
        footerContainer,
        buttonContainer,
        clearButton,
        confirmButton,
      };
    }
  }, [styles]);

  const innerStyles = useStyles('datetime-calendar', defaultStyles, pickStyles);
  // 本就是解构了传给 pure component，所以不需要 memo
  const panelProps = {
    styles,
    todayDate: calendarState.finalTodayDate,
    disableRange: calendarState.finalDisableRange,
    disableDate: calendarState.disableDate,

    hideItemOutside,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,
  };

  return (
    <Root {...otherProps} theme={theme} ref={ref}>
      <StyledPanel {...innerStyles.dateTimePanel}>
        <StyledDatePanel theme={theme} {...innerStyles.dateCol}>
          <CalendarHead
            {...innerStyles.head}
            styles={styles}
            viewType={calendarState.finalUIState.viewType}
            viewDate={calendarState.finalUIState.viewDate}
            onPrevMonth={calendarState.handlePrevMonth}
            onNextMonth={calendarState.handleNextMonth}
            onPrevYear={calendarState.handlePrevYear}
            onNextYear={calendarState.handleNextYear}
            onSwitch={calendarState.handleSwitch}
          />
          <CalendarPanel
            {...innerStyles.panel}
            viewType={calendarState.finalUIState.viewType}
            selected={finalValue}
            viewDate={calendarState.finalUIState.viewDate}
            onItemClick={calendarState.handleItemClick}
            {...panelProps}
          />
        </StyledDatePanel>
        <StyledTimePanel {...innerStyles.timeCol}>
          <StyledTimeHead theme={theme} {...innerStyles.timeHead}>
            <InlineButton {...innerStyles.timeHeadText} size="s" component="span" constant>
              {timePanelTitle}
            </InlineButton>
          </StyledTimeHead>
          <TimePickerPanel
            {...innerStyles.timePanel}
            rowNum={5}
            defaultScrollBehavior="smooth"
            {...timePickerPanelProps}
          />
        </StyledTimePanel>
      </StyledPanel>
      <StyledFooter theme={theme} {...innerStyles.footerContainer}>
        <CalendarFooter
          {...innerStyles.footer}
          type="date-time"
          styles={styles}
          options={finalOptions}
        />
        <StyledButtonContainer theme={theme} {...innerStyles.buttonContainer}>
          {allowClear && (
            <InlineButton
              {...innerStyles.clearButton}
              type="primary"
              size="s"
              onClick={handleClear}
              busy={!finalValue}
            >
              {locale['Calendar.clearText']}
            </InlineButton>
          )}
          {allowClear && <StyledSpace theme={theme} />}
          <Button
            {...innerStyles.confirmButton}
            onClick={handleConfirm}
            type="primary"
            size="s"
            busy={!finalValue}
          >
            {locale['Calendar.confirmText']}
          </Button>
        </StyledButtonContainer>
      </StyledFooter>
    </Root>
  );
});

export default DateTimeCalendar;
