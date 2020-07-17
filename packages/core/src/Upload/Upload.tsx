import React from 'react';
import { IUploadProps } from './types';
import useUpload from './useUpload';
import memoForwardRef from '../utils/memoForwardRef';

const Upload = memoForwardRef<any, IUploadProps>((props, ref) => {
  const { children, render, ...uploadOption } = props;
  const state = useUpload(uploadOption);
  React.useImperativeHandle(ref, () => ({
    open: state.open,
  }));
  if (render) {
    return render(state);
  }
  if (children) {
    return children(state);
  }
  return null;
});

export default Upload;
