import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';
import warning from 'warning';

import { useEventCallback } from '@muya-ui/utils';

import { useLocale } from '../Locale';
import {
  ICalendarItemStatus,
  ICalendarPureProps,
  ICalendarSelectType,
  ICalendarType,
  ICalendarUIChangeEvent,
} from './types';
import useCalendarBase from './useCalendarBase';
import { formatCalendarOptions, isSame, moveOne, transformType } from './utils';

export default function useCalendar(props: ICalendarPureProps) {
  const baseData = useCalendarBase(props);
  const {
    selectType = 'date',
    allowClear = true,
    selectedDate,
    todayDate,
    viewType,
    viewDate,
    defaultDate,
    disableRange,
    disableDate,
    options,
    onUIChange,
    onChange,
    onSelect,
    styles,
    defaultViewDate,

    hideItemOutside,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,

    ...otherProps
  } = props;
  let defaultSelectedDate;
  if (selectedDate) {
    defaultSelectedDate = dayjs(selectedDate);
  } else if (defaultDate) {
    defaultSelectedDate = dayjs(defaultDate);
  }
  const selectTypeRef = useRef<ICalendarSelectType>(selectType);
  const defaultTransformViewType = transformType(selectType);
  const uiStateFromProps = {
    viewDate: dayjs(viewDate || selectedDate || defaultDate || defaultViewDate),
    viewType: viewType || defaultTransformViewType,
  };
  const [uiState, setUIState] = useState<ICalendarUIChangeEvent>(uiStateFromProps);
  const [stateSelectedDate, setSelectedDate] = useState<Dayjs | undefined>(defaultSelectedDate);

  const finalUIState: ICalendarUIChangeEvent = {
    ...uiState,
  };
  let finalSelectedDate = stateSelectedDate;
  if ('viewDate' in props) {
    finalUIState.viewDate = uiStateFromProps.viewDate;
  }
  if ('viewType' in props) {
    finalUIState.viewType = uiStateFromProps.viewType;
  }
  if ('selectedDate' in props) {
    finalSelectedDate = selectedDate ? dayjs(selectedDate) : undefined;
  }
  if (selectTypeRef.current !== selectType) {
    selectTypeRef.current = selectType;
    setUIState(uiStateFromProps);
    setSelectedDate(undefined);
  }

  const updateUI = (inputState: Partial<ICalendarUIChangeEvent>) => {
    if (!inputState.viewDate && !inputState.viewType) {
      return;
    }
    const newState: ICalendarUIChangeEvent = {
      ...finalUIState,
      ...inputState,
    };
    setUIState(newState);
    if (onUIChange) {
      onUIChange(newState);
    }
  };

  const updateUIBySelectedDate = (date: Dayjs, backToDefaultViewType: boolean = false) => {
    const newUIState: Partial<ICalendarUIChangeEvent> = {
      viewDate: date,
      viewType: finalUIState.viewType,
    };
    if (!isSame(date, finalUIState.viewDate, finalUIState.viewType)) {
      newUIState.viewDate = date;
    }
    if (backToDefaultViewType && finalUIState.viewType !== defaultTransformViewType) {
      newUIState.viewType = defaultTransformViewType;
    }
    updateUI(newUIState);
  };

  const updateSelectedDate = (
    date?: Dayjs,
    syncView: boolean = false,
    backToDefaultViewType: boolean = false,
  ) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date);
    }

    if (onSelect && date) {
      onSelect(date);
    }

    if (syncView && date) {
      updateUIBySelectedDate(date, backToDefaultViewType);
    }
  };

  const handleItemClick = useEventCallback((date: Dayjs, status: ICalendarItemStatus) => {
    if (finalUIState.viewType === 'year' && selectType !== 'month') {
      updateUI({
        viewType: 'month',
        viewDate: finalUIState.viewDate.set('month', date.get('month')),
      });
      return;
    }
    if (finalUIState.viewType === 'decade' && selectType !== 'year') {
      updateUI({
        viewType: selectType === 'date' ? 'month' : 'year',
        viewDate: finalUIState.viewDate.set('year', date.get('year')),
      });
      return;
    }
    if (finalSelectedDate && finalSelectedDate.isSame(date, selectType) && allowClear) {
      updateSelectedDate(undefined);
    } else {
      updateSelectedDate(date, status === 'outside');
    }
  });
  const handleOptionClick = useEventCallback((date: Dayjs) => {
    updateSelectedDate(date, true, true);
  });

  const handleMove = (step: 1 | -1, type: ICalendarType) => () => {
    updateUI({
      viewDate: moveOne(finalUIState.viewDate, type, step),
    });
  };

  const handlePrevMonth = useEventCallback(handleMove(-1, 'month'));
  const handleNextMonth = useEventCallback(handleMove(1, 'month'));

  const yearBtnType = finalUIState.viewType === 'decade' ? 'decade' : 'year';
  const handlePrevYear = useEventCallback(handleMove(-1, yearBtnType));
  const handleNextYear = useEventCallback(handleMove(1, yearBtnType));

  const handleSwitch = useEventCallback((type: ICalendarType) => {
    updateUI({
      viewType: type,
    });
  });

  const locale = useLocale();
  const finalOptions = useMemo(
    () =>
      formatCalendarOptions(options, handleOptionClick, opt => {
        if (typeof opt.date === 'function') {
          warning(false, '[Calendar]: option.date() return invalid date.');
        } else {
          warning(false, '[Calendar]: options passed invalid date.');
        }
      }),
    [handleOptionClick, options],
  );

  // 当国际化变了，得更新内存中 dayjs 对象的国际化
  const updateLocale = () => {
    const localeKey = locale.dayjsLocaleKey;
    updateUI({
      viewDate: finalUIState.viewDate.locale(localeKey),
    });

    if (finalSelectedDate) {
      updateSelectedDate(finalSelectedDate.locale(localeKey));
    }
  };

  useEffect(() => {
    const localeKey = locale.dayjsLocaleKey;
    // 任一变了就可以了
    const localeChange = localeKey !== finalUIState.viewDate.locale();
    if (!localeChange) {
      return;
    }
    updateLocale();
  });

  return {
    ...baseData,
    otherProps,
    handleItemClick,
    handlePrevMonth,
    handleNextMonth,
    handlePrevYear,
    handleNextYear,
    handleSwitch,
    finalUIState,
    finalSelectedDate,
    finalOptions,
    updateUI,
    updateSelectedDate,
    updateUIBySelectedDate,

    // 透传回去的属性
    styles,
    hideItemOutside,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,
    disableDate,
  };
}
