import React from 'react';

export default function mergeStyle(...args: Array<React.CSSProperties | undefined>) {
  return args.reduce((prev, current) => {
    if (prev && current) {
      return {
        ...prev,
        ...current,
      };
    }

    return current || prev;
  });
}
