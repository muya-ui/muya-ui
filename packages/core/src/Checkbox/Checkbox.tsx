import React, { forwardRef, Ref, useMemo } from 'react';

import { CheckboxIcon, CheckIcon, HalfcheckboxIcon } from '@muya-ui/theme-light';

import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import {
  StyledCheckboxContent,
  StyledCheckboxIconWrap,
  StyledCheckboxInput,
  StyledCheckboxLabel,
  StyledCheckboxSpan,
} from './styled';
import { ICheckboxProps } from './types';
import useCheckbox from './useCheckbox';

const defaultStyles = {
  wrapper: '',
  icon: '',
  iconWrap: '',
  span: '',
};

const Checkbox = forwardRef(function Checkbox(props: ICheckboxProps, ref: Ref<HTMLLabelElement>) {
  const {
    checked,
    children,
    defaultChecked = false,
    disabled = false,
    indeterminate = false,
    autoFocus = false,
    readOnly = false,
    onChange,
    onMouseEnter,
    onMouseLeave,
    size = 'm',
    styles,
    style,
    className,
    inputRef,
    ellipsis = false,
    width,
    ...restProps
  } = props;
  const theme = useTheme();
  const innerStyles = useStyles('checkbox', defaultStyles, styles);
  const { checkedState, handleChange } = useCheckbox(props, 'checked' in props);
  const icons = useMemo(
    () => ({
      checked: CheckboxIcon,
      unChecked: CheckIcon,
      indeterminate: HalfcheckboxIcon,
      ...theme.components.Checkbox.icons,
    }),
    [theme.components.Checkbox.icons],
  );
  const {
    indeterminate: IndeterminateIcon,
    checked: CheckedIcon,
    unChecked: UnCheckedIcon,
  } = icons;
  const { iconBgColor, iconColor } = theme.components.Checkbox;
  const iconNode = useMemo(() => {
    if (indeterminate) {
      return <IndeterminateIcon bgColor={iconBgColor} {...innerStyles.icon} />;
    }
    if (checkedState) {
      return <CheckedIcon bgColor={iconBgColor} {...innerStyles.icon} />;
    }
    return (
      <UnCheckedIcon
        bgColor={iconBgColor}
        color={iconColor.unChecked.normal}
        {...innerStyles.icon}
      />
    );
  }, [checkedState, iconBgColor, iconColor.unChecked.normal, indeterminate, innerStyles.icon]);

  return (
    <StyledCheckboxLabel
      $disabled={disabled}
      $size={size}
      theme={theme}
      $width={width}
      $ellipsis={ellipsis}
      $checked={checkedState}
      $indeterminate={indeterminate!}
      ref={ref}
      className={[innerStyles.wrapper.className, className].join(' ').trim()}
      style={{ ...innerStyles.wrapper.style, ...style }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <StyledCheckboxSpan {...innerStyles.span} onClick={e => e.stopPropagation()}>
        <StyledCheckboxInput
          {...restProps}
          autoFocus={autoFocus}
          readOnly={readOnly}
          ref={inputRef}
          type="checkbox"
          disabled={disabled}
          checked={checkedState}
          theme={theme}
          onChange={handleChange}
        />
        <StyledCheckboxIconWrap theme={theme} {...innerStyles.iconWrap}>
          {iconNode}
        </StyledCheckboxIconWrap>
      </StyledCheckboxSpan>
      {children ? <StyledCheckboxContent theme={theme}>{children}</StyledCheckboxContent> : null}
    </StyledCheckboxLabel>
  );
});
export default React.memo(Checkbox);
