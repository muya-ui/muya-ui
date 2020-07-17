import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import memoForwardRef from '../utils/memoForwardRef';
import ImgPoolContext, { ImgPoolProvider } from './ImgPoolContext';
import { IImgContainerProps } from './types';

const BaseNode = styled.div``;
const Container = memoForwardRef<HTMLDivElement, any>((props, ref) => {
  const { children, onScroll, ...otherProps } = props;
  const pool = useContext(ImgPoolContext);
  const innerOnScroll = (e: React.UIEvent<HTMLDivElement>) => {
    onScroll && onScroll(e);
    pool.throttleCheck({ type: 'scroll' });
  };
  useEffect(() => {
    pool.throttleCheck({ type: 'scroll' });
  }, [children, pool]);
  return (
    <BaseNode {...otherProps} onScroll={innerOnScroll} ref={ref}>
      {children}
    </BaseNode>
  );
});

export default memoForwardRef<HTMLDivElement, IImgContainerProps>((props, ref) => {
  const { settings, poolName = 'img_container', ...otherProps } = props;
  return (
    <ImgPoolProvider settings={settings} poolName={poolName}>
      <Container {...otherProps} ref={ref} />
    </ImgPoolProvider>
  );
});
