import { ComponentType } from 'react';
import { ForwardRef } from 'react-is';

import getFunctionName from './getFunctionName';

/**
 * @param {function} Component
 * @param {string} fallback
 * @returns {string | undefined}
 */
function getFunctionComponentName(Component: ComponentType, fallback = ''): string {
  return Component.displayName || Component.name || getFunctionName(Component) || fallback;
}

function getWrappedName(
  outerType: ComponentType,
  innerType: ComponentType,
  wrapperName?: string,
): string {
  const functionName = getFunctionComponentName(innerType);
  if (wrapperName) {
    return (
      outerType.displayName ||
      (functionName !== '' ? `${wrapperName}(${functionName})` : wrapperName)
    );
  } else {
    return outerType.displayName || functionName || '';
  }
}

/**
 * cherry-pick from
 * https://github.com/facebook/react/blob/769b1f270e1251d9dbdce0fcbd9e92e502d059b8/packages/shared/getComponentName.js
 * originally forked from recompose/getDisplayName with added IE 11 support
 *
 * @param {React.ReactType} Component
 * @returns {string | undefined}
 */
export function getDisplayName(Component: any): string | undefined {
  if (Component == null) {
    return undefined;
  }

  if (typeof Component === 'string') {
    return Component;
  }

  if (typeof Component === 'function') {
    return getFunctionComponentName(Component, 'Component');
  }

  if (typeof Component === 'object') {
    switch (Component.$$typeof) {
      case ForwardRef:
        return getWrappedName(Component, Component.render, 'ForwardRef');
      default:
        return undefined;
    }
  }

  return undefined;
}

export default getDisplayName;
