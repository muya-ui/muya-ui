import { useMemo } from 'react';

import { ICustomStylePropMap } from '../types';
import transformStyles from './transformStyles';
import useTheme from './useTheme';

/**
 * 生成样式覆盖的配置
 * @param componentName 组件名
 * @param defaultStyles 默认配置
 * @param styles prop 输入，可以不填
 */
export function useStyles<T extends string>(
  componentName: string,
  defaultStyles: ICustomStylePropMap<T>,
  styles?: Partial<ICustomStylePropMap<T>>,
) {
  const theme = useTheme();
  const newStyles = useMemo(
    () =>
      transformStyles<T>(
        `${theme.prefix}-${componentName}`,
        styles
          ? {
              ...defaultStyles,
              ...styles,
            }
          : defaultStyles,
      ),
    [componentName, defaultStyles, styles, theme.prefix],
  );
  return newStyles;
}

export default useStyles;
