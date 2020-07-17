import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';

import { ITheme } from '../../interfaces';
import { muyaThemeLight } from '../../theme';

export interface IGlobalProps {
  theme?: ITheme;
  normalize?: boolean;
  resetScrollBar?: boolean;
}

const GlobalStyles = createGlobalStyle`
  /* 样式重置 */
  ${props => props.normalize && normalize}

  /*
    global style id: muya-global-styles
    这么写是为了防止 styled-components 产生相同的ID，
    详见：https://github.com/styled-components/styled-components/issues/3097
   */
  html {
    font-family: ${props => props.theme!.typography.spec.global.fontFamily};
    font-size: ${props => props.theme!.typography.spec.global.fontSize}px;
    line-height: ${props => props.theme!.typography.spec.global.lineHeight};
  }

  /* 滚动条重置 */
  ${(props: IGlobalProps) => {
    if (!props.resetScrollBar) {
      return;
    }
    const {
      colors: {
        pattern: { background },
      },
    } = props.theme!;
    const scrollBarToken = props.theme!.components.ScrollView.scrollBar;
    return css`
      body::-webkit-scrollbar {
        width: ${scrollBarToken.size.l}px;
        height: ${scrollBarToken.size.l}px;
      }
      body::-webkit-scrollbar-thumb {
        border-radius: ${scrollBarToken.borderRadius};
        background-color: ${scrollBarToken.background};
        &:hover {
          background-color: ${scrollBarToken.hoverBackground};
        }
      }
      body::-webkit-scrollbar-track {
        background-color: ${background.global};
      }
      :not(body)::-webkit-scrollbar {
        width: ${scrollBarToken.size.m}px;
        height: ${scrollBarToken.size.m}px;
      }
      :not(body)::-webkit-scrollbar-thumb {
        border-radius: ${scrollBarToken.borderRadius};
        background-color: rgba(0, 0, 0, 0);
      }
      :not(body):hover::-webkit-scrollbar-thumb {
        background-color: ${scrollBarToken.background};
        &:hover {
          background-color: ${scrollBarToken.hoverBackground};
        }
      }
    `;
  }}
`;

GlobalStyles.defaultProps = {
  theme: muyaThemeLight,
  normalize: true,
  resetScrollBar: false,
};

export default GlobalStyles;
