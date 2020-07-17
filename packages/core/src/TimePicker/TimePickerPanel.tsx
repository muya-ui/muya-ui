import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import useLocale from '../Locale/useLocale';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import TimePickerNumberList from './TimePickerNumberList';
import { ITimePickerPanelProps } from './types';
import useTimePickerPanel from './useTimePickerPanel';

const StyledPanel = styled.div`
  ${props => {
    const token = props.theme.components.TimePicker;
    const { pattern } = props.theme.colors;
    return css`
      width: ${token.width}px;
      display: flex;
      justify-content: center;
      background-color: ${pattern.background.higher};
      padding: ${token.panelPadding};
    `;
  }}
`;
const defaultStyles = {
  hourCol: '',
  minuteCol: '',
  secondCol: '',
};
const TimePickerPanel = memoForwardRef<HTMLInputElement, ITimePickerPanelProps>((props, ref) => {
  const theme = useTheme();
  const {
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

    handleHourChange,
    handleMinuteChange,
    handleSecondChange,
  } = useTimePickerPanel(props);
  const pickStyles = useMemo(() => {
    if (!styles) {
      return;
    }
    const { hourCol, minuteCol, secondCol } = styles;
    return {
      hourCol,
      minuteCol,
      secondCol,
    };
  }, [styles]);
  const innerStyles = useStyles('time-picker', defaultStyles, pickStyles);

  const {
    'TimePicker.hour': hourLabel,
    'TimePicker.minute': minuteLabel,
    'TimePicker.second': secondLabel,
  } = useLocale();

  return (
    <StyledPanel ref={ref} theme={theme} {...otherProps}>
      <TimePickerNumberList
        {...innerStyles.hourCol}
        label={hourLabel}
        max={23}
        rowNum={rowNum}
        step={hourStep}
        selected={selectedHour}
        disableNum={disabledHours}
        hideDisabledNum={hideDisabledOptions}
        onChange={handleHourChange}
        styles={styles}
        defaultScrollBehavior={defaultScrollBehavior}
      />
      {showMinute && (
        <TimePickerNumberList
          {...innerStyles.minuteCol}
          label={minuteLabel}
          rowNum={rowNum}
          step={minuteStep}
          selected={selectedMinute}
          disableNum={disabledMinutes}
          hideDisabledNum={hideDisabledOptions}
          onChange={handleMinuteChange}
          styles={styles}
          defaultScrollBehavior={defaultScrollBehavior}
        />
      )}
      {showSecond && (
        <TimePickerNumberList
          {...innerStyles.secondCol}
          label={secondLabel}
          rowNum={rowNum}
          step={secondStep}
          selected={selectedSecond}
          disableNum={disabledSeconds}
          hideDisabledNum={hideDisabledOptions}
          onChange={handleSecondChange}
          styles={styles}
          defaultScrollBehavior={defaultScrollBehavior}
        />
      )}
    </StyledPanel>
  );
});

export default TimePickerPanel;
