import React, { useContext } from 'react';

const TreeContext = React.createContext<unknown>(null);

export const useTreeContext = () => useContext(TreeContext);

export default TreeContext;
