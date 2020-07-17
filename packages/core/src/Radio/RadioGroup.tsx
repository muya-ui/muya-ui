import React, { Ref, useMemo } from 'react';

import memoForwardRef from '../utils/memoForwardRef';
import useTheme from '../utils/useTheme';
import Radio from './Radio';
import { StyledRadioGroup } from './styled';
import { IRadioGroupOption, IRadioGroupProps } from './types';
import useRadioGroup from './useRadioGroup';

const RadioGroup = memoForwardRef((props: IRadioGroupProps, ref: Ref<HTMLDivElement>) => {
  const {
    opts,
    valueState,
    handleChange,
    handleClick,
    children,
    renderRadio,
    radioEllipsis,
    radioWidth,
    restProps,
  } = useRadioGroup(props);
  const theme = useTheme();
  const radioList = useMemo(() => {
    if (opts && opts.length) {
      return opts.map((option, optIndex) => {
        const { label, value, disabled, ellipsis, width } = option;
        const radioNode = (
          <Radio
            key={String(value)}
            value={value}
            size={props.size}
            styles={props.styles}
            ellipsis={ellipsis === undefined ? radioEllipsis : ellipsis}
            width={width || radioWidth}
            disabled={props.disabled || disabled}
            checked={valueState === value}
            onChange={handleChange.bind(null, option)}
            onClick={handleClick.bind(null, option)}
          >
            {label}
          </Radio>
        );
        return renderRadio(radioNode, option, optIndex);
      });
    }

    return React.Children.map(children, (child, childIndex) => {
      if (!React.isValidElement(child)) {
        return null;
      }
      const {
        value,
        disabled,
        onChange,
        children: label,
        ellipsis,
        width,
        ...otherChildProps
      } = child.props;
      const option: IRadioGroupOption = { value, disabled, onChange, label };
      const radioNode = React.cloneElement(child, {
        ...otherChildProps,
        children: label,
        value,
        ellipsis: ellipsis === undefined ? radioEllipsis : ellipsis,
        width: width || radioWidth,
        checked: valueState === value,
        disabled: props.disabled || disabled,
        styles: props.styles,
        size: props.size,
        onChange: handleChange.bind(null, option),
        onClick: handleClick.bind(null, option),
      });
      return renderRadio(radioNode, option, childIndex);
    });
  }, [
    opts,
    children,
    props.size,
    props.styles,
    props.disabled,
    radioEllipsis,
    radioWidth,
    valueState,
    handleChange,
    handleClick,
    renderRadio,
  ]);

  return (
    <StyledRadioGroup ref={ref} theme={theme} {...restProps}>
      {radioList}
    </StyledRadioGroup>
  );
});

export default RadioGroup;
