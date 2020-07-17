import React, { Ref, useCallback, useRef, useState, useMemo } from 'react';
import styled from 'styled-components';

import { CloseIcon as DefaultCloseIcon } from '@muya-ui/theme-light';

import Animation from '../Animation';
import memoForwardRef from '../utils/memoForwardRef';
import useAdjustMiniFont from '../utils/useAdjustMiniFont';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { withThemeForStyled } from '../utils/withTheme';
import { StyledCloseIcon, StyledTagText, tagCss } from './styled';
import { ITagProps } from './types';

const BaseNode = styled.span``;
const defaultStyles = {
  childrenWrapper: '',
  closeIcon: '',
};

const PureTag = memoForwardRef((props: ITagProps, ref: Ref<HTMLSpanElement>) => {
  const {
    visible = true,
    closable,
    children,
    color,
    shape,
    size = 'm',
    bordered,
    colorInverse,
    disabled,
    borderColor,
    maxWidth,
    styles,
    onClick,
    onClose,
    ...restProps
  } = props;
  const theme = useTheme();
  const {
    components: { Tag: token },
  } = theme;
  const isVisibleControlled = 'visible' in props;
  const fontSize = token.fontSize[size!];
  const textRef = useRef<HTMLSpanElement>(null);
  const { closeIcon: CloseIcon = DefaultCloseIcon } = theme.components.Tag;
  const [visibleState, setVisibleState] = useState(visible);
  useAdjustMiniFont(textRef, fontSize);

  const innerStyles = useStyles('tag', defaultStyles, styles);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      if (!disabled) {
        if (onClick) {
          onClick(e);
        }
      } else {
        e.preventDefault();
      }
    },
    [disabled, onClick],
  );

  const handleCloseIconClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      e.stopPropagation();
      if (!disabled) {
        /* istanbul ignore else */
        if (onClose) {
          onClose(e);
        }
        if (e.defaultPrevented) {
          return;
        }
        /* istanbul ignore else */
        if (!isVisibleControlled) {
          setVisibleState(false);
        }
      } else {
        e.preventDefault();
      }
    },
    [disabled, isVisibleControlled, onClose],
  );

  const handleEntered = useCallback((node: HTMLElement) => {
    /* istanbul ignore next */
    if (node && node.style) {
      node.style.display = '';
    }
  }, []);

  const handleExited = useCallback((node: HTMLElement) => {
    /* istanbul ignore next */
    if (node && node.style) {
      node.style.display = 'none';
    }
  }, []);

  if (isVisibleControlled && visible !== visibleState) {
    setVisibleState(visible!);
  }

  const TagNode = useMemo(
    () => (
      <BaseNode ref={ref} onClick={handleClick} {...restProps}>
        <StyledTagText ref={textRef} {...innerStyles.childrenWrapper}>
          {children}
        </StyledTagText>
        {closable && (
          <StyledCloseIcon
            {...innerStyles.closeIcon}
            theme={theme}
            $size={size}
            $color={color}
            $colorInverse={colorInverse}
          >
            <CloseIcon onClick={handleCloseIconClick} />
          </StyledCloseIcon>
        )}
      </BaseNode>
    ),
    [
      children,
      closable,
      color,
      colorInverse,
      handleClick,
      handleCloseIconClick,
      innerStyles.childrenWrapper,
      innerStyles.closeIcon,
      ref,
      restProps,
      size,
      theme,
    ],
  );

  if (disabled) {
    return TagNode;
  }

  return (
    <Animation.Fade in={visibleState} onEntered={handleEntered} onExited={handleExited}>
      {TagNode}
    </Animation.Fade>
  );
});

const Tag = styled(PureTag)`
  ${tagCss};
`;

export default withThemeForStyled(Tag);
