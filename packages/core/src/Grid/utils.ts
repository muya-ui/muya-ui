import { breakpointKeys, IBreakpoint } from '@muya-ui/theme-light';

import { IColProps, IColSize } from './types';

export type IResponsiveProp = 'order' | 'span' | 'offset' | 'pull' | 'push';

export const getPropFromBreakpoint = (breakpointData: number | IColSize, prop: IResponsiveProp) => {
  if (breakpointData && typeof breakpointData === 'object') {
    return breakpointData[prop];
  } else {
    if (prop === 'span') {
      return breakpointData;
    }
  }
};

export const getBreakpointProp = (props: IColProps, prop: IResponsiveProp) => {
  const { [prop]: currentProp, xs = {}, sm = {}, md = {}, lg = {}, xl = {} } = props;
  return {
    xs: getPropFromBreakpoint(xs, prop) || currentProp,
    sm: getPropFromBreakpoint(sm, prop) || currentProp,
    md: getPropFromBreakpoint(md, prop) || currentProp,
    lg: getPropFromBreakpoint(lg, prop) || currentProp,
    xl: getPropFromBreakpoint(xl, prop) || currentProp,
  };
};

/**
 * 获取响应式属性的最终值
 * @param prop 直接从 props 中读取的属性
 * @param propFromBreakpointProp 从 xs、sm、md、lg、xl 中解析出来的属性
 * @param breakpoint 当前的断点
 * @param breakpointKeys 断点的 key
 */
export const getResponsiveProp = (
  prop: Record<IBreakpoint, number | undefined>,
  breakpoint: IBreakpoint,
) => {
  let flag = false;
  for (const point of [...breakpointKeys].reverse()) {
    if (breakpoint === point) {
      flag = true;
    }
    if (flag && prop[point]) {
      return prop[point] as number;
    }
  }
};
