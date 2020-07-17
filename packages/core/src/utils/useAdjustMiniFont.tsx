import { RefObject, useEffect } from 'react';

import addPx from './addPx';

export function useAdjustMiniFont(
  textRef: RefObject<HTMLElement>,
  fontSize: number,
  minFontSize: number = 12,
) {
  useEffect(() => {
    if (fontSize < minFontSize) {
      if (textRef && textRef.current) {
        const { width = '0px' } = getComputedStyle(textRef.current);
        textRef.current.style.transform = `scale(${fontSize / minFontSize})`;
        textRef.current.style.webkitTransform = `scale(${fontSize / minFontSize})`;
        textRef.current.style.marginRight = addPx(
          (parseInt(width!, fontSize) * (1 - fontSize / minFontSize)) / -2,
        );
        textRef.current.style.marginLeft = addPx(
          (parseInt(width!, fontSize) * (1 - fontSize / minFontSize)) / -2,
        );
      }
    } else {
      if (textRef && textRef.current) {
        textRef.current.style.transform = '';
        textRef.current.style.webkitTransform = '';
        textRef.current.style.marginRight = addPx(0);
        textRef.current.style.marginLeft = addPx(0);
      }
    }
  }, [fontSize, minFontSize, textRef]);
}

export default useAdjustMiniFont;
