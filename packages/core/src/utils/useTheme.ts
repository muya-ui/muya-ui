import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { muyaThemeLight } from '@muya-ui/theme-light';

const useTheme = () => useContext(ThemeContext) || muyaThemeLight;

export { useTheme };

export default useTheme;
