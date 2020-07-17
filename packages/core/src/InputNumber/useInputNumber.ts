import React, {
  useState,
  ChangeEventHandler,
  FocusEventHandler,
  useMemo,
  useCallback,
} from 'react';

import forkHandler from '../utils/forkHandler';
import { KeyCode } from '../utils/keyCode';

import handleNumber from './handleNumber';
import { IInputNumberProps } from './types';
import { addNum, handleSymbol } from './utils';

type IBaseProps = Pick<
  IInputNumberProps,
  | 'onChange'
  | 'onKeyDown'
  | 'onBlur'
  | 'onCompositionStart'
  | 'onCompositionEnd'
  | 'value'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onFocus'
  | 'min'
  | 'max'
  | 'step'
  | 'precision'
  | 'defaultValue'
  | 'disableBlurFormat'
>;

interface IProps extends IBaseProps {
  focus: () => void;
}

const getValidInputValue = (event: React.ChangeEvent<HTMLInputElement>, input: string) => {
  let value = event.target.value
    .trim()
    .replace(/。/g, '.')
    .replace(/[^\d.-]/g, '');
  const hasCurrentSymbol = value.startsWith('-');
  value = value.replace(/-/g, '');
  if (hasCurrentSymbol) value = '-' + value;
  if (value.split('.').length > 2) {
    value = input;
  }
  return value;
};

export default function useInputNumber(props: IProps, isControlled: boolean) {
  const {
    focus,
    defaultValue = '',
    onChange,
    onKeyDown,
    onBlur,
    onFocus,
    onCompositionStart,
    onCompositionEnd,
    value,
    onMouseEnter,
    onMouseLeave,
    min = -Infinity,
    max = Infinity,
    step,
    precision = 1,
    disableBlurFormat = false,
  } = props;

  const [inputValue, setInputValue] = useState(defaultValue);
  const [entered, setEntered] = useState(false);
  const [isFocus, setFocus] = useState(false);
  const [composition, setComposition] = useState(false);
  const [isArrowClicked, setArrowClicked] = useState(false);

  const { getCurrentValidValue, toNumber, getValidValue } = useMemo(
    () =>
      handleNumber({
        min,
        max,
        precision,
        inputValue,
      }),
    [inputValue, max, min, precision],
  );
  const validValue = getValidValue(value);
  const showValue = inputValue ? inputValue.toString() : validValue;
  const currentValue = isFocus ? showValue : getValidValue(isControlled ? validValue : inputValue);

  const getArrowStatus = useCallback(
    (val: number) => {
      if (val >= max) {
        return { up: true, down: false };
      } else if (val <= min) {
        return { down: true, up: false };
      } else {
        return { down: false, up: false };
      }
    },
    [max, min],
  );

  const emitChangeEvent = useCallback(
    (value: string, formattedValue: string | number) => {
      if (value === '') {
        onChange && onChange('', NaN);
      } else {
        onChange && onChange(value, Number(formattedValue));
      }
    },
    [onChange],
  );

  const setCurrentValue = useCallback(
    (val: string) => {
      if (onChange) {
        let data;
        if (handleSymbol(val)) {
          data = val;
        } else if (val === '' || isNaN(Number(val))) {
          data = '';
        } else {
          data = val;
        }
        const number = data === '' ? NaN : Number(data);
        setInputValue(data);
        emitChangeEvent(data, number);
      }
    },
    [emitChangeEvent, onChange],
  );

  const updateValue = useCallback(
    (val: string | number) => {
      // setArrowStatus(Number(val));
      setInputValue(val.toString());
      setCurrentValue(val.toString());
    },
    [setCurrentValue, setInputValue],
  );

  const changeStep = useCallback(
    (type: 'up' | 'down') => {
      setArrowClicked(true);
      focus();
      const arrowDisabled = getArrowStatus(Number(currentValue));
      if (type === 'up' && arrowDisabled.up) return;
      if (type === 'down' && arrowDisabled.down) {
        if (currentValue === '') {
          setInputValue(min.toString());
          emitChangeEvent(min.toString(), min);
        }
        return;
      }

      let val;
      if (type === 'up') {
        val = addNum(Number(currentValue) || 0, step!);
      } else {
        val = addNum(Number(currentValue) || 0, -step!);
      }
      val = getCurrentValidValue(val.toString());
      updateValue(val);
    },
    [
      currentValue,
      emitChangeEvent,
      focus,
      getArrowStatus,
      getCurrentValidValue,
      min,
      step,
      updateValue,
    ],
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      if (composition) return;
      let val = getValidInputValue(event, currentValue);
      updateValue(val);
    },
    [composition, currentValue, updateValue],
  );

  const handleMouseEnter = useMemo(
    () =>
      forkHandler(() => {
        setEntered(true);
      }, onMouseEnter),
    [onMouseEnter],
  );

  const handleFocus = useMemo(
    () =>
      forkHandler(() => {
        setFocus(true);
      }, onFocus),
    [onFocus],
  );

  const handleMouseLeave = useMemo(
    () =>
      forkHandler(() => {
        setEntered(false);
      }, onMouseLeave),
    [onMouseLeave],
  );

  const handleKeyDown = useMemo(
    () =>
      forkHandler(e => {
        if (composition) setComposition(false);
        const keyCode = e.keyCode;
        // 输入左右箭头及退格键
        if (keyCode === KeyCode.LEFT || keyCode === KeyCode.RIGHT || keyCode === KeyCode.BACKSPACE)
          return;
        // 输入上下箭头
        if (keyCode === KeyCode.UP) {
          changeStep('up');
          e.preventDefault();
        } else if (keyCode === KeyCode.DOWN) {
          changeStep('down');
          e.preventDefault();
        }
        // 输入 -
        if (keyCode === KeyCode.NUM_MINUS || keyCode === KeyCode.DASH) {
          if (currentValue.startsWith('-') || (e.target as HTMLInputElement).selectionStart !== 0) {
            e.preventDefault();
          }
          return;
        }
        // 输入 . 。
        if (keyCode === KeyCode.PERIOD || keyCode === KeyCode.NUM_PERIOD) {
          if (currentValue.includes('.')) {
            e.preventDefault();
          }
          return;
        }
        // 输入数字
        if (
          (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) ||
          (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_NINE)
        ) {
          return;
        }
        e.preventDefault();
      }, onKeyDown),
    [changeStep, composition, currentValue, onKeyDown],
  );

  const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    e => {
      onBlur && onBlur(e);
      if (isArrowClicked && entered) {
        setArrowClicked(false);
        focus();
        return;
      }
      setFocus(false);
      const val = getValidInputValue(e, currentValue);
      const formattedValue = getCurrentValidValue(val);
      const formattedString = formattedValue.toString();
      const validFormattedValue = isNaN(Number(formattedValue)) ? '' : formattedString;
      const value = isControlled ? formattedString : validFormattedValue;
      setInputValue(value);
      !disableBlurFormat && emitChangeEvent(value, formattedValue);
    },
    [
      currentValue,
      disableBlurFormat,
      emitChangeEvent,
      entered,
      focus,
      getCurrentValidValue,
      isArrowClicked,
      isControlled,
      onBlur,
    ],
  );

  const handleComposition = useCallback(
    (type: boolean, e: React.CompositionEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setComposition(type);
      if (type) {
        onCompositionStart && onCompositionStart(e);
      } else {
        onCompositionEnd && onCompositionEnd(e);
      }
    },
    [onCompositionEnd, onCompositionStart],
  );

  return {
    handleComposition,
    handleBlur,
    handleChange,
    handleKeyDown,
    setInputValue,
    arrowDisabled: getArrowStatus(Number(currentValue)),
    inputValue: currentValue,
    entered,
    setEntered,
    isArrowClicked,
    setArrowClicked,
    handleMouseEnter,
    handleMouseLeave,
    changeStep,
    getCurrentValidValue,
    toNumber,
    getValidValue,
    handleFocus,
  };
}
