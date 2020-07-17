import React, { Ref, useRef, useMemo } from 'react';

import { useEffectOnce, useForkRef } from '@muya-ui/utils';

import Spin from '../Spin';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { StyledLoadingIconWrapper, StyledSwitch, StyledSwitchChildrenWrapper } from './styled';
import { ISwitchProps, ISwitchStyleKeys } from './types';
import { ICustomStylePropMap } from '../types';
import useSwitch from './useSwitch';

const Switch = React.forwardRef((props: ISwitchProps, ref: Ref<HTMLDivElement>) => {
  const {
    autoFocus,
    disabled,
    checked,
    defaultChecked,
    checkedChildren,
    unCheckedChildren,
    loading,
    loadingIcon,
    onChange,
    styles,
    size = 'm',
    ...restProps
  } = props;
  const theme = useTheme();
  const {
    components: { Switch: token },
  } = theme;
  const defaultStyles = useMemo<ICustomStylePropMap<ISwitchStyleKeys>>(
    () => ({
      loadingWrapper: '',
      childrenWrapper: '',
    }),
    [],
  );
  const innerStyles = useStyles('switch', defaultStyles, styles);
  const nodeRef = useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(ref, nodeRef);
  const { checkedState, setCheckedState, onKeyDown, onClick, onMouseUp, focus } = useSwitch(
    props,
    nodeRef,
  );

  useEffectOnce(() => {
    if (autoFocus && !disabled) {
      focus();
    }
  });

  if ('checked' in props && checkedState !== checked) {
    setCheckedState(checked!);
  }

  const loadingNode = useMemo(
    () =>
      loadingIcon || (
        <Spin color={checkedState ? token.background.checked : token.background.unChecked} />
      ),
    [checkedState, loadingIcon, token.background.checked, token.background.unChecked],
  );

  return (
    <StyledSwitch
      {...restProps}
      ref={handleRef}
      role="switch"
      theme={theme}
      size={size}
      checked={checkedState}
      disabled={disabled || loading}
      aria-checked={checked}
      onClick={onClick}
      onMouseUp={onMouseUp}
      onKeyDown={onKeyDown}
    >
      {loading && (
        <StyledLoadingIconWrapper {...innerStyles.loadingWrapper}>
          {loadingNode}
        </StyledLoadingIconWrapper>
      )}
      <StyledSwitchChildrenWrapper {...innerStyles.childrenWrapper}>
        {checkedState ? checkedChildren : unCheckedChildren}
      </StyledSwitchChildrenWrapper>
    </StyledSwitch>
  );
});

Switch.defaultProps = {
  checkedChildren: null,
  unCheckedChildren: null,
  defaultChecked: false,
  loading: false,
  tabIndex: 0,
};

export default React.memo(Switch);
