import React from 'react';

import { IInlineButtonPureProps } from '../Button/types';

type OmitForButton = 'type' | 'disabled' | 'onClick';

export type ILinkProps = IInlineButtonPureProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, OmitForButton>;
