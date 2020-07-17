import React, { useCallback, useEffect, useRef } from 'react';
import memoForwardRef from '../utils/memoForwardRef';
import { IAnchorTabProps } from './types';
import { useAnchorContext } from './context';
import { Tab } from '../Tabs';
import { InlineButton } from '../Button';
import styled from 'styled-components';
import { forkRef } from '@muya-ui/utils';
import useTheme from '../utils/useTheme';

const StyledVerticalTab = styled(Tab)`
  margin: 0;
  & ${InlineButton} {
    padding: 0;
  }
`;

const StyledVerticalTabWrapper = styled.div`
  padding-left: ${props => props.theme.spacing.spec.s5}px;
`;

export default memoForwardRef<HTMLDivElement, IAnchorTabProps>((props, ref) => {
  const { index, href, title, styles, children, onClick, ...other } = props;
  const tabRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const handleRef = forkRef(tabRef, ref);
  const {
    disableHash,
    direction,
    activeLink,
    registerLink,
    unregisterLink,
    handleScrollTo,
    updateIndicator,
  } = useAnchorContext();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (index) {
        handleScrollTo(index);
      }
      if (onClick) {
        onClick(e as any);
      }
    },
    [handleScrollTo, index, onClick],
  );

  useEffect(() => {
    if (index) {
      registerLink(index);
    }
    return () => {
      if (index) {
        unregisterLink(index);
      }
    };
  }, [index, registerLink, unregisterLink]);

  useEffect(() => {
    if (direction === 'vertical' && activeLink === index && tabRef.current) {
      const height = tabRef.current.clientHeight / 2;
      const top = tabRef.current.offsetTop + height / 2;
      updateIndicator(top, height);
    }
  }, [activeLink, direction, index, updateIndicator]);

  if (direction === 'vertical') {
    const selected = index === activeLink;
    const buttonType = selected ? 'primary' : 'normal';
    return (
      <StyledVerticalTabWrapper theme={theme}>
        <StyledVerticalTab
          ref={handleRef}
          theme={theme}
          selected={selected}
          buttonType={buttonType}
          onClick={handleClick as any}
          index={index}
          href={disableHash ? undefined : index}
          {...other}
        >
          {title}
        </StyledVerticalTab>
        {children}
      </StyledVerticalTabWrapper>
    );
  }

  return (
    <Tab
      ref={ref}
      onClick={handleClick as any}
      index={index}
      styles={styles}
      href={disableHash ? undefined : index}
      {...other}
    >
      {title || children}
    </Tab>
  );
});
