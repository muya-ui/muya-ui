import React, { Ref, useMemo } from 'react';

import memoForwardRef from '../utils/memoForwardRef';
import useTheme from '../utils/useTheme';
import Checkbox from './Checkbox';
import { StyledCheckboxGroup } from './styled';
import { ICheckboxGroupOption, ICheckboxGroupProps } from './types';
import useCheckboxGroup from './useCheckboxGroup';

const CheckboxGroup = memoForwardRef(function Group(
  props: ICheckboxGroupProps,
  ref: Ref<HTMLDivElement>,
) {
  const { size = 'm', styles } = props;
  const {
    opts,
    restProps,
    valueState,
    children,
    renderCheckbox,
    checkboxEllipsis,
    checkboxWidth,
    handleChange,
  } = useCheckboxGroup(props);
  const theme = useTheme();
  const checkboxList = useMemo(() => {
    if (opts && opts.length) {
      return opts.map((option, optIndex) => {
        const { label, value, disabled, ellipsis, width } = option;
        const checkboxNode = (
          <Checkbox
            key={value.toString()}
            styles={styles}
            size={size}
            value={value}
            ellipsis={ellipsis === undefined ? checkboxEllipsis : ellipsis}
            width={width || checkboxWidth}
            disabled={props.disabled || disabled}
            checked={valueState.indexOf(value) > -1}
            onChange={handleChange.bind(null, option)}
          >
            {label}
          </Checkbox>
        );
        return renderCheckbox(checkboxNode, option, optIndex);
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
        ellipsis,
        width,
        children: label,
        ...otherChildProps
      } = child.props;
      const option: ICheckboxGroupOption = { value, disabled, onChange, label };
      const checkboxNode = React.cloneElement(child, {
        ...otherChildProps,
        children: label,
        value,
        ellipsis: ellipsis === undefined ? checkboxEllipsis : ellipsis,
        width: width || checkboxWidth,
        checked: valueState.indexOf(value) > -1,
        disabled: props.disabled || disabled,
        styles,
        size,
        onChange: handleChange.bind(null, option),
      });
      return renderCheckbox(checkboxNode, option, childIndex);
    });
  }, [
    checkboxEllipsis,
    checkboxWidth,
    children,
    handleChange,
    opts,
    props.disabled,
    renderCheckbox,
    size,
    styles,
    valueState,
  ]);

  return (
    <StyledCheckboxGroup {...restProps} ref={ref} theme={theme}>
      {checkboxList}
    </StyledCheckboxGroup>
  );
});

export default CheckboxGroup;
