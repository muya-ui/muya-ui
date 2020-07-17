import addPx from '../utils/addPx';
import { IThemedBaseProps, ISizeSpecBaseProps } from '../types';
import styled, { css } from 'styled-components';

export interface IScrollBarStyleProps extends IThemedBaseProps, ISizeSpecBaseProps {
  hideEndButton?: boolean;
}

export const scrollXStyle = (padding: number) => css`
  overflow-x: auto;
  padding-bottom: ${addPx(padding)};
`;

export const scrollYStyle = (padding: number) => css`
  overflow-y: auto;
  padding-right: ${addPx(padding)};
`;

export const scrollBarStyle = (props: IScrollBarStyleProps) => {
  const { theme, size = 'm', hideEndButton } = props;
  const token = theme.components.ScrollView.scrollBar;
  return css`
    &::-webkit-scrollbar {
      width: ${token.size[size]}px;
      height: ${token.size[size]}px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: ${token.borderRadius};
      background-color: transparent;
    }
    &:hover::-webkit-scrollbar-thumb {
      background-color: ${token.background};
      &:hover {
        background-color: ${token.hoverBackground};
      }
    }

    ${hideEndButton &&
      css`
        &::-webkit-scrollbar-button:vertical:end:decrement {
          display: block;
          width: ${token.size[size]}px;
          height: ${token.size[size]}px;
          background-color: transparent;
        }
      `}
  `;
};

export const StyledScrollViewContent = styled.div``;
