import React, { useMemo, useRef } from 'react';

import { useForkRef } from '@muya-ui/utils';

import { RangeCalendar } from '../Calendar';
import { IRangeInputElement } from '../Input';
import useLocale from '../Locale/useLocale';
import { StyledPopPanel } from '../styled/components/PopPanel';
import Trigger from '../Trigger';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { StyledRangeInput } from './styled';
import { IRangeDatePickerProps } from './types';
import usePickerBase from './usePickerBase';
import useRangeDatePicker from './useRangeDatePicker';

const defaultStyles = {
  popPanel: '',
};
const RangeDatePicker = memoForwardRef<IRangeInputElement, IRangeDatePickerProps>((props, ref) => {
  const theme = useTheme();

  const rangeInputRef = useRef<IRangeInputElement>(null);
  const handleRef = useForkRef(rangeInputRef, ref);
  const {
    finalUIState,
    finalState,
    finalValue,
    otherProps,

    // 事件处理
    handleFocus,
    handleClear,
    handleCalendarUIChange,
    handleInputChange,
    handleClickAway,
    handlePressEnter,
    handleCalendarChange,

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
  } = useRangeDatePicker(props, rangeInputRef);
  const { 'DatePicker.middleText': middleText } = useLocale();
  const inputStyles = useMemo(() => {
    if (!styles) {
      return;
    }
    const { inputWrapper, headInput, tailInput, nodeDivider, nodeWrapper, clearWrapper } = styles;
    return {
      inputWrapper,
      headInput,
      tailInput,
      nodeDivider,
      nodeWrapper,
      clearWrapper,
    };
  }, [styles]);
  const currentStyles = useMemo(() => {
    if (!styles) {
      return;
    }
    const { popPanel } = styles;
    return { popPanel };
  }, [styles]);
  const innerStyles = useStyles('range-date-picker', defaultStyles, currentStyles);

  const { suffixNode: innerSuffixNode } = usePickerBase();
  const realNode = (
    <StyledRangeInput
      {...otherProps}
      ref={handleRef}
      value={finalValue}
      onChange={handleInputChange}
      onFocus={handleFocus}
      allowClear={allowClear}
      clearReplace
      disabled={disabled}
      middleNode={middleText}
      focusWhenClear={false}
      suffixNode={innerSuffixNode}
      onPressEnter={handlePressEnter}
      onClear={handleClear}
      theme={theme}
      styles={inputStyles}
    />
  );
  if (disabled) {
    return realNode;
  }

  const rangeCalendarProps = {
    styles: calendarStyles,
    selectType,
    disableRange,
    disableDate,
    options,
    todayDate,
    minRangeLength,
    maxRangeLength,
    fixedEndDate,
    fixedStartDate,
    allowClear,

    renderDecadeItem,
    renderMonthItem,
    renderYearItem,
    renderMonthLabel,
    onSelect,
  };
  const calendarNode = (
    <StyledPopPanel {...innerStyles.popPanel} theme={theme}>
      <RangeCalendar
        {...rangeCalendarProps}
        onUIChange={handleCalendarUIChange}
        onChange={handleCalendarChange}
        range={finalState.range}
        start={finalState.start}
        end={finalState.end}
        viewDate={finalUIState.viewDate}
        viewType={finalUIState.viewType}
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

export default RangeDatePicker;
