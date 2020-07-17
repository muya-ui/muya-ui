import dayjs, { Dayjs } from 'dayjs';
import React, { useMemo, useRef, useState } from 'react';
import warning from 'warning';

import { useDebounce, useEventCallback } from '@muya-ui/utils';

import { formatCalendarOptions } from '../Calendar/utils';
import forkHandler from '../utils/forkHandler';
import { ITimePickerProps, ITimePickerUIChangeEvent } from './types';

const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm:ss';
const numReg = /\d/;
export function transformStr2Date(str: string, baseDate: Dayjs) {
  if (!numReg.test(str)) {
    return dayjs('');
  }
  let baseStr = '';
  if (baseDate.isValid()) {
    baseStr = baseDate.format(dateFormat);
  } else {
    baseStr = dayjs().format(dateFormat);
  }
  const newDate = dayjs(`${baseStr} ${str}`);
  return newDate;
}

export default function useTimePicker(
  props: ITimePickerProps,
  inputRef: React.RefObject<HTMLInputElement>,
) {
  const {
    value,
    defaultValue,

    onChange,
    onUIChange,

    popupOpen,
    format = timeFormat,
    onFocus,
    onClear,
    onPressEnter,
    allowClear = true,
    inputDelay = 200,
    options,
  } = props;

  const propsDate = useMemo(() => {
    const v = value || defaultValue || '';
    return dayjs(v);
  }, [defaultValue, value]);
  const propsValue = propsDate.isValid() ? propsDate.format(format) : '';

  const [stateDate, setStateDate] = useState(propsDate);
  const [statePopupOpen, setPopupOpen] = useState(false);
  const [stateValue, setStateValue] = useState(propsValue);

  const propsDateIsValid = propsDate.isValid();
  const stateDateIsValid = stateDate.isValid();

  if (
    'value' in props &&
    ((propsDateIsValid && !stateDateIsValid) ||
      (!propsDateIsValid && stateDateIsValid) ||
      (propsDateIsValid && stateDateIsValid && !propsDate.isSame(stateDate, 's')))
  ) {
    setStateDate(propsDate);
  }

  const finalPopupOpen = popupOpen !== undefined ? popupOpen : statePopupOpen;

  let finalValue = stateValue;
  if ('value' in props && !finalPopupOpen) {
    finalValue = propsValue;
  }

  const updateTime = (newTime: Dayjs) => {
    setStateDate(newTime);
    if (onChange) {
      onChange(newTime);
    }
  };

  // 切换日历面板的显示隐藏
  const updateUI = (innerPopupOpen: boolean) => {
    const newState: ITimePickerUIChangeEvent = {
      popupOpen: innerPopupOpen,
    };
    setPopupOpen(innerPopupOpen);

    if (onUIChange) {
      onUIChange(newState);
    }
  };

  const lastValidDate = useRef(propsDate.isValid() ? propsDate : undefined);
  const selectByValue = (newValue: string) => {
    const valueDate = transformStr2Date(newValue, stateDate);
    const valid = valueDate.isValid();
    if (valid) {
      lastValidDate.current = valueDate;
    }
    if (newValue === '' && allowClear) {
      updateTime(dayjs(''));
      return '';
    }

    if (lastValidDate.current) {
      updateTime(lastValidDate.current);
      return lastValidDate.current.format(format);
    }
    return '';
  };
  const [debounceUpdateInputSelected, clearUpdateInputSelected] = useDebounce(
    selectByValue,
    inputDelay,
  );

  /**
   * 关闭日历面板
   */
  const closePopup = () => {
    if (!finalPopupOpen) {
      return;
    }
    updateUI(false);
    clearUpdateInputSelected();
  };

  const handleInputChange = useEventCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    debounceUpdateInputSelected(e.target.value);
    setStateValue(e.target.value);
  });

  const handlePanelChange = useEventCallback((date: Dayjs) => {
    updateTime(date);
    setStateValue(date.format(format));
  });

  const handleFocus = useEventCallback(
    forkHandler(() => {
      updateUI(true);
    }, onFocus),
  );

  const handleClear = useEventCallback(
    forkHandler(() => {
      clearUpdateInputSelected();
      setStateValue('');
      updateTime(dayjs(''));
    }, onClear),
  );

  const handleClickAway = useEventCallback(closePopup);

  const handlePressEnter = useEventCallback(
    forkHandler(() => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
      const newValue = selectByValue(finalValue);
      closePopup();
      setStateValue(newValue);
    }, onPressEnter),
  );

  const handleOptionSelect = useEventCallback((newDate: Dayjs) => {
    if (!stateDate.isSame(newDate, 's')) {
      updateTime(newDate);
      setStateValue(newDate.format(format));
    }
  });

  const finalOptions = useMemo(
    () =>
      formatCalendarOptions(options, handleOptionSelect, opt => {
        if (typeof opt.date === 'function') {
          warning(false, '[TimePicker]: option.date() return invalid date.');
        } else {
          warning(false, '[TimePicker]: options passed invalid date.');
        }
      }),
    [handleOptionSelect, options],
  );

  return {
    finalPopupOpen,
    finalValue,
    stateDate,
    finalOptions,

    handleFocus,
    handleInputChange,
    handlePressEnter,
    handleClickAway,
    handleClear,
    handlePanelChange,
  };
}
