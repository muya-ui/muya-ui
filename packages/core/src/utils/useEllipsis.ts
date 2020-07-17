import { MutableRefObject, useEffect, useState } from 'react';

function useEllipsis(ref: MutableRefObject<HTMLElement | null>, children: React.ReactNode) {
  const [isEllipsis, setIsEllipsis] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const { clientWidth, scrollWidth } = ref.current;
    if (clientWidth < scrollWidth && !isEllipsis) {
      setIsEllipsis(true);
    } else if (clientWidth >= scrollWidth && isEllipsis) {
      setIsEllipsis(false);
    }
  }, [isEllipsis, children, ref]);

  return isEllipsis;
}

export { useEllipsis };
export default useEllipsis;
