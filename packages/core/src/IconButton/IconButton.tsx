import React from 'react';

import { InlineButton } from '../Button';
import { IIconButtonProps } from './types';

const IconButton = React.forwardRef<HTMLButtonElement, IIconButtonProps>((props, ref) => {
  return <InlineButton ref={ref} type="weak" weakLevel={1} {...props} />;
});

export default IconButton;
