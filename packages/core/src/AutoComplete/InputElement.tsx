import React, { cloneElement, Ref } from 'react';

import { useForkRef } from '@muya-ui/utils';

import { IReactElementWithRef } from '../types';
import { StyledAutoCompleteInputWrapper } from './styled';

export interface IAutoCompleteInputElementProps {
  children: IReactElementWithRef;
}

const InputElement = React.forwardRef(
  (props: IAutoCompleteInputElementProps, ref: Ref<HTMLInputElement>) => {
    const { children, ...restProps } = props;
    const handleRef = useForkRef(children.ref, ref);
    return (
      <StyledAutoCompleteInputWrapper>
        {cloneElement(children, {
          ...restProps,
          ref: handleRef,
        })}
      </StyledAutoCompleteInputWrapper>
    );
  },
);

export default InputElement;
