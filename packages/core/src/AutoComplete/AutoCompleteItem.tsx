import React from 'react';

import { StyledAutoCompleteItem, StyledPirmaryField, StyledSecondaryField } from './styled';
import { IAutoCompleteItemProps } from './types';

const AutoCompleteItem = React.memo((props: IAutoCompleteItemProps) => {
  const { primary, secondary, ...restProps } = props;
  return (
    <StyledAutoCompleteItem {...restProps}>
      <StyledPirmaryField>{primary}</StyledPirmaryField>
      <StyledSecondaryField>{secondary}</StyledSecondaryField>
    </StyledAutoCompleteItem>
  );
});

export default AutoCompleteItem;
