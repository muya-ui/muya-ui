import React, { useMemo, useRef } from 'react';

import { useForkRef } from '@muya-ui/utils';
import { ClockIcon } from '@muya-ui/theme-light';

import { StyledPopPanel } from '../styled/components/PopPanel';
import { StyledSuffixIcon } from '../styled/components/SuffixIcon';
import Trigger, { ITriggerAction } from '../Trigger';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { StyledFooter, StyledInput } from './styled';
import TimePickerPanel from './TimePickerPanel';
import { ITimePickerProps } from './types';
import useTimePicker from './useTimePicker';

const triggerActions: Array<ITriggerAction> = ['click'];
const defaultStyles = {
  popPanel: '',
  footer: '',
  panel: '',
};
const TimePicker = memoForwardRef<HTMLInputElement, ITimePickerProps>((props, ref) => {
  const {
    // own props
    value,
    defaultValue,
    format,
    onChange,
    allowClear = true,
    options,
    styles,
    defaultScrollBehavior,

    // panel props
    hourStep,
    minuteStep,
    secondStep,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    hideDisabledOptions,

    // input props
    disabled,
    onFocus,
    onClear,
    onPressEnter,
    inputRef,

    // trigger props
    popperProps,
    flip,
    arrowPointAtCenter,
    placement,
    triggerId,
    ...otherProps
  } = props;
  const theme = useTheme();
  const innerInputRef = useRef<HTMLInputElement>(null);
  const handleInputRef = useForkRef(innerInputRef, inputRef);
  const InputIcon = theme.components.DatePicker.inputIcon || ClockIcon;
  const innerSuffixNode = useMemo(
    () => (
      <StyledSuffixIcon theme={theme}>
        <InputIcon />
      </StyledSuffixIcon>
    ),
    [theme],
  );
  const {
    finalPopupOpen,
    finalValue,
    stateDate,
    finalOptions,

    handleClear,
    handleFocus,
    handleInputChange,
    handleClickAway,
    handlePressEnter,
    handlePanelChange,
  } = useTimePicker(props, innerInputRef);
  const inputProps = {
    allowClear,
    disabled,
    theme,
    ref,
    clearReplace: true,
    focusWhenClear: false,
  };
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
  const realNode = (
    <StyledInput
      inputRef={handleInputRef}
      value={finalValue}
      suffixNode={innerSuffixNode}
      onChange={handleInputChange}
      onFocus={handleFocus}
      onClear={handleClear}
      onPressEnter={handlePressEnter}
      styles={inputStyles}
      {...inputProps}
      {...otherProps}
    />
  );

  const currentStyles = useMemo(() => {
    if (!styles) {
      return;
    }
    const { popPanel, footer, panel } = styles;
    return { popPanel, footer, panel };
  }, [styles]);
  const footerStyles = useMemo(() => {
    if (!styles) {
      return;
    }
    const { footerOption } = styles;
    return { footerOption };
  }, [styles]);

  const innerStyles = useStyles('time-picker', defaultStyles, currentStyles);

  if (disabled) {
    return realNode;
  }

  const panelProps = {
    hourStep,
    minuteStep,
    secondStep,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    hideDisabledOptions,
    format,
    styles,
    defaultScrollBehavior,
  };
  const panelNode = (
    <StyledPopPanel theme={theme} {...innerStyles.popPanel}>
      <TimePickerPanel
        {...innerStyles.panel}
        value={stateDate}
        onChange={handlePanelChange}
        {...panelProps}
      />
      {finalOptions && finalOptions.length && (
        <StyledFooter {...innerStyles.footer} options={finalOptions} styles={footerStyles} />
      )}
    </StyledPopPanel>
  );

  const triggerProps = {
    placement,
    triggerActions,
    popperProps,
    arrowPointAtCenter,
    triggerId,
    flip,
    hideArrow: true,
  };

  return (
    <Trigger
      popup={panelNode}
      open={finalPopupOpen}
      onClickAway={handleClickAway}
      {...triggerProps}
    >
      {realNode}
    </Trigger>
  );
});

(TimePicker as any).__MUYA_TIMEPICKER = true;

export default TimePicker;
