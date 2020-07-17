import React, { useMemo } from 'react';
import { ICardProps } from './types';
import { StyledCard, StyleCardExtra } from './styled';
import useTheme from '../utils/useTheme';
import useStyles from '../utils/useStyles';
import Skeleton from '../Skeleton';
import memoForwardRef from '../utils/memoForwardRef';

const Card = memoForwardRef<HTMLDivElement, ICardProps>((props, ref) => {
  const {
    children,
    extra,
    styles,
    shadowed = true,
    hoverShadowed = true,
    bordered = false,
    loading = false,
    ...others
  } = props;
  const theme = useTheme();

  const defaultStyles = useMemo(
    () => ({
      extraWrapper: '',
    }),
    [],
  );
  const innerStyles = useStyles('card', defaultStyles, styles);

  const { height, width } = theme.components.Card.skeleton;

  return (
    <StyledCard
      ref={ref}
      theme={theme}
      $shadowed={shadowed}
      $hoverShadowed={hoverShadowed}
      $bordered={bordered}
      {...others}
    >
      <Skeleton
        active
        loading={loading}
        type="card"
        style={{
          width,
          height,
        }}
      >
        {extra ? (
          <StyleCardExtra theme={theme} {...innerStyles.extraWrapper}>
            {extra}
          </StyleCardExtra>
        ) : null}
        {children}
      </Skeleton>
    </StyledCard>
  );
});

export default Card;
