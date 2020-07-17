import React from 'react';

import { Typography } from '../Typography';
import useTheme from '../utils/useTheme';
import { StyleCardMeta, StyleCardTitle } from './styled';
import { ICardMetaProps } from './types';
import memoForwardRef from '../utils/memoForwardRef';

const CardMeta = memoForwardRef<HTMLDivElement, ICardMetaProps>((props, ref) => {
  const { children, title, text, space = 4, ...others } = props;
  const theme = useTheme();
  return (
    <StyleCardMeta ref={ref} {...others}>
      {title ? (
        <StyleCardTitle level={theme.components.Card.defaultMetaTitleLevel} $space={space}>
          {title}
        </StyleCardTitle>
      ) : null}
      {text ? <Typography.Text>{text}</Typography.Text> : null}
      {children}
    </StyleCardMeta>
  );
});

export default CardMeta;
