import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';
import warning from 'warning';

import { useEventCallback } from '@muya-ui/utils';

import { useLocale } from '../Locale';
import { ICalendarFooterOption } from './innerTypes';
import {
  ICalendarSelectType,
  ICalendarType,
  IRangeCalendarChangeEvent,
  IRangeCalendarPureProps,
  IRangeCalendarUIChangeEvent,
} from './types';
import useCalendarBase from './useCalendarBase';
import {
  formatStartEnd,
  getRangeInOrder,
  getRangeViewDate,
  getRangeViewType,
  getSelectDateType,
  inRange,
  isSame,
  moveOne,
  transformType,
} from './utils';

// 从 props 中获取 UI 状态
export function getUIStateFromProps(
  props: IRangeCalendarPureProps,
  fixedStart?: Dayjs,
  fixedEnd?: Dayjs,
): IRangeCalendarUIChangeEvent {
  const {
    selectType = 'date',
    defaultRange,
    defaultViewDate,

    viewDate,
    viewType,
    range,
    start,
    end,
  } = props;

  const innerViewType = getRangeViewType(selectType, viewType);
  let argViewDate;
  let argNum: 1 | -1 = 1;
  if (viewDate) {
    argViewDate = viewDate;
  } else if (start && end) {
    argViewDate = [start, end];
  } else if (start && !end) {
    argViewDate = [start, start];
  } else if (!start && end) {
    argViewDate = [end, end];
    argNum = -1;
  } else if (range && !start && !end) {
    argViewDate = range;
  } else if (defaultRange) {
    argViewDate = defaultRange;
  } else if (fixedStart) {
    argViewDate = [fixedStart, fixedStart];
  } else if (fixedEnd) {
    argViewDate = [fixedEnd, fixedEnd];
    argNum = -1;
  } else if (defaultViewDate) {
    argViewDate = defaultViewDate;
  }

  const innerViewDate = getRangeViewDate(innerViewType, argViewDate, argNum);

  return {
    viewType: innerViewType,
    viewDate: innerViewDate,
  };
}
export function getStateFromProps(props: IRangeCalendarPureProps): IRangeCalendarChangeEvent {
  const { start, end, range, defaultRange } = props;
  const notControlled = !start && !range && !end;
  if (notControlled && !defaultRange) {
    return {};
  }

  if (notControlled && defaultRange) {
    const newRange = getRangeInOrder(defaultRange);
    if (!newRange) {
      return {};
    }
    const [newStart, newEnd] = newRange;
    return {
      start: newStart,
      end: newEnd,
      range: newRange,
    };
  }

  const innerRange = getRangeInOrder(range);

  let innerStart;
  let innerEnd;
  if (start) {
    innerStart = dayjs(start);
  }

  if (end) {
    innerEnd = dayjs(end);
  }

  return {
    range: innerRange,
    start: innerStart,
    end: innerEnd,
  };
}

export function updateRangeViewType(
  key: 0 | 1,
  viewType: [ICalendarType, ICalendarType],
  type: ICalendarType,
): [ICalendarType, ICalendarType] {
  if (key === 1) {
    return [viewType[0], type];
  }

  return [type, viewType[1]];
}

export function updateRangeViewDate(
  key: 0 | 1,
  viewDate: [Dayjs, Dayjs],
  date: Dayjs,
): [Dayjs, Dayjs] {
  if (key === 1) {
    return [viewDate[0], date];
  }

  return [date, viewDate[1]];
}

export function getFixedState(
  state: IRangeCalendarChangeEvent,
  fixedStart?: Dayjs,
  fixedEnd?: Dayjs,
): IRangeCalendarChangeEvent {
  const noStartEnd = !state.start && !state.end;

  if (fixedStart && noStartEnd) {
    state.start = fixedStart;
    const innerRangeEnd = state.range && state.range[1] ? state.range[1] : fixedStart;
    state.range = [fixedStart, innerRangeEnd];
    return state;
  }

  if (fixedEnd && noStartEnd) {
    state.end = fixedEnd;
    const innerRangeStart = state.range && state.range[0] ? state.range[0] : fixedEnd;
    state.range = [innerRangeStart, fixedEnd];
    return state;
  }

  return state;
}

export function formatRangeState(
  newState: IRangeCalendarChangeEvent,
  selectType: ICalendarSelectType,
): IRangeCalendarChangeEvent {
  const { start, end, range } = newState;
  let innerStart = start;
  let innerEnd = end;
  let innerRange = range;
  if (innerStart) {
    const newStart = formatStartEnd(innerStart, false, selectType);
    if (!newStart.isSame(innerStart)) {
      innerStart = newStart;
      if (innerRange && innerRange[0]) {
        innerRange[0] = newStart;
      }
    }
  }
  if (innerEnd) {
    const newEnd = formatStartEnd(innerEnd, true, selectType);
    if (!newEnd.isSame(innerEnd)) {
      innerEnd = newEnd;
      if (innerRange && innerRange[1]) {
        innerRange[1] = newEnd;
      }
    }
  }
  return {
    start: innerStart,
    end: innerEnd,
    range: innerRange,
  };
}

export default function useRangeCalendar(props: IRangeCalendarPureProps) {
  const baseData = useCalendarBase(props);
  const {
    selectType = 'date',
    options,
    defaultRange,
    disableRange,
    disableDate,
    fixedEndDate,
    fixedStartDate,
    minRangeLength,
    maxRangeLength,
    allowClear = true,
    defaultViewDate,

    viewDate,
    viewType,
    range,
    start,
    end,

    todayDate,
    onUIChange,
    onChange,
    onSelect,
    styles,

    hideItemOutside,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,

    ...otherProps
  } = props;
  const selectTypeRef = useRef<ICalendarSelectType>(selectType);
  const defaultTransformViewType = transformType(selectType);
  const finalFixedStart = useMemo(() => (fixedStartDate ? dayjs(fixedStartDate) : undefined), [
    fixedStartDate,
  ]);
  const finalFixedEnd = useMemo(() => (fixedEndDate ? dayjs(fixedEndDate) : undefined), [
    fixedEndDate,
  ]);
  const uiStateFromProps = useMemo(
    () =>
      getUIStateFromProps(
        {
          selectType,
          defaultRange,
          defaultViewDate,

          viewDate,
          viewType,
          start,
          end,
          range,
        },
        finalFixedStart,
        finalFixedEnd,
      ),
    [
      defaultRange,
      defaultViewDate,
      end,
      finalFixedEnd,
      finalFixedStart,
      range,
      selectType,
      start,
      viewDate,
      viewType,
    ],
  );
  const stateFromProps = useMemo(
    () =>
      getStateFromProps({
        start,
        end,
        range,
        defaultRange,
      }),
    [defaultRange, end, range, start],
  );
  const [state, setState] = useState<IRangeCalendarChangeEvent>(stateFromProps);
  const [uiState, setUIState] = useState<IRangeCalendarUIChangeEvent>(uiStateFromProps);

  const finalUIState: IRangeCalendarUIChangeEvent = {
    ...uiState,
  };
  const finalState: IRangeCalendarChangeEvent = { ...state };
  if ('viewType' in props) {
    finalUIState.viewType = uiStateFromProps.viewType;
  }
  if ('viewDate' in props) {
    finalUIState.viewDate = uiStateFromProps.viewDate;
  }
  if ('start' in props) {
    finalState.start = stateFromProps.start;
  }
  if ('end' in props) {
    finalState.end = stateFromProps.end;
  }
  if ('range' in props) {
    finalState.range = stateFromProps.range;
  }

  // 固定某一个选中的时间
  getFixedState(finalState, finalFixedStart, finalFixedEnd);

  if (selectTypeRef.current !== selectType) {
    selectTypeRef.current = selectType;
    setUIState(uiStateFromProps);
    setState(stateFromProps);
  }

  const updateUI = (inputState: Partial<IRangeCalendarUIChangeEvent>) => {
    if (!inputState.viewDate && !inputState.viewType) {
      return;
    }
    const newState: IRangeCalendarUIChangeEvent = {
      ...finalUIState,
      ...inputState,
    };
    const [viewLeftDate, viewRightDate] = newState.viewDate;
    const [oldViewLeftDate] = finalUIState.viewDate;
    // 目标状态下，两个日历的日期一样了
    const rightIsEarily = !viewLeftDate.isBefore(viewRightDate);

    const leftNotChange = isSame(viewLeftDate, oldViewLeftDate, defaultTransformViewType);
    // 右边更早，同时做成没变，那么移动左边的日历
    if (rightIsEarily && leftNotChange) {
      const newViewLeftDate = moveOne(viewRightDate, defaultTransformViewType, -1);
      newState.viewDate = [newViewLeftDate, viewRightDate];
    } else if (rightIsEarily) {
      const newViewRightDate = moveOne(viewLeftDate, defaultTransformViewType);
      newState.viewDate = [viewLeftDate, newViewRightDate];
    }
    setUIState(newState);
    if (onUIChange) {
      onUIChange(newState);
    }
  };

  const updateSelected = (inputState: IRangeCalendarChangeEvent) => {
    const mergeState: IRangeCalendarChangeEvent = {
      ...finalState,
      ...inputState,
    };
    const newState = formatRangeState(mergeState, selectType);

    setState(newState);
    if (onChange) {
      onChange(newState);
    }
    if (onSelect && newState.start && newState.end) {
      onSelect([newState.start, newState.end]);
    }
    return newState;
  };

  // 在 range datepicker 里用
  // 注意传进来的 range 必须是 valid 也就是合法的 Dayjs 对象
  const selectRange = (range: [Dayjs, Dayjs], backToDefaultViewType: boolean = false) => {
    const newRange = getRangeInOrder(range)!;
    updateSelected({
      start: newRange[0],
      range: newRange,
      end: newRange[1],
    });

    const [viewLeftDate, viewRightDate] = finalUIState.viewDate;
    const [leftViewType, rightViewType] = finalUIState.viewType;
    const startIsSame = isSame(newRange[0], viewLeftDate, leftViewType);
    const endIsSame = isSame(newRange[1], viewRightDate, rightViewType);

    const newUIState: Partial<IRangeCalendarUIChangeEvent> = {};
    if (
      backToDefaultViewType &&
      (leftViewType !== defaultTransformViewType || rightViewType !== defaultTransformViewType)
    ) {
      newUIState.viewType = [defaultTransformViewType, defaultTransformViewType];
    }
    if (!startIsSame || !endIsSame) {
      newUIState.viewDate = getRangeViewDate(
        [defaultTransformViewType, defaultTransformViewType],
        newRange,
      );
    }
    updateUI(newUIState);
  };

  /**
   * 选择区间第一个点
   * @param date 选择的日期
   * @param key 0 | 1 0 表示左边的面板，1 表示右边的面板
   * @param syncView 是否同步面板
   */
  const selectFirstDate = (date: Dayjs, key: 0 | 1, syncView: boolean = false) => {
    const [viewLeftDate, viewRightDate] = finalUIState.viewDate;
    const [viewLeftType, viewRightType] = finalUIState.viewType;
    let innerStart;
    let innerEnd;
    let innerRange;
    let newViewLeftDate;
    let newViewRightDate;

    if (key === 1) {
      innerEnd = date;
      const rangeStart = minRangeLength
        ? date.subtract(minRangeLength, getSelectDateType(selectType))
        : date;
      innerRange = [rangeStart, innerEnd] as [Dayjs, Dayjs];
      if (rangeStart.isBefore(viewLeftDate)) {
        newViewLeftDate = rangeStart;
      }
    } else {
      innerStart = date;
      const rangeEnd = minRangeLength
        ? date.add(minRangeLength, getSelectDateType(selectType))
        : date;
      innerRange = [innerStart, rangeEnd] as [Dayjs, Dayjs];
      if (rangeEnd.isAfter(viewRightDate)) {
        newViewRightDate = rangeEnd;
      }
    }
    updateSelected({
      start: innerStart,
      range: innerRange,
      end: innerEnd,
    });

    if (syncView && key === 1 && !isSame(viewRightDate, date, viewRightType)) {
      newViewRightDate = date;
    } else if (syncView && !isSame(viewLeftDate, date, viewLeftType)) {
      newViewLeftDate = date;
    }

    if (newViewLeftDate || newViewRightDate) {
      const innerViewLeftDate = newViewLeftDate || viewLeftDate;
      const innerViewRightDate = newViewRightDate || viewRightDate;
      updateUI({
        viewDate: [innerViewLeftDate, innerViewRightDate],
      });
    }
  };

  const clearSelected = () => {
    updateSelected({
      start: undefined,
      range: undefined,
      end: undefined,
    });
  };
  const clickSelectDate = (date: Dayjs, key: 0 | 1) => {
    const noSelectedDate = !finalState.end && !finalState.start;
    if (noSelectedDate) {
      selectFirstDate(date, key);
      return;
    }
    const hasSelected = finalState.end && finalState.start;

    if (hasSelected && inRange(date, [finalState.start!, finalState.end!]) && allowClear) {
      clearSelected();
      return;
    }

    if (hasSelected && !(finalFixedStart || finalFixedEnd)) {
      selectFirstDate(date, key);
      return;
    }

    if (hasSelected && finalFixedStart) {
      updateSelected({
        start: finalFixedStart,
        end: date,
        range: [finalFixedStart, date],
      });
      return;
    }
    if (hasSelected && finalFixedEnd) {
      updateSelected({
        start: date,
        end: finalFixedEnd,
        range: [date, finalFixedEnd],
      });
      return;
    }

    const compareDate = finalState.start || finalState.end;
    const range = getRangeInOrder([compareDate!, date])!;
    const start = range[0];
    const end = range[1];
    updateSelected({ start, end, range });
  };
  const hoverSelectDate = (date: Dayjs) => {
    if ((finalState.start && finalState.end) || (!finalState.start && !finalState.end)) {
      return;
    }
    const compareDate = finalState.start || finalState.end;
    const range = getRangeInOrder([compareDate!, date])!;
    let start;
    let end;
    // 这里的逻辑是跟当前 hover 到做比较
    // 如果时间比较早的是数组的第一个，且跟当前 hover 到的是同一个
    // 那么的 end 应该是上次点击选中的
    if (range[0].isSame(date, 'day')) {
      end = range[1];
    } else {
      start = range[0];
    }
    updateSelected({
      range,
      start,
      end,
    });
  };

  const handleSwitch = (key: 0 | 1) => (type: ICalendarType) => {
    updateUI({
      viewType: updateRangeViewType(key, finalUIState.viewType, type),
    });
  };

  const handleMove = (step: 1 | -1, cType: ICalendarType, key: 0 | 1) => () => {
    const newDate = moveOne(finalUIState.viewDate[key], cType, step);
    updateUI({
      viewDate: updateRangeViewDate(key, finalUIState.viewDate, newDate),
    });
  };
  const handleItemClick = (key: 0 | 1) => (date: Dayjs) => {
    if (finalUIState.viewType[key] === 'year' && selectType !== 'month') {
      updateUI({
        viewType: updateRangeViewType(key, finalUIState.viewType, 'month'),
        viewDate: updateRangeViewDate(
          key,
          finalUIState.viewDate,
          finalUIState.viewDate[key].set('month', date.get('month')),
        ),
      });
      return;
    }
    if (finalUIState.viewType[key] === 'decade' && selectType !== 'year') {
      const calendarType = selectType === 'date' ? 'month' : 'year';
      updateUI({
        viewType: updateRangeViewType(key, finalUIState.viewType, calendarType),
        viewDate: updateRangeViewDate(
          key,
          finalUIState.viewDate,
          finalUIState.viewDate[key].set('year', date.get('year')),
        ),
      });
      return;
    }

    clickSelectDate(date, key);
  };

  const [viewLeftType, viewRightType] = finalUIState.viewType;
  const leftYearType = viewLeftType === 'decade' ? 'decade' : 'year';
  const rightYearType = viewRightType === 'decade' ? 'decade' : 'year';
  const handleLeftSwitch = useEventCallback(handleSwitch(0));
  const handleLeftClick = useEventCallback(handleItemClick(0));
  const handleLeftPrevMonth = useEventCallback(handleMove(-1, 'month', 0));
  const handleLeftPrevYear = useEventCallback(handleMove(-1, leftYearType, 0));
  const handleLeftNextMonth = useEventCallback(handleMove(1, 'month', 0));
  const handleLeftNextYear = useEventCallback(handleMove(1, leftYearType, 0));

  const handleRightSwitch = useEventCallback(handleSwitch(1));
  const handleRightClick = useEventCallback(handleItemClick(1));
  const handleRightPrevMonth = useEventCallback(handleMove(-1, 'month', 1));
  const handleRightPrevYear = useEventCallback(handleMove(-1, rightYearType, 1));
  const handleRightNextMonth = useEventCallback(handleMove(1, 'month', 1));
  const handleRightNextYear = useEventCallback(handleMove(1, rightYearType, 1));
  const handleItemHover = useEventCallback(hoverSelectDate);

  const locale = useLocale();

  const handleOptionSelect = useEventCallback((inputRange: [Dayjs, Dayjs]) => {
    selectRange(inputRange, true);
  });

  const finalOptions = useMemo(() => {
    if (!options || options.length < 1) {
      return;
    }
    const innerOpts: ICalendarFooterOption[] = [];
    options.forEach(opt => {
      let rangeFn: () => [Dayjs, Dayjs];
      if (typeof opt.range === 'function') {
        const newRange = opt.range();
        const innerRange = getRangeInOrder(newRange);
        if (!innerRange) {
          warning(false, '[RangeCalendar]: option.range() return invalid range.');
          return;
        }
        // 处理了一下，opt.range 执行的时候应该是合法的，但是这里类型判断有问题
        // 所以 as any 处理了一下
        rangeFn = () => getRangeInOrder((opt.range as any)())!;
      } else {
        const innerRange = getRangeInOrder(opt.range);
        if (!innerRange) {
          warning(false, '[RangeCalendar]: rangeOptions passed invalid range.');
          return;
        }
        rangeFn = () => innerRange;
      }
      innerOpts.push({
        label: opt.label,
        disabled: opt.disabled,
        onClick: () => {
          handleOptionSelect(rangeFn());
        },
      });
    });
    return innerOpts;
  }, [handleOptionSelect, options]);
  // 当国际化变了，得更新内存中 dayjs 对象的国际化
  const updateLocale = () => {
    const localeKey = locale.dayjsLocaleKey;
    const newViewDate: [Dayjs, Dayjs] = [
      finalUIState.viewDate[0].locale(localeKey),
      finalUIState.viewDate[1].locale(localeKey),
    ];
    updateUI({
      viewDate: newViewDate,
    });

    if (!finalState.start && !finalState.end) {
      return;
    }

    let newRange: [Dayjs, Dayjs] | undefined;
    if (finalState.range) {
      newRange = [finalState.range[0].locale(localeKey), finalState.range[1].locale(localeKey)];
    }

    const newState: IRangeCalendarChangeEvent = {
      start: finalState.start ? finalState.start.locale(localeKey) : undefined,
      end: finalState.end ? finalState.end.locale(localeKey) : undefined,
      range: newRange,
    };

    updateSelected(newState);
  };

  useEffect(() => {
    const localeKey = locale.dayjsLocaleKey;
    // 任一变了就可以了
    const localeChange = localeKey !== finalUIState.viewDate[0].locale();
    if (!localeChange) {
      return;
    }
    updateLocale();
  });

  return {
    ...baseData,
    otherProps,
    finalOptions,
    finalState,
    finalUIState,
    finalFixedStart,
    finalFixedEnd,

    // 事件处理
    handleItemHover,
    handleLeftSwitch,
    handleLeftClick,
    handleLeftPrevMonth,
    handleLeftPrevYear,
    handleLeftNextMonth,
    handleLeftNextYear,

    handleRightSwitch,
    handleRightClick,
    handleRightPrevMonth,
    handleRightPrevYear,
    handleRightNextMonth,
    handleRightNextYear,
    handleOptionSelect,

    // 透传
    styles,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,
    hideItemOutside,
    disableDate,
    minRangeLength,
    maxRangeLength,

    // for test 或者在其他 Hooks 里用
    updateUI,
    updateSelected,
    selectRange,
    selectFirstDate,
    clearSelected,
  };
}
