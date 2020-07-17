import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import warning from 'warning';

import { useEventCallback } from '@muya-ui/utils';

import { ICalendarPureProps } from '../Calendar/types';
import useCalendar from '../Calendar/useCalendar';
import { formatCalendarOptions } from '../Calendar/utils';
import { IDateTimeCalendarProps } from './innerTypes';

export function transformDateByTime(date: Dayjs, timeStr: 'now' | string) {
  const time = timeStr === 'now' ? dayjs().format('HH:mm:ss') : timeStr;
  return dayjs(`${date.format('YYYY-MM-DD')} ${time}`);
}
export function transformDateByDate(date: Dayjs, otherDate: Dayjs) {
  return dayjs(`${date.format('YYYY-MM-DD')} ${otherDate.format('HH:mm:ss')}`);
}

export default function useDateTimeCalendar(props: IDateTimeCalendarProps) {
  const {
    // calendar props
    allowClear = true,
    todayDate,
    viewType,
    viewDate,
    disableRange,
    disableDate,
    options,
    onUIChange,
    defaultViewDate,

    hideItemOutside,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,

    // timepicker panel props
    hourStep,
    minuteStep,
    secondStep,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    hideDisabledOptions,

    // date time calendar
    selectedDate,
    defaultDate,
    timeFormat = 'HH:mm:ss',
    defaultTime = 'now',
    onChange,
    onClear,
    onSelect,
    onConfirm,
    styles,

    ...otherProps
  } = props;
  const isControlled = 'selectedDate' in props;
  const valueFromProps = useMemo(() => {
    if (isControlled) {
      if (!selectedDate) {
        return;
      }
      const innerDate = dayjs(selectedDate);
      if (innerDate.isValid()) {
        return innerDate;
      }
      return;
    }
    if (!defaultDate) {
      return;
    }
    const innerDate = dayjs(defaultDate);
    if (innerDate.isValid()) {
      return innerDate;
    }
  }, [defaultDate, isControlled, selectedDate]);
  const [stateValue, setStateValue] = useState(valueFromProps);
  const finalValue = isControlled ? valueFromProps : stateValue;
  const updateValue = (date?: Dayjs) => {
    setStateValue(date);
    if (onChange) {
      onChange(date);
    }
    if (date && onSelect) {
      onSelect(date);
    }
    if (!date && onClear) {
      onClear();
    }
  };
  const handleDateChange = useEventCallback((date?: Dayjs) => {
    if (!date) {
      updateValue();
      return;
    }
    // 如果有值，使用之前的值，如果没有使用设置的值
    const transformedDate = finalValue
      ? transformDateByDate(date, finalValue)
      : transformDateByTime(date, defaultTime);
    updateValue(transformedDate);
  });
  const handleClear = useEventCallback(() => {
    updateValue();
  });
  const handleConfirm = useEventCallback(() => {
    if (onConfirm && finalValue) {
      onConfirm(finalValue);
    }
  });
  const calendarProps: ICalendarPureProps = {
    allowClear,
    todayDate,
    disableRange,
    disableDate,
    onUIChange,
    defaultViewDate,

    selectedDate: finalValue,
    onChange: handleDateChange,
  };
  if ('viewType' in props) {
    calendarProps.viewType = viewType;
  }
  if ('viewDate' in props) {
    calendarProps.viewDate = viewDate;
  }

  const calendarState = useCalendar(calendarProps);
  const handleTimeChange = useEventCallback((time: Dayjs) => {
    updateValue(time);
  });
  const handleOptionClick = useEventCallback((time: Dayjs) => {
    calendarState.updateUIBySelectedDate(time);
    updateValue(time);
  });
  const timePickerPanelProps = {
    hourStep,
    minuteStep,
    secondStep,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    hideDisabledOptions,
    value: finalValue,
    onChange: handleTimeChange,
    format: timeFormat,
  };
  const finalOptions = useMemo(
    () =>
      formatCalendarOptions(options, handleOptionClick, opt => {
        if (typeof opt.date === 'function') {
          warning(false, '[DateTimeCalendar]: option.date() return invalid date.');
        } else {
          warning(false, '[DateTimeCalendar]: options passed invalid date.');
        }
      }),
    [handleOptionClick, options],
  );

  return {
    calendarState,
    otherProps,
    finalValue,
    timePanelTitle: finalValue ? finalValue.format(timeFormat) : '',
    timePickerPanelProps,
    finalOptions,

    // 直接透传
    styles,
    allowClear,
    hideItemOutside,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,

    // 事件处理
    handleTimeChange,
    handleDateChange,
    handleClear,
    handleConfirm,

    // 给其他 Hook 使用
    updateValue,
  };
}
