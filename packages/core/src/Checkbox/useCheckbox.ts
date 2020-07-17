import React, { useState, useCallback } from 'react';

import { ICheckboxBaseProps } from './types';
import { Omit } from '../types';

type Props = Omit<ICheckboxBaseProps, 'styles'>;

export default function useCheckbox<T extends HTMLElement>(props: Props, isControlled: boolean) {
  const { checked, defaultChecked, disabled, onChange, onClick } = props;
  const [checkedState, setChecked] = useState((isControlled ? checked : defaultChecked) || false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return;
      }
      if (!isControlled) {
        setChecked(e.target.checked);
      }
      if (onChange) {
        onChange(e);
      }
    },
    [disabled, isControlled, onChange],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<T, MouseEvent>) => {
      if (disabled) {
        return;
      }
      if (!isControlled) {
        setChecked(!checkedState);
      }
      if (onClick) {
        onClick(e);
      }
    },
    [checkedState, disabled, isControlled, onClick],
  );

  if (isControlled && props.checked !== checkedState) {
    setChecked(props.checked!);
  }

  return {
    checkedState,
    handleChange,
    handleClick,
    setChecked,
  };
}
