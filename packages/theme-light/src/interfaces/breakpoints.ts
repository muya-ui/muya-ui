export type IBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IBreakpointSpec {
  breakpointsMap: Record<IBreakpoint, number>;
}

export interface IBreakpoints {
  spec: IBreakpointSpec;
}
