import dayjs from 'dayjs';

import { useEffect, useMemo, useState } from 'react';

import { ITimePickerPanelProps } from './types';

export default function useTimePickerPanel(props: ITimePickerPanelProps) {
  const {
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    rowNum,
    format = 'HH:mm:ss',
    disabledHours,
    disabledMinutes: propDisabledMinutes,
    disabledSeconds: propDisabledSeconds,
    hideDisabledOptions,
    defaultScrollBehavior,
    value,
    defaultValue,
    styles,
    onChange,
    ...otherProps
  } = props;

  const showMinute = format.includes('m');
  const showSecond = format.includes('s');

  const propsDate = useMemo(() => {
    const v = value || defaultValue || '';
    return dayjs(v);
  }, [defaultValue, value]);
  const [stateDate, setStateDate] = useState(propsDate);
  const propsDateIsValid = propsDate.isValid();
  const stateDateIsValid = stateDate.isValid();

  const propSelectedHour = propsDateIsValid ? propsDate.hour() : -1;
  let propSelectedMinute = propsDateIsValid ? propsDate.minute() : -1;
  let propSelectedSecond = propsDateIsValid ? propsDate.second() : -1;

  if (!showMinute) {
    propSelectedMinute = 0;
  }
  if (!showSecond) {
    propSelectedSecond = 0;
  }

  const [selectedHour, setSelectedHour] = useState(propSelectedHour);
  const [selectedMinute, setSelectedMinute] = useState(propSelectedMinute);
  const [selectedSecond, setSelectedSecond] = useState(propSelectedSecond);

  if (
    'value' in props &&
    ((propsDateIsValid && !stateDateIsValid) ||
      (!propsDateIsValid && stateDateIsValid) ||
      (propsDateIsValid && stateDateIsValid && !propsDate.isSame(stateDate, 's')))
  ) {
    setStateDate(propsDate);
    setSelectedHour(propSelectedHour);
    setSelectedMinute(propSelectedMinute);
    setSelectedSecond(propSelectedSecond);
  }

  const disabledMinutes = useMemo(() => {
    if (propDisabledMinutes) {
      return propDisabledMinutes(selectedHour);
    }
  }, [propDisabledMinutes, selectedHour]);

  const disabledSeconds = useMemo(() => {
    if (propDisabledSeconds) {
      return propDisabledSeconds(selectedHour, selectedMinute);
    }
  }, [propDisabledSeconds, selectedHour, selectedMinute]);

  useEffect(() => {
    if (onChange && selectedHour >= 0 && selectedMinute >= 0 && selectedSecond >= 0) {
      let newDate = stateDateIsValid ? stateDate.clone() : dayjs();
      newDate = newDate
        .set('h', selectedHour)
        .set('m', selectedMinute)
        .set('s', selectedSecond);

      if (!stateDateIsValid || !newDate.isSame(stateDate, 's')) {
        onChange(newDate);
      }
    }
  }, [onChange, selectedHour, selectedMinute, selectedSecond, stateDate, stateDateIsValid]);

  return {
    otherProps,
    selectedHour,
    selectedMinute,
    selectedSecond,

    disabledHours,
    disabledMinutes,
    disabledSeconds,
    hideDisabledOptions,

    showMinute,
    showSecond,

    hourStep,
    minuteStep,
    secondStep,
    rowNum,
    styles,
    defaultScrollBehavior,

    handleHourChange: setSelectedHour,
    handleMinuteChange: setSelectedMinute,
    handleSecondChange: setSelectedSecond,
  };
}
