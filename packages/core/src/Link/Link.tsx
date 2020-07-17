import React from 'react';
import styled from 'styled-components';

import { InlineButton } from '../Button';
import { ILinkProps } from './types';

const LinkPure = React.forwardRef<HTMLAnchorElement, ILinkProps>((props, ref) => {
  return <InlineButton ref={ref} type="primary" fontWeight="lighter" {...props} component="a" />;
});

// 覆盖 InlineButton 的 position: relative
const Link = styled(LinkPure)`
  && {
    position: static;
  }
`;

export default Link;
