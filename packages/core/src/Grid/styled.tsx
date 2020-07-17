import styled, { css } from 'styled-components';

import { IAlignType, IJustifyType } from './types';

interface IStyledRowProps {
  $align?: IAlignType;
  $justify?: IJustifyType;
  $gutter?: number;
}

interface IStyledColProps {
  $span?: number;
  $order?: number;
  $offset?: number;
  $push?: number;
  $pull?: number;
  $gutter?: number;
  $equalNum?: number;
}

const alignMap = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
};

const justifyMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  'space-around': 'space-around',
  'space-between': 'space-between',
};

export const StyledRow = styled.div<IStyledRowProps>`
  display: flex;
  flex-flow: row wrap;
  box-sizing: border-box;
  ${props => props.$align && `align-items: ${alignMap[props.$align]};`}
  ${props => props.$justify && `justify-content: ${justifyMap[props.$justify]};`}
  ${props =>
    props.$gutter && `margin-left: ${props.$gutter / -2}px; margin-right: ${props.$gutter / -2}px;`}
  &::before,
  &::after {
    display: flex;
  }
`;

export const StyledCol = styled.div<IStyledColProps>`
  position: relative;
  flex: 0 0 auto;
  box-sizing: border-box;
  min-height: 1px;
  ${props => {
    const { $equalNum, $gutter, $order, $span, $offset, $pull, $push } = props;
    const commonStyle = css`
      ${$gutter && `padding-left: ${$gutter / 2}px; padding-right: ${$gutter / 2}px;`}};
      ${$order && `order: ${props.$order};`};
    `;
    if ($equalNum) {
      return css`
        width: ${`${(1 / $equalNum) * 100}%`};
        ${commonStyle};
      `;
    } else {
      return css`
        ${$span && `width: ${($span / 24) * 100}%;`}
        ${$offset && `margin-left: ${($offset / 24) * 100}%;`}
        ${$push && `left: ${($push / 24) * 100}%;`};
        ${$pull && `right: ${($pull / 24) * 100}%;`};
        ${commonStyle};
      `;
    }
  }}
`;
