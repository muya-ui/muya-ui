import dayjs, { Dayjs } from 'dayjs';
import { pick } from 'lodash';
import { useMemo, useState } from 'react';

import { useEventCallback } from '@muya-ui/utils';

import { ICalendarUIChangeEvent } from '../Calendar';
import forkHandler from '../utils/forkHandler';
import { IWeekCalendarProps } from './innerTypes';
import { IWeekPickerProps, IWeekPickerUIChangeEvent } from './types';
import useWeekCalendar from './useWeekCalendar';
import { formatWeek } from './utils';

export default function useWeekPicker(props: IWeekPickerProps) {
  const {
    // props from week calendar 直接透传
    options,
    todayDate,
    disableWeek,

    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,

    // props from calendar 有用
    onSelect,
    viewType,
    viewDate,
    defaultViewDate,

    // props from input
    disabled,
    defaultValue,
    value,
    allowClear = true,
    onFocus,
    onClear,

    // props from WeekPicker
    // inputDelay = 200,
    format = 'YYYY-MM-DD',
    formatSeparator = ' - ',
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
  const valuePropWeek = useMemo(() => formatWeek(value || defaultValue), [defaultValue, value]);
  const formatWeekStr = useMemo(() => {
    let tplFn: (week: [Dayjs, Dayjs]) => string;
    if (typeof format === 'function') {
      tplFn = format;
    } else {
      tplFn = (week: [Dayjs, Dayjs]) => {
        return `${week[0].format(format)}${formatSeparator}${week[1].format(format)}`;
      };
    }
    return (week?: [Dayjs, Dayjs]) => {
      if (week) {
        return tplFn(week);
      }
      return '';
    };
  }, [format, formatSeparator]);
  const [statePopupOpen, setPopupOpen] = useState(false);
  // const [stateValue, setStateValue] = useState(formatWeekStr(valuePropWeek));
  const finalPopupOpen = popupOpen !== undefined ? popupOpen : statePopupOpen;

  const calendarProps: IWeekCalendarProps = pick(props, [
    'selectedWeek',
    'viewType',
    'viewDate',
    'disableWeek',
    'defaultViewDate',
  ]);
  if (defaultValue) {
    calendarProps.defaultWeek = defaultValue;
  }

  if ('value' in props && !('selectedWeek' in props) && !finalPopupOpen) {
    calendarProps.selectedWeek = valuePropWeek;
  }
  calendarProps.onUIChange = useEventCallback((inputState: ICalendarUIChangeEvent) => {
    const newState: IWeekPickerUIChangeEvent = {
      popupOpen: finalPopupOpen,
      ...inputState,
    };
    if (onUIChange) {
      onUIChange(newState);
    }
  });
  calendarProps.onChange = useEventCallback((week?: [Dayjs, Dayjs]) => {
    if (!onChange) {
      return;
    }
    if (onChange) {
      onChange(week ? week : [dayjs(''), dayjs('')]);
    }
  });
  /**
   * 这里复用 hooks 的逻辑需要注意的点：
   * * 事件处理一定要在这个 hook 里处理
   */
  const calendarState = useWeekCalendar(calendarProps);
  const { finalSelectedWeek } = calendarState;

  const finalUIState: IWeekPickerUIChangeEvent = {
    ...calendarState.finalUIState,
    popupOpen: finalPopupOpen,
  };
  const finalValue = formatWeekStr(finalSelectedWeek);

  // 切换日历面板的显示隐藏
  const updateUI = (innerPopupOpen: boolean) => {
    const newState: IWeekPickerUIChangeEvent = {
      ...calendarState.finalUIState,
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
  const closePopup = () => {
    if (!finalUIState.popupOpen) {
      return;
    }
    updateUI(false);
  };

  const handleCalendarUIChange = useEventCallback((inputState: ICalendarUIChangeEvent) => {
    calendarState.updateUI(inputState);
  });

  const handleCalendarChange = useEventCallback(
    forkHandler((week?: [Dayjs, Dayjs]) => {
      calendarState.updateSelectedWeek(week);

      if (week) {
        closePopup();
      }
    }, onCalendarChange),
  );
  const handleFocus = useEventCallback(
    forkHandler(() => {
      updateUI(true);
    }, onFocus),
  );

  const handleClear = useEventCallback(
    forkHandler(() => {
      calendarState.updateSelectedWeek();
    }, onClear),
  );

  const handleClickAway = useEventCallback(() => {
    if (finalPopupOpen) {
      closePopup();
    }
  });

  return {
    // 处理后的数据
    finalUIState,
    finalSelectedWeek,
    finalValue,
    otherProps,

    // 事件处理
    handleFocus,
    handleCalendarChange,
    handleCalendarUIChange,
    handleClickAway,
    handleClear,

    // 直接透传
    styles,
    disabled,
    options,
    todayDate,
    disableWeek,
    allowClear,

    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,
    onSelect,
    calendarStyles,

    // triggerProps
    placement,
    popperProps,
    arrowPointAtCenter,
    triggerId,
    flip,

    // for test
    formatWeekStr,
  };
}
