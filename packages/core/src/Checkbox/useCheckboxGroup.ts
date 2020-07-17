import React, { ChangeEvent, HTMLAttributes, useCallback, useMemo, useState } from 'react';
import { shallowEqualArrays } from 'shallow-equal';

import { ICheckboxGroupOption, ICheckboxGroupProps, ICheckboxGroupValue } from './types';

const defaultRenderCheckbox = (checkboxNode: React.ReactElement) => checkboxNode;
export default function useCheckboxGroup<T extends HTMLElement>(props: ICheckboxGroupProps) {
  const {
    defaultValue = [],
    disabled,
    value,
    options,
    onChange,
    onClick,
    children,
    renderCheckbox = defaultRenderCheckbox,
    checkboxEllipsis,
    checkboxWidth,
    ...restProps
  } = props;
  const isControlled = 'value' in props;
  const [valueState, setValueState] = useState((isControlled ? value : defaultValue) || []);

  const opts: ICheckboxGroupOption[] = useMemo(() => {
    return (options || []).map(option => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
        };
      }
      return option;
    });
  }, [options]);

  const handleLogic = useCallback(
    (checked: boolean, newValueState: ICheckboxGroupValue[], option: ICheckboxGroupOption) => {
      if (checked) {
        newValueState.push(option.value);
      } else {
        const index = newValueState.indexOf(option.value);
        newValueState.splice(index, 1);
      }
      if (!isControlled) {
        setValueState(newValueState);
      }
      if (onChange) {
        onChange(newValueState);
      }
    },
    [isControlled, onChange],
  );

  const handleChange = useCallback(
    (option: ICheckboxGroupOption, e: ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      const newValueState = [...valueState];
      handleLogic(checked, newValueState, option);
      if (option.onChange) {
        option.onChange(e);
      }
    },
    [handleLogic, valueState],
  );

  const handleClick = useCallback(
    (option: ICheckboxGroupOption & HTMLAttributes<T>, e: React.MouseEvent<T, MouseEvent>) => {
      const newValueState = [...valueState];
      const checked = newValueState.indexOf(option.value) > -1;
      handleLogic(!checked, newValueState, option);
      if (option.onClick) {
        option.onClick(e);
      }
    },
    [handleLogic, valueState],
  );

  if (isControlled && !shallowEqualArrays(props.value || [], valueState)) {
    setValueState(props.value || []);
  }

  return {
    opts,
    valueState,
    handleChange,
    handleClick,
    restProps,
    children,
    renderCheckbox,
    checkboxEllipsis,
    checkboxWidth,
  };
}
