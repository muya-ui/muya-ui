import React, { ChangeEvent, HTMLAttributes, useCallback, useMemo, useState } from 'react';

import { IRadioGroupOption, IRadioGroupProps } from './types';

const defaultRenderRadio = (radioNode: React.ReactElement) => radioNode;
export default function useRadioGroup<T extends HTMLElement>(props: IRadioGroupProps) {
  const {
    defaultValue = null,
    value: valueProp,
    options,
    onChange,
    children,
    radioEllipsis,
    radioWidth,
    renderRadio = defaultRenderRadio,
    ...restProps
  } = props;
  const isControlled = 'value' in props;
  const [innerValue, setInnerValue] = useState(defaultValue);
  const valueState = isControlled ? valueProp : innerValue;

  const opts: IRadioGroupOption[] = useMemo(() => {
    if (options && options.length) {
      return options.map(option => {
        if (typeof option === 'string') {
          return {
            label: option,
            value: option,
          };
        }

        return option;
      });
    }
    return [];
  }, [options]);

  const handleChange = useCallback(
    (option: IRadioGroupOption, e: ChangeEvent<HTMLInputElement>) => {
      setInnerValue(option.value);
      if (option.onChange) {
        option.onChange(e);
      }
      if (onChange && option.value !== valueState) {
        onChange(option.value);
      }
    },
    [onChange, valueState],
  );

  const handleClick = useCallback(
    (option: IRadioGroupOption & HTMLAttributes<T>, e: React.MouseEvent<T, MouseEvent>) => {
      setInnerValue(option.value);
      if (option.onClick) {
        option.onClick(e);
      }
      if (onChange && option.value !== valueState) {
        onChange(option.value);
      }
    },
    [onChange, valueState],
  );

  return {
    opts,
    valueState,
    restProps,
    children,
    radioEllipsis,
    radioWidth,
    handleChange,
    handleClick,
    renderRadio,
  };
}
