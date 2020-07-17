import dayjs, { Dayjs } from 'dayjs';
import { pick } from 'lodash';
import React, { useMemo, useRef, useState } from 'react';

import { useDebounce, useEventCallback, useForkRef } from '@muya-ui/utils';

import { ICalendarPureProps, ICalendarSelectType, ICalendarUIChangeEvent } from '../Calendar/types';
import useCalendar from '../Calendar/useCalendar';
import forkHandler from '../utils/forkHandler';
import { IDatePickerProps, IDatePickerUIChangeEvent } from './types';
import useFormatDate from './useFormatDate';

export default function useDatePicker(props: IDatePickerProps) {
  const {
    // props from calendar 直接透传
    selectType = 'date',
    disableRange,
    disableDate,
    options,
    todayDate,

    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,

    // props from calendar 有用
    onSelect,
    viewType,
    viewDate,
    selectedDate,
    defaultDate,
    defaultViewDate,

    // props from input
    disabled,
    defaultValue,
    value,
    onFocus,
    onClear,
    onPressEnter,
    allowClear = true,
    inputRef,

    // props from datepicker
    inputDelay = 200,
    format,
    popupOpen,
    onChange,
    onUIChange,
    onDateChange,
    onCalendarChange,
    suffixNode,
    placement = 'bottom-start',
    triggerId,
    popperProps,
    flip,
    arrowPointAtCenter,
    calendarStyles,
    styles,

    ...otherProps
  } = props;

  const selectTypeRef = useRef<ICalendarSelectType>(selectType);
  const innerInputRef = useRef<HTMLInputElement>(null);
  const handleInputRef = useForkRef(innerInputRef, inputRef);
  const formatDate = useFormatDate(selectType, format);
  const valuePropDate = useMemo(() => dayjs(value || defaultValue || ''), [defaultValue, value]);
  // 从 props 中获得的合法的 dayjs 对象
  const validValueDateFromProps = useMemo(
    () => (valuePropDate.isValid() ? valuePropDate : undefined),
    [valuePropDate],
  );
  const [statePopupOpen, setPopupOpen] = useState(false);
  const [stateValue, setStateValue] = useState(formatDate(valuePropDate));
  const finalPopupOpen = popupOpen !== undefined ? popupOpen : statePopupOpen;

  if (selectTypeRef.current !== selectType) {
    selectTypeRef.current = selectType;
    setStateValue(formatDate(valuePropDate));
  }

  const calendarProps: ICalendarPureProps = pick(props, [
    'selectType',
    'selectedDate',
    'viewType',
    'viewDate',
    'disableDate',
    'disableRange',
  ]);
  if (defaultValue) {
    calendarProps.defaultDate = defaultValue;
  }
  if (defaultDate || defaultViewDate) {
    calendarProps.defaultViewDate = defaultDate || defaultViewDate;
  }

  if ('value' in props && !('selectedDate' in props) && !finalPopupOpen) {
    calendarProps.selectedDate = validValueDateFromProps;
  }
  calendarProps.onUIChange = useEventCallback((inputState: ICalendarUIChangeEvent) => {
    const newState: IDatePickerUIChangeEvent = {
      popupOpen: finalPopupOpen,
      ...inputState,
    };
    if (onUIChange) {
      onUIChange(newState);
    }
  });
  calendarProps.onChange = useEventCallback((date?: Dayjs) => {
    if (!onDateChange && !onChange) {
      return;
    }
    const innerDate = date ? date : dayjs('');
    if (onDateChange) {
      const innerValue = date ? formatDate(date) : '';
      onDateChange(innerValue, innerDate);
    }
    if (onChange) {
      onChange(innerDate);
    }
  });
  /**
   * 这里复用 hooks 的逻辑需要注意的点：
   * * 事件处理一定要在这个 hook 里处理
   */
  const calendarState = useCalendar(calendarProps);

  const finalUIState: IDatePickerUIChangeEvent = {
    ...calendarState.finalUIState,
    popupOpen: finalPopupOpen,
  };
  let finalValue = stateValue;
  const { finalSelectedDate } = calendarState;
  if ('value' in props && !finalPopupOpen) {
    finalValue = formatDate(valuePropDate);
  }

  // 切换日历面板的显示隐藏
  const updateUI = (innerPopupOpen: boolean) => {
    const newState: IDatePickerUIChangeEvent = {
      ...calendarState.finalUIState,
      popupOpen: innerPopupOpen,
    };
    setPopupOpen(innerPopupOpen);

    if (onUIChange) {
      onUIChange(newState);
    }
  };

  const lastValidDate = useRef(validValueDateFromProps);
  const selectByValue = (newValue: string) => {
    const valueDate = dayjs(newValue);
    let valid = valueDate.isValid();
    if (valid && calendarState.isDateDisabled(valueDate)) {
      valid = false;
    }
    if (valid) {
      lastValidDate.current = valueDate;
    }
    if (newValue === '' && allowClear) {
      calendarState.updateSelectedDate();
      return '';
    } else {
      calendarState.updateSelectedDate(lastValidDate.current, true);
      return formatDate(lastValidDate.current);
    }
  };
  const [debounceUpdateInputSelected, clearUpdateInputSelected] = useDebounce(
    selectByValue,
    inputDelay,
  );

  /**
   * 关闭日历面板
   */
  const closePopup = () => {
    if (!finalUIState.popupOpen) {
      return;
    }
    updateUI(false);
    clearUpdateInputSelected();
  };

  const handleCalendarUIChange = useEventCallback((inputState: ICalendarUIChangeEvent) => {
    calendarState.updateUI(inputState);
  });

  const handleCalendarChange = useEventCallback(
    forkHandler((date?: Dayjs) => {
      calendarState.updateSelectedDate(date);

      if (date) {
        closePopup();
      }

      setStateValue(formatDate(date));
    }, onCalendarChange),
  );
  const handleInputChange = useEventCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    debounceUpdateInputSelected(e.target.value);
    setStateValue(e.target.value);
  });

  const handleFocus = useEventCallback(
    forkHandler(() => {
      updateUI(true);
    }, onFocus),
  );

  const handleClear = useEventCallback(
    forkHandler(() => {
      calendarState.updateSelectedDate();
      clearUpdateInputSelected();
      setStateValue('');
    }, onClear),
  );

  const handleClickAway = useEventCallback(() => {
    if (finalPopupOpen) {
      closePopup();
    }
  });

  const handlePressEnter = useEventCallback(
    forkHandler(() => {
      if (innerInputRef.current) {
        innerInputRef.current.blur();
      }
      const newValue = selectByValue(finalValue);
      closePopup();
      setStateValue(newValue);
    }, onPressEnter),
  );

  return {
    finalUIState,
    finalValue,
    finalSelectedDate,
    otherProps,

    // 事件处理
    handleFocus,
    handleCalendarChange,
    handleCalendarUIChange,
    handleInputChange,
    handlePressEnter,
    handleClickAway,
    handleClear,
    handleInputRef,

    // for test
    innerInputRef,

    // 透传....
    styles,
    disabled,
    allowClear,
    calendarStyles,
    onSelect,
    // props from calendar 直接透传
    selectType,
    disableRange,
    disableDate,
    options,
    todayDate,

    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,

    // trigger props
    placement,
    popperProps,
    arrowPointAtCenter,
    triggerId,
    flip,
  };
}
