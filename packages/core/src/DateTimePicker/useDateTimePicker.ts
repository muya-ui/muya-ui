import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';

import { useEventCallback } from '@muya-ui/utils';

import { ICalendarUIChangeEvent } from '../Calendar/types';
import { IDatePickerUIChangeEvent } from '../DatePicker/types';
import forkHandler from '../utils/forkHandler';
import { IDateTimeCalendarPureProps } from './innerTypes';
import { IDateTimePickerProps } from './types';
import useDateTimeCalendar from './useDateTimeCalendar';

const defaultDateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

const HReg = /H+/;
const HmReg = /H[^m]+m+/;
const HmsReg = /H[^s]+s+/;
export function getTimeFormatByFormat(format: string | Function) {
  if (format === defaultDateTimeFormat || typeof format === 'function') {
    return 'HH:mm:ss';
  }
  const hmsResult = format.match(HmsReg);
  if (hmsResult && hmsResult[0]) {
    return hmsResult[0];
  }
  const hmResult = format.match(HmReg);
  if (hmResult && hmResult[0]) {
    return hmResult[0];
  }
  const hResult = format.match(HReg);
  if (hResult && hResult[0]) {
    return hResult[0];
  }

  return 'HH:mm:ss';
}

export default function useDateTimePicker(props: IDateTimePickerProps) {
  const {
    // props from datetime calendar
    // ---- calendar props
    todayDate,
    viewType,
    viewDate,
    disableRange,
    disableDate,
    options,
    defaultViewDate,

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

    // props from input
    disabled,
    onFocus,
    onClear,

    // props from DateTimePicker
    defaultValue,
    value,
    format = defaultDateTimeFormat,
    timeFormat,
    allowClear = true,
    popupOpen,
    onChange,
    onUIChange,
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
  const isControlled = 'value' in props;
  const finalTimeFormat = timeFormat || getTimeFormatByFormat(format);

  const valueFromProps = useMemo(() => {
    if (isControlled) {
      if (!value) {
        return;
      }
      const innerDate = dayjs(value);
      if (innerDate.isValid()) {
        return innerDate;
      }
      return;
    }
    if (!defaultValue) {
      return;
    }
    const innerDate = dayjs(defaultValue);
    if (innerDate.isValid()) {
      return innerDate;
    }
  }, [defaultValue, isControlled, value]);
  const formatDateStr = useMemo(() => {
    let tplFn: (date: Dayjs) => string;
    if (typeof format === 'function') {
      tplFn = format;
    } else {
      tplFn = (date: Dayjs) => {
        return date.format(format);
      };
    }
    return (date?: Dayjs) => {
      if (date) {
        return tplFn(date);
      }
      return '';
    };
  }, [format]);
  const [statePopupOpen, setPopupOpen] = useState(false);
  // const [stateValue, setStateValue] = useState(formatDateStr(valuePropWeek));
  const finalPopupOpen = popupOpen !== undefined ? popupOpen : statePopupOpen;
  const [calendarDate, setCalendarDate] = useState<Dayjs | undefined>(valueFromProps);
  const [inputDate, setInputDate] = useState<Dayjs | undefined>(valueFromProps);
  const finalInputDate = isControlled ? valueFromProps : inputDate;

  const calendarProps: IDateTimeCalendarPureProps = {
    allowClear,
    todayDate,
    disableRange,
    disableDate,
    options,
    defaultViewDate,
    defaultDate: defaultValue,
    selectedDate: calendarDate,
  };
  if ('viewType' in props) {
    calendarProps.viewType = viewType;
  }
  if ('viewDate' in props) {
    calendarProps.viewDate = viewDate;
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
    setCalendarDate(date);
    if (!date) {
      setInputDate(undefined);
      if (onChange) {
        onChange(dayjs(''));
      }
    }
  });
  /**
   * 这里复用 hooks 的逻辑需要注意的点：
   * * 事件处理一定要在这个 hook 里处理
   */
  const calendarState = useDateTimeCalendar(calendarProps);

  const finalUIState: IDatePickerUIChangeEvent = {
    ...calendarState.calendarState.finalUIState,
    popupOpen: finalPopupOpen,
  };
  const finalValue = finalPopupOpen ? formatDateStr(calendarDate) : formatDateStr(finalInputDate);

  // 切换日历面板的显示隐藏
  const updateUI = (innerPopupOpen: boolean) => {
    const newState: IDatePickerUIChangeEvent = {
      ...calendarState.calendarState.finalUIState,
      popupOpen: innerPopupOpen,
    };
    setPopupOpen(innerPopupOpen);

    if (onUIChange) {
      onUIChange(newState);
    }
  };

  /**
   * 关闭日历面板
   */
  function closePopup() {
    if (!finalUIState.popupOpen) {
      return;
    }
    updateUI(false);
  }

  const handleCalendarUIChange = useEventCallback((inputState: ICalendarUIChangeEvent) => {
    calendarState.calendarState.updateUI(inputState);
  });

  const handleCalendarChange = useEventCallback(
    forkHandler((date?: Dayjs) => {
      calendarState.updateValue(date);
    }, onCalendarChange),
  );
  const handleFocus = useEventCallback(
    forkHandler(() => {
      updateUI(true);
    }, onFocus),
  );

  const handleClear = useEventCallback(
    forkHandler(() => {
      calendarState.updateValue();
    }, onClear),
  );

  const handleClickAway = useEventCallback(() => {
    if (finalPopupOpen) {
      closePopup();
    }
  });

  const handleConfirm = useEventCallback((date: Dayjs) => {
    setInputDate(date);
    closePopup();
    if (onChange) {
      onChange(date);
    }
  });

  return {
    // 处理后的数据
    finalUIState,
    finalInputDate,
    calendarDate,
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
  };
}
