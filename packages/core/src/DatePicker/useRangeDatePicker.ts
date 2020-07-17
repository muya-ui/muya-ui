import dayjs, { Dayjs } from 'dayjs';
import { pick } from 'lodash';
import { RefObject, useMemo, useRef, useState } from 'react';

import { useDebounce, useEventCallback } from '@muya-ui/utils';

import {
  ICalendarSelectType,
  IRangeCalendarChangeEvent,
  IRangeCalendarPureProps,
  IRangeCalendarUIChangeEvent,
} from '../Calendar/types';
import useRangeCalendar from '../Calendar/useRangeCalendar';
import { IRangeInputChangeEvent, IRangeInputElement } from '../Input';
import forkHandler from '../utils/forkHandler';
import { IRangeDatePickerProps, IRangeDatePickerUIChangeEvent } from './types';
import useFormatDate from './useFormatDate';

/* eslint-disable complexity */
export default function useRangeDatePicker(
  props: IRangeDatePickerProps,
  rangeInputRef: RefObject<IRangeInputElement>,
) {
  const {
    // props from range calendar 需要透传的
    calendarStyles,
    selectType = 'date',
    disableRange,
    disableDate,
    options,
    todayDate,
    minRangeLength,
    maxRangeLength,
    fixedEndDate,
    fixedStartDate,
    defaultViewDate,

    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,

    // 不要透传的
    defaultRange,
    viewDate,
    viewType,
    range,
    start,
    end,
    onChange,
    onSelect,
    styles,

    // prop from range input 有使用
    value,
    defaultValue,
    middleNode,
    disabled,
    onFocus,
    onClear,
    onPressEnter,
    allowClear = true,

    // 本身的props
    inputDelay = 200,
    format,
    popupOpen,
    placement = 'bottom-start',
    triggerId,
    popperProps,
    flip,
    arrowPointAtCenter,
    onDateChange,
    onCalendarChange,
    onUIChange,
    ...otherProps
  } = props;
  const formatDate = useFormatDate(selectType, format);

  const selectTypeRef = useRef<ICalendarSelectType>(selectType);
  // 从 props 拿 value 的值
  const valuePropRange = useMemo<[Dayjs, Dayjs]>(() => {
    let [valueStart = '', valueEnd = ''] = value || [];
    let [defaultValueStart = '', defaultValueEnd = ''] = defaultValue || [];
    defaultValueStart = fixedStartDate || defaultValueStart;
    defaultValueEnd = fixedEndDate || defaultValueEnd;
    valueStart = valueStart || defaultValueStart;
    valueEnd = valueEnd || defaultValueEnd;

    return [dayjs(valueStart), dayjs(valueEnd)];
  }, [defaultValue, fixedEndDate, fixedStartDate, value]);
  const [valueStartFromProps, valueEndFromProps] = valuePropRange;
  const validStartFromProps = useMemo(
    () => (valueStartFromProps.isValid() ? valueStartFromProps : undefined),
    [valueStartFromProps],
  );
  const validEndFromProps = useMemo(
    () => (valueEndFromProps.isValid() ? valueEndFromProps : undefined),
    [valueEndFromProps],
  );

  const [statePopupOpen, setPopupOpen] = useState(false);
  const [stateValue, setStateValue] = useState<[string, string]>([
    formatDate(validStartFromProps),
    formatDate(validEndFromProps),
  ]);

  if (selectTypeRef.current !== selectType) {
    selectTypeRef.current = selectType;
    setStateValue([formatDate(validStartFromProps), formatDate(validEndFromProps)]);
  }

  const finalPopupOpen = popupOpen !== undefined ? popupOpen : statePopupOpen;
  let finalValue = stateValue;

  // range calender 的状态
  const rangeCalenderProps: IRangeCalendarPureProps = pick(props, [
    'selectType',
    'viewType',
    'viewDate',
    'start',
    'end',
    'range',
    'minRangeLength',
    'fixedEndDate',
    'fixedStartDate',
    'disableDate',
    'disableRange',
  ]);
  if (defaultValue) {
    rangeCalenderProps.defaultRange = defaultValue;
  }
  if (defaultRange || defaultViewDate) {
    rangeCalenderProps.defaultViewDate = defaultRange || defaultViewDate;
  }

  const valueControlled = 'value' in props;
  if (valueControlled && !('start' in props) && !finalPopupOpen) {
    rangeCalenderProps.start = validStartFromProps;
  }
  if (valueControlled && !('end' in props) && !finalPopupOpen) {
    rangeCalenderProps.end = validEndFromProps;
  }
  if (
    valueControlled &&
    !('range' in props) &&
    !finalPopupOpen &&
    validStartFromProps &&
    validEndFromProps
  ) {
    rangeCalenderProps.range = valuePropRange;
  }

  rangeCalenderProps.onUIChange = useEventCallback((inputState: IRangeCalendarUIChangeEvent) => {
    const newState: IRangeDatePickerUIChangeEvent = {
      popupOpen: finalPopupOpen,
      ...inputState,
    };
    if (onUIChange) {
      onUIChange(newState);
    }
  });
  rangeCalenderProps.onChange = useEventCallback((inputState: IRangeCalendarChangeEvent) => {
    const { start, end } = inputState;
    if (!onChange && !onDateChange) {
      return;
    }
    // 过滤掉 hover 区间的情况
    if ((!start && end) || (start && !end)) {
      return;
    }

    let newRange: [Dayjs, Dayjs];
    if (start && end) {
      newRange = [start, end];
    } else {
      newRange = [dayjs(''), dayjs('')];
    }
    if (onChange) {
      onChange(newRange);
    }
    if (onDateChange) {
      onDateChange([formatDate(start), formatDate(end)], newRange);
    }
  });

  const rangeCalenderState = useRangeCalendar(rangeCalenderProps);

  if ('value' in props && !finalPopupOpen) {
    const [rangeStart, rangeEnd] = valuePropRange;
    const rangeStartValue = formatDate(rangeStart);
    const rangeEndValue = formatDate(rangeEnd);
    finalValue = [rangeStartValue, rangeEndValue];
  }

  if (rangeCalenderState.finalFixedStart) {
    finalValue[0] = formatDate(rangeCalenderState.finalFixedStart);
  }

  if (rangeCalenderState.finalFixedEnd) {
    finalValue[1] = formatDate(rangeCalenderState.finalFixedEnd);
  }

  const finalUIState: IRangeDatePickerUIChangeEvent = {
    ...rangeCalenderState.finalUIState,
    popupOpen: finalPopupOpen,
  };

  const updateUI = (innerPopupOpen: boolean) => {
    const newState: IRangeDatePickerUIChangeEvent = {
      ...rangeCalenderState.finalUIState,
      popupOpen: innerPopupOpen,
    };
    setPopupOpen(innerPopupOpen);

    if (onUIChange) {
      onUIChange(newState);
    }
  };

  const lastLeftValidDate = useRef(validStartFromProps);
  const lastRightValidDate = useRef(validEndFromProps);
  const checkLeftValue = (leftValue: string) => {
    const leftDate = dayjs(leftValue);
    let leftValid = leftDate.isValid();
    if (leftValid && rangeCalenderState.isDateDisabled(leftDate)) {
      leftValid = false;
    } else if (
      leftValid &&
      rangeCalenderState.finalFixedEnd &&
      leftDate.isAfter(rangeCalenderState.finalFixedEnd)
    ) {
      leftValid = false;
    }
    return [leftValid, leftDate] as [boolean, Dayjs];
  };
  const checkRightValue = (rightValue: string) => {
    const rightDate = dayjs(rightValue);
    let rightValid = rightDate.isValid();
    if (rightValid && rangeCalenderState.isDateDisabled(rightDate)) {
      rightValid = false;
    } else if (
      rightValid &&
      rangeCalenderState.finalFixedStart &&
      rightDate.isAfter(rangeCalenderState.finalFixedStart)
    ) {
      rightValid = false;
    }
    return [rightValid, rightDate] as [boolean, Dayjs];
  };
  const selectByValue: (newValue: [string, string]) => [string, string] = newValue => {
    const [leftValue, rightValue] = newValue;
    const [leftValid, leftDate] = checkLeftValue(leftValue);
    const [rightValid, rightDate] = checkRightValue(rightValue);
    if (leftValid) {
      lastLeftValidDate.current = leftDate;
    }
    if (rightValid) {
      lastRightValidDate.current = rightDate;
    }
    if (!leftValid && !rightValid && allowClear) {
      rangeCalenderState.clearSelected();
      return ['', ''];
    }
    const newLeft = lastLeftValidDate.current;
    const newRight = lastRightValidDate.current;

    if (newLeft && newRight) {
      rangeCalenderState.selectRange([newLeft, newRight]);
      return [formatDate(newLeft), formatDate(newRight)];
    }

    if (newLeft) {
      rangeCalenderState.selectFirstDate(newLeft, 0, true);
      return [formatDate(newLeft), ''];
    }

    if (newRight) {
      rangeCalenderState.selectFirstDate(newRight, 1, true);
      return ['', formatDate(newRight)];
    }

    return ['', ''];
  };
  const [debounceUpdateInputSelected, clearUpdateInputSelected] = useDebounce(
    selectByValue,
    inputDelay,
  );

  const closePopup = () => {
    if (finalUIState.popupOpen) {
      updateUI(false);
      clearUpdateInputSelected();
    }
  };

  const handleCalendarUIChange = useEventCallback((inputState: IRangeCalendarUIChangeEvent) => {
    rangeCalenderState.updateUI(inputState);
  });
  const handleCalendarChange = useEventCallback(
    forkHandler((inputState: IRangeCalendarChangeEvent) => {
      const { start, end } = inputState;
      rangeCalenderState.updateSelected(inputState);

      if (start && end) {
        closePopup();
      }
      setStateValue([formatDate(start), formatDate(end)]);
    }, onCalendarChange),
  );

  const handleInputChange = useEventCallback((e: IRangeInputChangeEvent) => {
    debounceUpdateInputSelected(e.value);
    setStateValue(e.value);
  });

  const handleFocus = useEventCallback(
    forkHandler(() => {
      updateUI(true);
    }, onFocus),
  );

  const handleClear = useEventCallback(
    forkHandler(() => {
      rangeCalenderState.clearSelected();
      clearUpdateInputSelected();
      setStateValue(['', '']);
    }, onClear),
  );

  const handleClickAway = useEventCallback(() => {
    if (finalPopupOpen) {
      closePopup();
    }
  });
  const handlePressEnter = useEventCallback(
    forkHandler(() => {
      if (rangeInputRef.current) {
        rangeInputRef.current.blur(0);
        rangeInputRef.current.blur(1);
      }
      const newValue = selectByValue(finalValue);
      closePopup();
      setStateValue(newValue);
    }, onPressEnter),
  );

  return {
    finalUIState,
    finalValue,
    finalState: rangeCalenderState.finalState,
    otherProps,

    // 事件处理
    handleFocus,
    handleClear,
    handleCalendarUIChange,
    handleCalendarChange,
    handleInputChange,
    handleClickAway,
    handlePressEnter,

    // 透传
    styles,
    calendarStyles,
    allowClear,
    disabled,
    selectType,
    disableRange,
    disableDate,
    options,
    todayDate,
    minRangeLength,
    maxRangeLength,
    fixedEndDate,
    fixedStartDate,

    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,
    onSelect,

    // trigger
    placement,
    popperProps,
    arrowPointAtCenter,
    triggerId,
    flip,

    // for test,
    selectByValue,
    checkLeftValue,
    checkRightValue,
  };
}
