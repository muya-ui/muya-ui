import React, { useMemo } from 'react';

import { Calendar } from '../Calendar';
import { StyledPopPanel } from '../styled/components/PopPanel';
import Trigger from '../Trigger';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { StyledInput } from './styled';
import { IDatePickerProps } from './types';
import useDatePicker from './useDatePicker';
import usePickerBase from './usePickerBase';

const defaultStyles = {
  popPanel: '',
};
const DatePicker = memoForwardRef<HTMLDivElement, IDatePickerProps>((props, ref) => {
  const theme = useTheme();
  const {
    finalUIState,
    finalValue,
    finalSelectedDate,
    otherProps,

    // 事件处理
    handleFocus,
    handleClear,
    handleCalendarChange,
    handleCalendarUIChange,
    handleInputChange,
    handleClickAway,
    handlePressEnter,
    handleInputRef,

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
  } = useDatePicker(props);

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
  const innerStyles = useStyles('date-picker', defaultStyles, currentStyles);

  const { suffixNode: innerSuffixNode } = usePickerBase();

  const realNode = (
    <StyledInput
      ref={ref}
      inputRef={handleInputRef}
      value={finalValue}
      disabled={disabled}
      onChange={handleInputChange}
      onFocus={handleFocus}
      onClear={handleClear}
      suffixNode={innerSuffixNode}
      allowClear={allowClear}
      clearReplace
      focusWhenClear={false}
      theme={theme}
      onPressEnter={handlePressEnter}
      styles={inputStyles}
      {...otherProps}
    />
  );
  if (disabled) {
    return realNode;
  }

  const calendarProps = {
    styles: calendarStyles,
    selectType,
    disableRange,
    disableDate,
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
      <Calendar
        viewDate={finalUIState.viewDate}
        viewType={finalUIState.viewType}
        selectedDate={finalSelectedDate}
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

(DatePicker as any).__MUYA_DATEPICKER = true;

export default DatePicker;
