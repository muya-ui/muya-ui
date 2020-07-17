import React from 'react';
import { IScrollViewProps } from './types';
import styled, { css } from 'styled-components';
import { withThemeForStyled } from '../utils/withTheme';
import addPx from '../utils/addPx';
import { StyledScrollViewContent, scrollXStyle, scrollYStyle, scrollBarStyle } from './styled';
import memoForwardRef from '../utils/memoForwardRef';
import { BaseDiv } from '../styled/base';
import useStyles from '../utils/useStyles';

const defaultStyles = {
  content: '',
};

const ScrollViewPure = memoForwardRef<HTMLDivElement, IScrollViewProps>((props, ref) => {
  const {
    scrollX,
    scrollY,
    width,
    height,
    size,
    children,
    styles,
    contentRef,
    ...restProps
  } = props;
  const innerStyles = useStyles('scroll-view', defaultStyles, styles);
  return (
    <BaseDiv {...restProps} ref={ref}>
      <StyledScrollViewContent ref={contentRef} {...innerStyles.content}>
        {children}
      </StyledScrollViewContent>
    </BaseDiv>
  );
});

const ScrollView = styled(ScrollViewPure)`
  ${props => {
    const { width, height, scrollX, scrollY = true, size = 'm', theme } = props;
    const token = theme.components.ScrollView;
    return css`
      ${width && `width: ${addPx(width)}`};
      ${height && `height: ${addPx(height)}`};
      ${scrollX && `padding-bottom: ${addPx(token.padding)}`};
      ${scrollY && `padding-right: ${addPx(token.padding)}`};
      ${StyledScrollViewContent} {
        height: 100%;
        ${scrollX && scrollXStyle(token.padding)};
        ${scrollY && scrollYStyle(token.padding)};
        ${scrollBarStyle({ size, theme })}
      }
    `;
  }}
`;

export default withThemeForStyled(ScrollView);
