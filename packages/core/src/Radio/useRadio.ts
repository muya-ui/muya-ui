import React, { ChangeEvent, useState, useCallback } from 'react';

import { IRadioProps } from './types';

export default function useRadio<T extends HTMLElement>(props: IRadioProps, isControlled: boolean) {
  const { checked, defaultChecked = false, disabled, onChange, onClick } = props;

  const [checkedState, setCheckedState] = useState(isControlled ? checked : defaultChecked);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return;
      }
      const value = e.target.checked;
      if (!isControlled) {
        setCheckedState(value);
      }
      if (onChange) {
        onChange(e);
      }
    },
    [disabled, isControlled, onChange],
  );

  const handleInputClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<T, MouseEvent>) => {
      if (disabled) {
        return;
      }
      // if (!isControlled) {
      //   setCheckedState(!checkedState);
      // }
      if (onClick) {
        onClick(e);
      }
    },
    [disabled, onClick],
  );

  if (isControlled && checkedState !== props.checked) {
    setCheckedState(props.checked!);
  }

  return {
    checkedState,
    handleInputChange,
    handleInputClick,
    handleClick,
    setCheckedState,
  };
}
