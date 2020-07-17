import { IBreakpoint, IBreakpointSpec } from '../interfaces';

export const breakpointKeys: IBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

function up(breakpoints: IBreakpointSpec, key: IBreakpoint | number): string {
  const { breakpointsMap } = breakpoints;
  const value =
    typeof breakpointsMap[key as IBreakpoint] === 'number'
      ? breakpointsMap[key as IBreakpoint]
      : key;
  return `@media (min-width:${value}px)`;
}

function down(breakpoints: IBreakpointSpec, key: IBreakpoint | number): string {
  const { breakpointsMap } = breakpoints;
  const endIndex = breakpointKeys.indexOf(key as IBreakpoint) + 1;
  const upperbound = breakpointsMap[breakpointKeys[endIndex]];

  if (endIndex === breakpointKeys.length) {
    return up(breakpoints, 'xs');
  }

  const value = typeof upperbound === 'number' && endIndex > 0 ? upperbound : (key as number);
  return `@media (max-width:${value - 5 / 100}px)`;
}

function between(breakpoints: IBreakpointSpec, start: IBreakpoint, end: IBreakpoint): string {
  const { breakpointsMap } = breakpoints;
  const endIndex = breakpointKeys.indexOf(end) + 1;

  if (endIndex === breakpointKeys.length) {
    return up(breakpoints, start);
  }

  return (
    `@media (min-width:${breakpointsMap[start]}px) and ` +
    `(max-width:${breakpointsMap[breakpointKeys[endIndex]] - 5 / 100}px)`
  );
}

function only(breakpoints: IBreakpointSpec, key: IBreakpoint): string {
  return between(breakpoints, key, key);
}

function width(breakpoints: IBreakpointSpec, key: IBreakpoint): number {
  return breakpoints.breakpointsMap[key];
}

const breakpointsUtils = {
  up,
  down,
  between,
  only,
  width,
};

export default breakpointsUtils;
