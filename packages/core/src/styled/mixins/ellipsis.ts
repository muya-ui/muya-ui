import { css } from 'styled-components';

import { ITypographyEllipsis } from '../../Typography/types';
import addPx from '../../utils/addPx';

export function makeEllipsisStyle(ellipsis?: boolean | ITypographyEllipsis) {
  if (!ellipsis) return;
  if (typeof ellipsis === 'object') {
    return css`
      display: -webkit-box; /* stylelint-disable-line */
      -webkit-line-clamp: ${ellipsis.rows || 3};
      -webkit-box-orient: vertical; /* stylelint-disable-line */
      overflow: hidden;
    `;
  }
  if (ellipsis) {
    return css`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `;
  }
}

const ellipsisStyle = makeEllipsisStyle(true);

export const ellipsisLeftStyle = css`
  ${ellipsisStyle};
  text-align: left;
  direction: rtl;
`;

export function ellipsisWithWidth(ellipsis: boolean, width?: number | string) {
  return css`
    ${width &&
      css`
        width: ${addPx(width)};
      `}

    ${ellipsis && ellipsisStyle}
  `;
}

export default ellipsisStyle;
