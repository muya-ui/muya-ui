import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { ITheme } from '@muya-ui/theme-light';

import Dialog from '../Dialog';
import notification from '../Notification';
import toast from '../toast';

export interface IThemeProviderProps {
  theme: ITheme;
  children?: React.ReactChild;
}

export default React.memo((props: IThemeProviderProps) => {
  const { theme, children } = props;

  // 更新主题
  useEffect(() => {
    toast.config({ theme });
    notification.config({ theme });
    Dialog.config({ theme });
  }, [theme]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
});
