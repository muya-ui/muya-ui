import React from 'react';
import ReactDOM from 'react-dom';

import { useForkRef } from '@muya-ui/utils';

import { IPortalProps } from './types';
import { getPortalContainer } from './utils';
import memoForwardRef from '../utils/memoForwardRef';

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */
const Portal = memoForwardRef(function Portal(props: IPortalProps, ref: any) {
  const { children, container, disablePortal = false, onRendered } = props;
  const [mountNode, setMountNode] = React.useState<Element | null>(null);
  const childRef = React.useRef(null);
  const handleRef = useForkRef(children.ref, childRef);

  useEnhancedEffect(() => {
    if (!disablePortal) {
      setMountNode(getPortalContainer(container));
    }
  }, [container, disablePortal]);

  React.useImperativeHandle(ref, () => mountNode || childRef.current, [mountNode]);

  useEnhancedEffect(() => {
    if (onRendered && mountNode) {
      onRendered();
    }
  }, [mountNode, onRendered]);

  if (disablePortal) {
    React.Children.only(children);
    return React.cloneElement(children, {
      ref: handleRef,
    });
  }

  return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
});
export default Portal;
