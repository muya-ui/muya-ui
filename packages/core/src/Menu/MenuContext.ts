import React, { useContext } from 'react';

import { IMenuContextValue } from './innerTypes';

const MenuContext = React.createContext<IMenuContextValue | null>(null);

export const useMenuContext = () => useContext(MenuContext);

export default MenuContext;
