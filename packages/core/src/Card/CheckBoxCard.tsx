import React, { useMemo } from 'react';
import Card from './Card';
import useTheme from '../utils/useTheme';
import { ICheckBoxCardProps } from './types';
import useCheckbox from '../Checkbox/useCheckbox';
import Checkbox from '../Checkbox';
import { StyleCardCheckBox } from './styled';
import useStyles from '../utils/useStyles';
import styled, { css } from 'styled-components';
import { IThemedBaseProps } from '../types';
import memoForwardRef from '../utils/memoForwardRef';
interface IStyledProps {
  $checked?: boolean;
}

const CheckBoxCardWrapper = styled(Card)`
  ${(props: IStyledProps & IThemedBaseProps) => {
    const { checkedBorder, normalBorder } = props.theme.components.Card.checkbox;
    if (props.$checked) {
      return css`
        border: ${checkedBorder};
      `;
    } else {
      return css`
        border: ${normalBorder};
      `;
    }
  }}
`;

const CheckBoxCard = memoForwardRef<HTMLDivElement, ICheckBoxCardProps>((props, ref) => {
  const {
    children,
    onChange,
    checked,
    defaultChecked,
    styles,
    showCheckbox = true,
    size = 'm',
    inputRef,
    ...others
  } = props;
  const theme = useTheme();
  const { checkedState, handleChange } = useCheckbox(props, 'checked' in props);

  const defaultStyles = useMemo(
    () => ({
      checkBoxWrapper: '',
      extraWrapper: '',
    }),
    [],
  );
  const innerStyles = useStyles('card', defaultStyles, styles);

  return (
    <CheckBoxCardWrapper
      $checked={checkedState}
      theme={theme}
      styles={styles}
      ref={ref}
      {...others}
    >
      {showCheckbox ? (
        <StyleCardCheckBox theme={theme} {...innerStyles.checkBoxWrapper}>
          <Checkbox
            checked={checkedState}
            onChange={handleChange}
            size={size}
            inputRef={inputRef}
          />
        </StyleCardCheckBox>
      ) : null}
      {children}
    </CheckBoxCardWrapper>
  );
});

export default CheckBoxCard;
