import React from 'react';
import styled from 'styled-components';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';

import Card from './Card';
import CardActions from './CardActions';
import CardContent from './CardContent';
import CardHeader from './CardHeader';
import CardMeta from './CardMeta';
import { ICommonCardProps } from './types';

const CommonCardWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
`

const CardContentWrapper = styled(CardContent)`
  flex: 1;
`

const defaultStyles = {
  headerWrapper: '',
  contentWrapper: '',
  actionWrapper: '',
  metaWrapper: '',
};

const CommonCard = memoForwardRef<HTMLDivElement, ICommonCardProps>((props, ref) => {
  const {
    children,
    imgHeight,
    src,
    space = 4,
    title,
    text,
    actions,
    actionsPadding,
    contentPadding,
    styles,
    headerProps,
    ...others
  } = props;

  const innerStyles = useStyles('card', defaultStyles, styles);

  return (
    <CommonCardWrapper ref={ref} {...others}>
      {src && imgHeight ? (
        <CardHeader height={imgHeight} src={src} {...headerProps} {...innerStyles.headerWrapper} />
      ) : null}
      {title || text ? (
        <CardContentWrapper padding={contentPadding} {...innerStyles.contentWrapper}>
          <CardMeta title={title} text={text} space={space} {...innerStyles.metaWrapper} />
        </CardContentWrapper>
      ) : null}
      {actions ? (
        <CardActions padding={actionsPadding} {...innerStyles.actionWrapper}>
          {actions}
        </CardActions>
      ) : null}
    </CommonCardWrapper>
  );
});

export default CommonCard;
