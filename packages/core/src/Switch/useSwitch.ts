import { RefObject, useRef, useState, useCallback } from 'react';

import { ISwitchProps } from './types';

export default function useSwitch(props: ISwitchProps, nodeRef: RefObject<HTMLDivElement>) {
  const {
    disabled,
    checked,
    defaultChecked,
    loading,
    onChange,
    onClick: onClickProp,
    onMouseUp: onMouseUpProp,
  } = props;
  const { current: isControlled } = useRef('checked' in props);
  const [checkedState, setCheckedState] = useState(checked || defaultChecked || false);

  const setChecked = useCallback(
    (checked: boolean, e: React.MouseEvent | React.KeyboardEvent) => {
      if (disabled) {
        return;
      }
      if (!isControlled) {
        setCheckedState(checked);
      }

      if (onChange) {
        onChange(checked, e);
      }
    },
    [disabled, isControlled, onChange],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.keyCode === 37) {
        setChecked(false, e);
        /* istanbul ignore else */
      } else if (e.keyCode === 39) {
        setChecked(true, e);
      }
    },
    [setChecked],
  );

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || loading) {
        e.stopPropagation();
        return;
      }
      const newChecked = !checkedState;
      setChecked(newChecked, e);
      /* istanbul ignore else */
      if (onClickProp) {
        onClickProp(newChecked, e);
      }
    },
    [checkedState, disabled, loading, onClickProp, setChecked],
  );

  const blur = useCallback(() => {
    /* istanbul ignore next */
    if (nodeRef.current) {
      nodeRef.current.blur();
    }
  }, [nodeRef]);

  // Handle auto focus when click switch in Chrome
  const onMouseUp = useCallback(
    (e: React.MouseEvent) => {
      blur();
      /* istanbul ignore else */
      if (onMouseUpProp) {
        onMouseUpProp(e);
      }
    },
    [blur, onMouseUpProp],
  );

  const focus = useCallback(() => {
    /* istanbul ignore else */
    if (nodeRef.current) {
      nodeRef.current.focus();
    }
  }, [nodeRef]);

  return {
    checkedState,
    setCheckedState,
    onKeyDown,
    onClick,
    onMouseUp,
    focus,
    blur,
  };
}
