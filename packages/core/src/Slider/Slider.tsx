import React from 'react';

import memoForwardRef from '../utils/memoForwardRef';
import BaseSlider from './BaseSlider';
import { IRangeSliderProps, ISliderProps } from './types';

export function useSlider(props: Pick<ISliderProps, 'onChange' | 'onAfterChange'>) {
  const { onChange, onAfterChange } = props;
  const handleChange = React.useCallback(
    (val: [number, number]) => {
      onChange && onChange(val[1]);
    },
    [onChange],
  );
  const handleAfterChange = React.useCallback(
    (val: [number, number]) => {
      onAfterChange && onAfterChange(val[1]);
    },
    [onAfterChange],
  );
  return {
    handleChange,
    handleAfterChange,
  };
}

const Slider = memoForwardRef<HTMLDivElement, ISliderProps>((props, ref) => {
  const { value, defaultValue, onChange, onAfterChange, min = 0, ...otherProps } = props;
  const restProps: IRangeSliderProps = {};
  if ('value' in props) {
    restProps['value'] = [min, props.value || min];
  }

  if ('defaultValue' in props) {
    restProps['defaultValue'] = [min, props.defaultValue || min];
  }
  const { handleChange, handleAfterChange } = useSlider(props);

  return (
    <BaseSlider
      ref={ref}
      hideStart
      onChange={handleChange}
      onAfterChange={handleAfterChange}
      min={min}
      {...otherProps}
      {...restProps}
    />
  );
});

export const RangeSlider = memoForwardRef<HTMLDivElement, IRangeSliderProps>((props, ref) => {
  return <BaseSlider {...props} ref={ref} />;
});

export default Slider;
