import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import warning from 'warning';

import { useEventCallback } from '@muya-ui/utils';

import { ICalendarFooterOption } from '../Calendar/innerTypes';
import { ICalendarItemStatus, ICalendarType, ICalendarUIChangeEvent } from '../Calendar/types';
import { isSame, moveOne } from '../Calendar/utils';
import { useLocale } from '../Locale';
import { IWeekCalendarProps } from './innerTypes';
import { formatWeek, getViewDateByWeek, isSameWeek } from './utils';

export default function useCalendar(props: IWeekCalendarProps) {
  const {
    selectedWeek,
    defaultWeek,

    // 下面的都是 Calendar 都有的
    todayDate,
    viewType = 'month',
    viewDate,
    options,
    onUIChange,
    onChange,
    onSelect,
    styles,
    allowClear = true,
    defaultViewDate,

    disableWeek,
    hideItemOutside,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,

    ...otherProps
  } = props;

  const finalTodayDate = useMemo(() => dayjs(todayDate), [todayDate]);
  const weekFromProps = useMemo(() => formatWeek(selectedWeek || defaultWeek), [
    defaultWeek,
    selectedWeek,
  ]);
  const uiStateFromProps: ICalendarUIChangeEvent = useMemo(() => {
    let innerViewDate;
    if (viewDate) {
      innerViewDate = viewDate;
    } else if (weekFromProps) {
      innerViewDate = getViewDateByWeek(weekFromProps);
    } else if (defaultViewDate) {
      innerViewDate = defaultViewDate;
    } else {
      innerViewDate = finalTodayDate;
    }
    return {
      viewDate: dayjs(innerViewDate),
      viewType,
    };
  }, [defaultViewDate, finalTodayDate, viewDate, viewType, weekFromProps]);
  const [uiState, setUIState] = useState<ICalendarUIChangeEvent>(uiStateFromProps);
  const [stateSelectedWeek, setSelectedWeek] = useState(weekFromProps);
  const [stateHoveredWeek, setHoveredWeek] = useState<[Dayjs, Dayjs] | undefined>();

  const finalUIState: ICalendarUIChangeEvent = { ...uiState };
  const finalSelectedWeek = 'selectedWeek' in props ? weekFromProps : stateSelectedWeek;
  if ('viewDate' in props) {
    finalUIState.viewDate = uiStateFromProps.viewDate;
  }
  if ('viewType' in props) {
    finalUIState.viewType = uiStateFromProps.viewType;
  }

  const updateUI = (inputState: Partial<ICalendarUIChangeEvent>) => {
    const newState: ICalendarUIChangeEvent = {
      ...finalUIState,
      ...inputState,
    };
    setUIState(newState);
    if (onUIChange) {
      onUIChange(newState);
    }
  };

  const updateSelectedWeek = (week?: [Dayjs, Dayjs]) => {
    setSelectedWeek(week);
    if (onChange) {
      onChange(week);
    }

    if (onSelect && week) {
      onSelect(week);
    }
  };

  const selectWeek = (week: [Dayjs, Dayjs]) => {
    if (allowClear && isSameWeek(week, finalSelectedWeek)) {
      updateSelectedWeek();
      return;
    }

    updateSelectedWeek(week);
    const newViewDate = getViewDateByWeek(week);
    if (!isSame(newViewDate, finalUIState.viewDate, finalUIState.viewType)) {
      updateUI({
        viewDate: newViewDate,
      });
    }
  };

  const handleItemClick = useEventCallback((date: Dayjs) => {
    if (finalUIState.viewType === 'year') {
      updateUI({
        viewType: 'month',
        viewDate: finalUIState.viewDate.set('month', date.get('month')),
      });
      return;
    }
    if (finalUIState.viewType === 'decade') {
      updateUI({
        viewType: 'month',
        viewDate: finalUIState.viewDate.set('year', date.get('year')),
      });
      return;
    }
    const selectedWeek = formatWeek(date);
    // 从面板上点击，这里不可能是 undefined ，看看后续是否要处理
    if (selectedWeek) {
      selectWeek(selectedWeek);
    }
  });
  const handleItemHover = useEventCallback((date: Dayjs, status: ICalendarItemStatus) => {
    if (status === 'normal' || status === 'outside' || status === 'range') {
      setHoveredWeek([date.startOf('w'), date.endOf('w')]);
    }
  });
  const handleLeavePanel = useEventCallback(() => {
    if (stateHoveredWeek) {
      setHoveredWeek(undefined);
    }
  });
  const handleOption = useEventCallback((week: [Dayjs, Dayjs]) => {
    selectWeek(week);
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

  const finalOptions = useMemo(() => {
    if (!options || options.length < 1) {
      return;
    }
    const innerOpts: ICalendarFooterOption[] = [];
    options.forEach(opt => {
      const innerWeek = formatWeek(opt.week);
      if (!innerWeek) {
        warning(false, `[WeekCalendar]: options passed invalid week.`);
        return;
      }
      innerOpts.push({
        label: opt.label,
        disabled: opt.disabled,
        onClick: () => {
          handleOption(innerWeek);
        },
      });
    });
    return innerOpts;
  }, [handleOption, options]);

  // 当国际化变了，得更新内存中 dayjs 对象的国际化
  const updateLocale = () => {
    const localeKey = locale.dayjsLocaleKey;
    updateUI({
      viewDate: finalUIState.viewDate.locale(localeKey),
    });
    if (finalSelectedWeek) {
      updateSelectedWeek([
        finalSelectedWeek[0].locale(localeKey),
        finalSelectedWeek[1].locale(localeKey),
      ]);
    }
    if (stateHoveredWeek) {
      setHoveredWeek([
        stateHoveredWeek[0].locale(localeKey),
        stateHoveredWeek[1].locale(localeKey),
      ]);
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
    // 处理过的数据
    finalUIState,
    finalSelectedWeek,
    stateHoveredWeek,
    finalOptions,
    finalTodayDate,
    otherProps,
    // 事件处理
    handleItemClick,
    handlePrevMonth,
    handleNextMonth,
    handlePrevYear,
    handleNextYear,
    handleSwitch,
    handleItemHover,
    handleLeavePanel,

    // 透传
    styles,
    disableWeek,
    hideItemOutside,
    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,

    // 另外一个 hooks 中使用
    updateSelectedWeek,

    // for test
    updateUI,
    updateLocale,
    selectWeek,
  };
}
