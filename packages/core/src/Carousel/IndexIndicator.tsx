import React from 'react';
import styled, { css } from 'styled-components';

import { colorUtils } from '@muya-ui/theme-light';

import memoForwardRef from '../utils/memoForwardRef';
import mergeStyleItem from '../utils/mergeStyleItem';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { withThemeForStyled } from '../utils/withTheme';
import { ICarouselIndexIndicatorProps } from './types';

interface IIndexProps extends React.HTMLAttributes<HTMLDivElement> {
  selected: boolean;
  gutter: boolean;
  color?: string;
}

const BaseNode = styled.div``;

const IndexPure = memoForwardRef<HTMLDivElement, IIndexProps>((props, ref) => {
  const { selected, color, gutter, ...otherProps } = props;

  return <BaseNode {...otherProps} ref={ref} />;
});

export const Index = styled(IndexPure)<IIndexProps>`
  display: inline-block;
  cursor: pointer;
  ${props => {
    const { selected, color, gutter, theme } = props;
    const {
      pattern: { easing, duration },
    } = theme.transition;
    const token = theme.components.Carousel.IndexIndicator;
    const innerColor = color || token.color;
    const width = selected ? token.selectedSize : token.size;

    let statusCss;
    if (selected) {
      statusCss = css`
        &::before {
          background-color: ${innerColor};
        }
      `;
    } else {
      statusCss = css`
        &::before {
          background-color: ${colorUtils.transparentize(token.opacity, innerColor)};
        }

        &:hover {
          &::before {
            background-color: ${colorUtils.transparentize(token.hoverOpacity, innerColor)};
          }
        }
      `;
    }
    return css`
      padding: ${token.borderWidth}px 0;
      ${gutter && `margin-right: ${token.gutter}px;`}

      &::before {
        box-sizing: content-box;
        content: '';
        display: block;
        height: ${token.borderWidth}px;
        width: ${width}px;
        transition: all ${duration.status}ms ${easing.status};
      }

      ${statusCss}
    `;
  }}
`;

const IndexIndicatorPure = memoForwardRef<HTMLDivElement, ICarouselIndexIndicatorProps>(
  (props, ref) => {
    const { trigger, index, num, color, styles, onChange, ...otherProps } = props;
    const theme = useTheme();
    const innerStyles = useStyles(
      'carousel-indicator',
      {
        index: '',
        active: '',
      },
      styles,
    );

    const indexes = [];
    for (let i = 0; i < num; i++) {
      const selected = index === i;
      const itemOnChange = () => {
        if (!selected) {
          onChange && onChange(i);
        }
      };
      const indexProps: React.HTMLAttributes<HTMLDivElement> = {};
      if (trigger === 'hover') {
        indexProps.onMouseEnter = itemOnChange;
      } else {
        indexProps.onClick = itemOnChange;
      }
      const styleItem = selected
        ? mergeStyleItem(innerStyles.active, innerStyles.index)
        : innerStyles.index;
      indexes.push(
        <Index
          {...styleItem}
          key={i}
          color={color}
          theme={theme}
          gutter={i !== num - 1}
          selected={selected}
          {...indexProps}
        />,
      );
    }

    return (
      <BaseNode {...otherProps} ref={ref}>
        {indexes}
      </BaseNode>
    );
  },
);

const IndexIndicator = styled(IndexIndicatorPure)`
  white-space: nowrap;
`;

export default withThemeForStyled(IndexIndicator);
