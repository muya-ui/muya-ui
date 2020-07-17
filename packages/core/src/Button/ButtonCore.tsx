import React, { RefObject, useMemo } from 'react';
import warning from 'warning';

import { useEventCallback } from '@muya-ui/utils';

import SpinIcon from '../Spin/SpinIcon';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { StyledButton, StyledLink, StyledSide } from './styled';
import { IButtonCoreWithNativeProps, IButtonNode } from './types';

const defaultStyles = {
  prefix: '',
  suffix: '',
};

const ButtonCore = memoForwardRef<IButtonNode, IButtonCoreWithNativeProps>((props, ref) => {
  // @TODO remove next breaking change
  if ('textFine' in props) {
    warning(false, '[Button]: prop `textFine` is deprecated, use `fontWeight="lighter" instead.`');
  }
  const {
    size = 'm',
    htmlType = 'button',
    disabled = false,
    component: asProp = 'button',
    children,
    textFine,
    fontWeight,
    onClick,
    type,
    width,
    loading = false,
    busy = false,
    suffixNode,
    prefixNode,
    styles,
    disableSiblingMargin,
    ...otherProps
  } = props;
  const theme = useTheme();
  const innerStyles = useStyles('button', defaultStyles, styles);
  let innerBusy = busy;

  if (loading) {
    innerBusy = true;
  }

  const childrenNode = useMemo(() => {
    let innerSuffixNode = suffixNode;
    let innerPrefixNode = prefixNode;

    if (loading && theme.components.Button.loadingPosition === 'suffix') {
      innerSuffixNode = <SpinIcon color="currentColor" />;
    } else if (loading) {
      innerPrefixNode = <SpinIcon color="currentColor" />;
    }
    return (
      <>
        {innerPrefixNode ? (
          <StyledSide {...innerStyles.prefix} theme={theme} prefixNode={innerPrefixNode}>
            {innerPrefixNode}
          </StyledSide>
        ) : null}
        {children}
        {innerSuffixNode ? (
          <StyledSide {...innerStyles.suffix} theme={theme} suffixNode={innerSuffixNode}>
            {innerSuffixNode}
          </StyledSide>
        ) : null}
      </>
    );
  }, [children, innerStyles.prefix, innerStyles.suffix, loading, prefixNode, suffixNode, theme]);

  const handleClick = useEventCallback((e: React.MouseEvent<IButtonNode, MouseEvent>) => {
    if (!innerBusy && !disabled) {
      onClick && onClick(e);
    } else {
      e.preventDefault();
    }
  });
  if (otherProps.href || asProp === 'a') {
    return (
      <StyledLink
        ref={ref as RefObject<HTMLAnchorElement>}
        role="button"
        aria-disabled={disabled}
        theme={theme}
        onClick={handleClick}
        {...otherProps}
      >
        {childrenNode}
      </StyledLink>
    );
  }

  // 只给button类型加htmlType
  const buttonType = asProp !== 'button' ? undefined : htmlType;
  return (
    <StyledButton
      ref={ref as RefObject<HTMLButtonElement>}
      as={asProp}
      type={buttonType}
      theme={theme}
      disabled={disabled}
      onClick={handleClick}
      {...otherProps}
    >
      {childrenNode}
    </StyledButton>
  );
});

export default ButtonCore;
