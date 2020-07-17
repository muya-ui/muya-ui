import React from 'react';
import memoForwardRef from '../utils/memoForwardRef';
import { IAnchorScrollViewProps } from './types';
import { useAnchorContext } from './context';
import { forkRef } from '@muya-ui/utils';
import ScrollView from '../ScrollView';

export default memoForwardRef<HTMLDivElement, IAnchorScrollViewProps>((props, ref) => {
  const { getContainer } = useAnchorContext();
  const { contentRef, ...other } = props;
  const handleRef = forkRef(getContainer, contentRef);
  return <ScrollView {...other} contentRef={handleRef} ref={ref} />;
});
