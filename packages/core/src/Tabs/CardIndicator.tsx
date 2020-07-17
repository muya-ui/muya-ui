import styled, { css } from 'styled-components';

import { IThemedBaseProps } from '../types';
import { withThemeForStyled } from '../utils/withTheme';
import { ITabsProps } from './types';

function indicatorCss(props: ITabsProps & IThemedBaseProps) {
  const { theme } = props;
  const { Tabs: token } = theme.components;
  const { indicator } = token;
  return css`
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    height: ${indicator.bgHeight}px;
    background: ${indicator.bgColor};
  `;
}

const CardIndicator = styled.div`
  ${indicatorCss}
`;
export default withThemeForStyled(CardIndicator);
