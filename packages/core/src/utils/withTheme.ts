import {
  AnyStyledComponent, withTheme as withThemeWithoutDefault, WithThemeFnInterface
} from 'styled-components';

import { ITheme, muyaThemeLight } from '@muya-ui/theme-light';

const withTheme: WithThemeFnInterface<ITheme> = comp => {
  // add default theme to defaultProps
  if (!comp.defaultProps) {
    comp.defaultProps = {};
  }
  comp.defaultProps.theme = muyaThemeLight;

  // 非styled-component组件需要withTheme包裹，使其获得从ThemeContext拿主题的能力
  return withThemeWithoutDefault(comp);
};

const withThemeForStyled = <C extends AnyStyledComponent>(comp: C) => {
  // add default theme to defaultProps
  if (!comp.defaultProps) {
    comp.defaultProps = {};
  }
  comp.defaultProps.theme = muyaThemeLight;

  // 非styled-component组件需要withTheme包裹，使其获得从ThemeContext拿主题的能力
  return comp;
};

export { withTheme, withThemeForStyled };
export default withTheme;
