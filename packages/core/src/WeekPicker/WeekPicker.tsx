import React, { useMemo } from 'react';

import usePickerBase from '../DatePicker/usePickerBase';
import { StyledPopPanel } from '../styled/components/PopPanel';
import Trigger from '../Trigger';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { StyledInput } from './styled';
import { IWeekPickerProps } from './types';
import useWeekPicker from './useWeekPicker';
import WeekCalendar from './WeekCalendar';

const defaultStyles = {
  popPanel: '',
};
const WeekPicker = memoForwardRef<HTMLDivElement, IWeekPickerProps>((props, ref) => {
  const theme = useTheme();
  const {
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
  } = useWeekPicker(props);

  // input 的 styles 直接传个 input
  const inputStyles = useMemo(() => {
    if (!styles) {
      return;
    }
    const { inputWrapper, input, nodeDivider, nodeWrapper, clearWrapper, statusWrapper } = styles;
    return {
      inputWrapper,
      input,
      nodeDivider,
      nodeWrapper,
      clearWrapper,
      statusWrapper,
    };
  }, [styles]);
  const currentStyles = useMemo(() => {
    if (!styles) {
      return;
    }
    const { popPanel } = styles;
    return { popPanel };
  }, [styles]);
  const innerStyles = useStyles('week-picker', defaultStyles, currentStyles);

  const { suffixNode: innerSuffixNode } = usePickerBase();

  const realNode = (
    <StyledInput
      ref={ref}
      value={finalValue}
      suffixNode={innerSuffixNode}
      clearReplace
      focusWhenClear={false}
      theme={theme}
      styles={inputStyles}
      disabled={disabled}
      allowClear={allowClear}
      onFocus={handleFocus}
      onClear={handleClear}
      readOnly
      {...otherProps}
    />
  );
  if (disabled) {
    return realNode;
  }

  const calendarProps = {
    styles: calendarStyles,
    disableWeek,
    options,
    todayDate,
    onSelect,
    allowClear,

    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,
  };

  const calendarNode = (
    <StyledPopPanel {...innerStyles.popPanel} theme={theme}>
      <WeekCalendar
        viewDate={finalUIState.viewDate}
        viewType={finalUIState.viewType}
        selectedWeek={finalSelectedWeek}
        onChange={handleCalendarChange}
        onUIChange={handleCalendarUIChange}
        {...calendarProps}
      />
    </StyledPopPanel>
  );

  const triggerProps = {
    placement,
    popperProps,
    arrowPointAtCenter,
    triggerId,
    flip,
    hideArrow: true,
  };
  return (
    <Trigger
      popup={calendarNode}
      triggerAction="click"
      open={finalUIState.popupOpen}
      onClickAway={handleClickAway}
      {...triggerProps}
    >
      {realNode}
    </Trigger>
  );
});

(WeekPicker as any).__MUYA_WeekPicker = true;

export default WeekPicker;
