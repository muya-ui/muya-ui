import React, { Ref } from 'react';
import styled from 'styled-components';

import { useEventCallback } from '@muya-ui/utils';

import memoForwardRef from '../utils/memoForwardRef';
import { withThemeForStyled } from '../utils/withTheme';
import { checkableTagCss, tagCss } from './styled';
import { ICheckableTagProps } from './types';

const BaseNode = styled.span``;

const PureCheckableTag = memoForwardRef((props: ICheckableTagProps, ref: Ref<HTMLSpanElement>) => {
  const {
    shape,
    size = 'm',
    bordered,
    disabled,
    borderColor,
    maxWidth,
    checked,
    onChange,
    onClick,
    ...restProps
  } = props;
  const handleClick = useEventCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      if (!disabled) {
        /* istanbul ignore else */
        if (onClick) {
          onClick(e);
        }
        /* istanbul ignore else */
        if (onChange) {
          onChange(!checked);
        }
      } else {
        e.preventDefault();
      }
    },
    [checked, onChange],
  );
  return <BaseNode ref={ref} {...restProps} onClick={handleClick}></BaseNode>;
});

const CheckableTag = styled(PureCheckableTag)`
  ${tagCss};
  ${checkableTagCss}
`;

export default withThemeForStyled(CheckableTag);
