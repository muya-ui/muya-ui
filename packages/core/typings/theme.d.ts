import { ITheme } from '@muya-ui/theme-light';

declare module 'styled-components' {
  // eslint-disable-next-line
  export interface DefaultTheme extends ITheme {}
}
