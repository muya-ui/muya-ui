import React, { Ref } from 'react';

import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import {
  StyledRadioIcon,
  StyledRadioInner,
  StyledRadioInput,
  StyledRadioLabel,
  StyledRadioText,
} from './styled';
import { IRadioProps } from './types';
import useRadio from './useRadio';

const defaultStyles = {
  wrapper: '',
  inputRadio: '',
  innerRadio: '',
  text: '',
};

const Radio = memoForwardRef((props: IRadioProps, ref: Ref<HTMLLabelElement>) => {
  const {
    autoFocus = false,
    disabled = false,
    defaultChecked = false,
    ellipsis = false,
    width,
    checked,
    children,
    size = 'm',
    onChange,
    onMouseEnter,
    onMouseLeave,
    styles,
    inputRef,
    className,
    style,
    ...restProps
  } = props;
  const theme = useTheme();
  const innerStyles = useStyles('radio', defaultStyles, styles);
  const { checkedState, handleInputChange, handleClick, handleInputClick } = useRadio(
    props,
    'checked' in props,
  );

  return (
    <StyledRadioLabel
      ref={ref}
      theme={theme}
      $disabled={disabled}
      $width={width}
      $ellipsis={ellipsis}
      $checked={checkedState!}
      className={[innerStyles.wrapper.className, className].join(' ').trim()}
      style={{ ...innerStyles.wrapper.style, ...style }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
    >
      <StyledRadioIcon>
        <StyledRadioInput
          {...restProps}
          {...innerStyles.inputRadio}
          ref={inputRef}
          type="radio"
          autoFocus={autoFocus}
          checked={checkedState}
          onClick={handleInputClick}
          onChange={handleInputChange}
          disabled={disabled}
        />
        <StyledRadioInner
          {...innerStyles.innerRadio}
          theme={theme}
          $checked={checkedState!}
          $size={size}
        />
      </StyledRadioIcon>
      <StyledRadioText {...innerStyles.text} theme={theme} $size={size}>
        {children}
      </StyledRadioText>
    </StyledRadioLabel>
  );
});

export default Radio;
