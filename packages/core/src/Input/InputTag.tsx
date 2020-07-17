import styled, { css } from 'styled-components';

import Tag from '../Tag';
import { ISizeSpecBaseProps, IThemedBaseProps } from '../types';

const selectTagCss = (props: IThemedBaseProps & ISizeSpecBaseProps) => {
  const {
    size,
    theme: {
      components: { Input: token },
    },
  } = props;
  return css`
    margin: ${token.inputTag.margin};
    height: ${token.inputHeight[size!] - 2 - 2 * token.inputTag.outerPadding}px;
    line-height: ${token.inputHeight[size!] - 2 - 2 * token.inputTag.outerPadding}px;
  `;
};

const InputTag = styled(Tag)`
  ${selectTagCss};
`;

export default InputTag;
