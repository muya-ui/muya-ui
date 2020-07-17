import React from 'react';
import { IAnchorProviderProps } from './types';
import { AnchorContext } from './context';
import useAnchor from './useAnchor';

export default React.memo((props: IAnchorProviderProps) => {
  const anchorBag = useAnchor(props);
  return <AnchorContext.Provider value={anchorBag}>{props.children}</AnchorContext.Provider>;
});
