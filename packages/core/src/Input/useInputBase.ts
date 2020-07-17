import React, { useState, useCallback, useMemo } from 'react';

import forkHandler from '../utils/forkHandler';
import { IInputPureProps } from './types';

type IProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'autoFocus' | 'onFocus' | 'onBlur'
> &
  Pick<IInputPureProps, 'disabled'> &
  Pick<React.HTMLAttributes<HTMLDivElement>, 'onMouseEnter' | 'onMouseLeave'>;

export default function useInputBase(props: IProps) {
  const { autoFocus, disabled, onFocus, onBlur, onMouseEnter, onMouseLeave } = props;
  const [focus, setFocus] = useState(autoFocus);
  const [entered, setEntered] = useState(false);
  const beforeCheck = useCallback(
    (e: React.SyntheticEvent) => {
      // Fix a bug with IE 11 where the focus/blur events are triggered
      // while the input is disabled.
      if (disabled) {
        e.stopPropagation();
        return false;
      }
      return true;
    },
    [disabled],
  );

  const handleFocus = useMemo(
    () =>
      forkHandler<React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>>(
        () => {
          setFocus(true);
        },
        onFocus as (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
        beforeCheck,
      ),
    [beforeCheck, onFocus],
  );

  const handleBlur = useMemo(
    () =>
      forkHandler<React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>>(
        () => {
          setFocus(false);
        },
        onBlur as (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
        beforeCheck,
      ),
    [beforeCheck, onBlur],
  );

  const handleMouseEnter = useMemo(
    () =>
      forkHandler(() => {
        setEntered(true);
      }, onMouseEnter),
    [onMouseEnter],
  );

  const handleMouseLeave = useMemo(
    () =>
      forkHandler(() => {
        setEntered(false);
      }, onMouseLeave),
    [onMouseLeave],
  );

  return {
    focus,
    entered,

    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
  };
}
