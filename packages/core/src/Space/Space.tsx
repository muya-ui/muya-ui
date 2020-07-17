import React, { Children, forwardRef, useMemo } from 'react';
import { ISpaceProps } from './types';
import styled, { css } from 'styled-components';
import useTheme from '../utils/useTheme';
import useStyles from '../utils/useStyles';
import mergeStyleItem from '../utils/mergeStyleItem';

interface IStyledWrapperProps {
  $direction: 'vertical' | 'horizontal';
  $block: boolean;
}

interface IStyledItemProps {
  $direction: 'vertical' | 'horizontal';
  $spacing?: number;
}

const StyledWrapper = styled.div<IStyledWrapperProps>`
  ${props => {
    const { $direction, $block } = props;
    const directionStyle =
      $direction === 'horizontal'
        ? css`
            align-items: center;
          `
        : css`
            flex-direction: column;
          `;
    const displayStyle = $block
      ? css`
          display: flex;
        `
      : css`
          display: inline-flex;
        `;

    return css`
      ${displayStyle}
      ${directionStyle}
    `;
  }}
`;

const StyledItem = styled.div<IStyledItemProps>`
  ${props => {
    const { $direction, $spacing } = props;
    if (!$spacing) return;
    const marginStyle =
      $direction === 'horizontal'
        ? css`
            margin-right: ${$spacing}px;
          `
        : css`
            margin-bottom: ${$spacing}px;
          `;
    return css`
      ${marginStyle}
    `;
  }}
`;

const defaultStyles = {
  wrapper: '',
  item: '',
};

export default React.memo(
  forwardRef<HTMLDivElement, ISpaceProps>((props, ref) => {
    const {
      direction = 'horizontal',
      spacing = 's4',
      block = false,
      styles,
      children,
      style,
      className,
      ...other
    } = props;
    const theme = useTheme();
    const innerStyles = useStyles('space', defaultStyles, styles);
    const wrapperStyleItem = mergeStyleItem(
      {
        style,
        className,
      },
      innerStyles.wrapper,
    );
    const count = Children.count(children);
    const items = useMemo(() => {
      return Children.map(children, (child, index) => {
        if (child === undefined || child === null) {
          return;
        }
        const spacingNumber = typeof spacing === 'number' ? spacing : theme.spacing.spec[spacing];
        return (
          <StyledItem
            $direction={direction}
            $spacing={index === count - 1 ? undefined : spacingNumber}
            {...innerStyles.item}
          >
            {child}
          </StyledItem>
        );
      });
    }, [children, count, direction, innerStyles.item, spacing, theme.spacing.spec]);

    if (count === 0) {
      return null;
    }
    return (
      <StyledWrapper
        ref={ref}
        $direction={direction}
        $block={block}
        {...wrapperStyleItem}
        {...other}
      >
        {items}
      </StyledWrapper>
    );
  }),
);
