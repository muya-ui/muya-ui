import React, { useMemo } from 'react';

import usePickerBase from '../DatePicker/usePickerBase';
import { StyledPopPanel } from '../styled/components/PopPanel';
import Trigger from '../Trigger';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import DateTimeCalendar from './DateTimeCalendar';
import { StyledInput } from './styled';
import { IDateTimePickerProps } from './types';
import useDateTimePicker from './useDateTimePicker';

const defaultStyles = {
  popPanel: '',
};
const WeekPicker = memoForwardRef<HTMLDivElement, IDateTimePickerProps>((props, ref) => {
  const theme = useTheme();
  const {
    // 处理后的数据
    finalUIState,
    calendarState,
    finalValue,
    otherProps,
    finalTimeFormat,

    // 事件处理
    handleFocus,
    handleCalendarChange,
    handleCalendarUIChange,
    handleClickAway,
    handleClear,
    handleConfirm,

    // 直接透传
    styles,
    disabled,
    allowClear,
    calendarStyles,
    // ---- calendar props
    todayDate,
    disableRange,
    disableDate,
    options,

    hideItemOutside,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,

    // ---- timepicker panel props
    hourStep,
    minuteStep,
    secondStep,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    hideDisabledOptions,

    // triggerProps
    placement,
    popperProps,
    arrowPointAtCenter,
    triggerId,
    flip,
  } = useDateTimePicker(props);

  // input 的 styles 直接传个 input
  const inputStyles = useMemo(() => {
    if (!styles) {
      return;
    }
    const { inputWrapper, input, nodeDivider, nodeWrapper, clearWrapper, statusWrapper } = styles;
    return {
      inputWrapper,
      input,
      nodeDivider,
      nodeWrapper,
      clearWrapper,
      statusWrapper,
    };
  }, [styles]);
  const currentStyles = useMemo(() => {
    if (!styles) {
      return;
    }
    const { popPanel } = styles;
    return { popPanel };
  }, [styles]);
  const innerStyles = useStyles('datetime-picker', defaultStyles, currentStyles);

  const { suffixNode: innerSuffixNode } = usePickerBase();

  const realNode = (
    <StyledInput
      ref={ref}
      value={finalValue}
      suffixNode={innerSuffixNode}
      clearReplace
      focusWhenClear={false}
      theme={theme}
      styles={inputStyles}
      disabled={disabled}
      allowClear={allowClear}
      onFocus={handleFocus}
      onClear={handleClear}
      readOnly
      {...otherProps}
    />
  );
  if (disabled) {
    return realNode;
  }

  const calendarProps = {
    styles: calendarStyles,
    options,
    todayDate,
    allowClear,
    disableRange,
    disableDate,
    timeFormat: finalTimeFormat,

    hideItemOutside,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,

    // ---- timepicker panel props
    hourStep,
    minuteStep,
    secondStep,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    hideDisabledOptions,
  };

  const calendarNode = (
    <StyledPopPanel {...innerStyles.popPanel} theme={theme}>
      <DateTimeCalendar
        viewDate={finalUIState.viewDate}
        viewType={finalUIState.viewType}
        selectedDate={calendarState.finalValue}
        onChange={handleCalendarChange}
        onConfirm={handleConfirm}
        onUIChange={handleCalendarUIChange}
        {...calendarProps}
      />
    </StyledPopPanel>
  );

  const triggerProps = {
    placement,
    popperProps,
    arrowPointAtCenter,
    triggerId,
    flip,
    hideArrow: true,
  };
  return (
    <Trigger
      popup={calendarNode}
      triggerAction="click"
      open={finalUIState.popupOpen}
      onClickAway={handleClickAway}
      {...triggerProps}
    >
      {realNode}
    </Trigger>
  );
});

(WeekPicker as any).__MUYA_WeekPicker = true;

export default WeekPicker;
