import ReactDOM from 'react-dom';

import { PortalContainer } from './types';

export const getPortalContainer = (container?: PortalContainer) =>
  // eslint-disable-next-line react/no-find-dom-node
  (ReactDOM.findDOMNode(typeof container === 'function' ? container() : container) as Element) ||
  document.body;
