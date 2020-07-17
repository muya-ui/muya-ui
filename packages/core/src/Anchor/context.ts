import React from 'react';
import { IAnchorBag } from './types';

export const AnchorContext = React.createContext<IAnchorBag>(null as any);

export const useAnchorContext = () => React.useContext(AnchorContext);
