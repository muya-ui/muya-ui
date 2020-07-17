import { kebabCase } from 'lodash';

import { ICustomStyleItem, ICustomStyleMap, ICustomStylePropMap } from '../types';

export default function transformStyles<T extends string>(
  prefix: string,
  map: ICustomStylePropMap<T>,
): ICustomStyleMap<T> {
  const keys = Object.keys(map);
  const resultMap: Record<string, ICustomStyleItem> = {};
  keys.forEach(key => {
    const classes = [`${prefix}-${kebabCase(key)}`];
    const config = (map as any)[key];
    let style;
    if (config && typeof config === 'string') {
      classes.push(config);
    } else if (config && typeof config === 'object') {
      style = config;
    }
    resultMap[key] = {
      className: classes.join(' '),
      style,
    };
  });

  return resultMap as ICustomStyleMap<T>;
}
