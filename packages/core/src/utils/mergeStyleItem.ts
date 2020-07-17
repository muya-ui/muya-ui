import { ICustomStyleItem } from '../types';
import mergeStyle from './mergeStyle';

/**
 * 合并 style item
 * @param inputItem 输入的 { className, style } 都不是必选的
 * @param defaultItem 默认的 styleItem 一般是由 useStyles 产生的
 */
export default function mergeStyleItem(
  inputItem: Partial<ICustomStyleItem>,
  defaultItem: ICustomStyleItem,
): ICustomStyleItem {
  let className = defaultItem.className;
  if (inputItem.className) {
    className = `${inputItem.className} ${className}`;
  }
  return {
    className,
    style: mergeStyle(defaultItem.style, inputItem.style),
  };
}
