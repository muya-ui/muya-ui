import React, { Ref, useMemo, useRef } from 'react';

import { useForkRef } from '@muya-ui/utils';

import Trigger from '../Trigger';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import CascaderInput from './CascaderInput';
import CascaderPanel from './CascaderPanel';
import { ICascaderProps } from './types';
import useCascader from './useCascader';

const defaultStyles = {
  inputWrapper: '',
};

const Cascader = memoForwardRef((props: ICascaderProps, ref: Ref<HTMLDivElement>) => {
  const { styles, inputRef, className, style, children } = props;
  const pickStyles = useMemo(() => {
    if (styles) {
      const { inputWrapper } = styles;
      return { inputWrapper };
    }
  }, [styles]);
  const innerStyles = useStyles('cascader', defaultStyles, pickStyles);
  const innerInputRef = useRef<HTMLInputElement>(null);
  const handleInputRef = useForkRef(inputRef, innerInputRef);
  const { inputProps, panelProps, triggerProps } = useCascader(props, innerInputRef);
  return (
    <Trigger {...triggerProps} popup={<CascaderPanel styles={styles} {...panelProps} />}>
      {React.isValidElement(children) ? (
        children
      ) : (
        <CascaderInput
          ref={ref}
          inputRef={handleInputRef}
          className={[innerStyles.inputWrapper.className, className].join(' ').trim()}
          style={{ ...innerStyles.inputWrapper.style, ...style }}
          {...inputProps}
        />
      )}
    </Trigger>
  );
});

(Cascader as any).__MUYA_CASCADER = true;

export default Cascader;
