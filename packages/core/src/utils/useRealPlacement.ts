import PopperJS from 'popper.js';
import { useCallback, useState } from 'react';

export default function useRealPlacement(placement: PopperJS.Placement) {
  const [realPlacement, setRealPlacement] = useState(placement);

  const onPopperCreate = useCallback(
    (data: PopperJS.Data) => {
      if (data.placement !== realPlacement) {
        setRealPlacement(data.placement);
      }
    },
    [realPlacement],
  );

  const onPopperUpdate = useCallback(
    (data: PopperJS.Data) => {
      if (data.placement !== realPlacement) {
        setRealPlacement(data.placement);
      }
    },
    [realPlacement],
  );

  return {
    realPlacement,
    onPopperCreate,
    onPopperUpdate,
  };
}
