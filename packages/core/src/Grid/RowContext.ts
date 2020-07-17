import React, { useContext } from 'react';

import { IBreakpoint } from '@muya-ui/theme-light';

export interface IRowContext {
  breakpoint: IBreakpoint;
  gutter: number;
  equalNum?: number;
}

export const defaultBreakpoint: IBreakpoint = 'sm';

const RowContext = React.createContext<IRowContext>({
  breakpoint: defaultBreakpoint,
  gutter: 0,
});

export const useRow = () => useContext(RowContext);

export default RowContext;
