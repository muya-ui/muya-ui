import styled, { css } from 'styled-components';

import IndexIndicator from './IndexIndicator';
import PagerButton from './PagerButton';
import { ICarouselProps } from './types';

const pagerCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 2;
`;

export const StyledIndexIndicator = styled(IndexIndicator)`
  position: absolute;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  ${props => {
    const { indicator } = props.theme.components.Carousel;
    return css`
      bottom: ${indicator.bottom}px;
      padding: ${indicator.padding};
    `;
  }}
`;

export const StyledPagerPrev = styled.div`
  ${pagerCss}
  left: 0;
`;

export const StyledPagerNext = styled.div`
  ${pagerCss}
  right: 0;
`;

export function carouselCss(props: ICarouselProps) {
  const { arrow = 'always', indicator = 'center' } = props;
  let hoverCss;
  if (arrow === 'hover') {
    hoverCss = css`
      & ${PagerButton} {
        opacity: 0;
      }

      &:hover {
        ${PagerButton} {
          opacity: 1;
        }
      }
    `;
  }

  let alignStr = 'center';
  if (indicator === 'left') {
    alignStr = 'flex-start';
  } else if (indicator === 'right') {
    alignStr = 'flex-end';
  }
  return css`
    position: relative;
    ${hoverCss}

    & ${StyledIndexIndicator} {
      justify-content: ${alignStr};
    }
  `;
}
