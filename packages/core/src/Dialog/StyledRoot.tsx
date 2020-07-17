import styled, { css } from 'styled-components';

import { IThemedBaseProps } from '../types';
import { PortalContainer } from '../Portal';

interface IStyledDialogRoot extends IThemedBaseProps {
  $hideMask?: boolean;
  $container?: PortalContainer;
  $zIndex?: number;
}

function makeMaskStyle(props: IStyledDialogRoot) {
  const {
    zIndex,
    components: {
      Dialog: { maskBgColor },
    },
  } = props.theme;
  const zIndexStyle =
    props.$zIndex &&
    css`
      z-index: ${props.$zIndex};
    `;
  const bgStyle =
    props.$hideMask &&
    css`
      pointer-events: none;
      background: none;
    `;
  return css`
    /* container为body时，布局为fixed */
    position: ${props.$container === document.body ? 'fixed' : 'absolute'};
    z-index: ${zIndex.pattern.dialog};
    background: ${maskBgColor};
    ${zIndexStyle}
    ${bgStyle}
  `;
}

export default styled.div<IStyledDialogRoot>`
  overflow: hidden auto;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  outline: none;
  ${makeMaskStyle};
`;
