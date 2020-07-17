import React, { useEffect, useMemo } from 'react';

import ImgPool from './ImgPool';
import { IImgPool, IImgPoolProviderProps } from './types';

export const imgPool = new ImgPool();
imgPool.setup();

const ImgPoolContext = React.createContext<IImgPool>(imgPool);

let uid = 0;
export const ImgPoolProvider = React.memo((props: IImgPoolProviderProps) => {
  const { settings, poolName, children } = props;
  const name = poolName || 'img_provider';

  const pool = useMemo(() => new ImgPool(`${name}_${uid++}`), [name]);
  useEffect(() => {
    pool.setup(settings);
    return () => {
      pool.destroy();
    };
  }, [pool, settings]);
  return <ImgPoolContext.Provider value={pool}>{children}</ImgPoolContext.Provider>;
});

export default ImgPoolContext;
