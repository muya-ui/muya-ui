import styled, { css } from 'styled-components';

import { InlineButton } from '../Button';
import IconButton from '../IconButton';
import Img from '../Img';
import { IThemedBaseProps } from '../types';
import { IUploadResultProps } from './types';

export interface IStyledUploadCardProps extends IThemedBaseProps {
  $disabled: boolean;
  $isDragActive: boolean;
  $width?: number | string;
  $height?: number | string;
}

export const StyledContainer = styled.div<Partial<IUploadResultProps>>`
  ${props => {
    const {
      components: { Upload: token },
    } = props.theme;
    return css`
      position: relative;
      display: flex;
      box-sizing: border-box;
      border-radius: ${token.borderRadius};

      ${Img} {
        width: 100%;
        border-radius: ${token.img.borderRadius};
        &:hover {
          opacity: ${token.img.hoverOpacity};
        }
      }
    `;
  }}
  ${props => {
    const { type = 'picture-card', theme, size = 'm', file } = props;
    const { pictureWidth, card, shadow } = theme.components.Upload;
    if (type === 'picture') {
      return css`
        display: inline-flex;
        width: ${pictureWidth[size]}px;
        height: ${pictureWidth[size]}px;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        outline: none;
        border: 1px solid ${theme.colors.pattern.border.normal};
        font-size: ${theme.typography.spec.fontSize.s3}px;
        ${file &&
          file.status === 'error' &&
          css`
            border-color: ${theme.colors.pattern.feature.error};
          `}
        ${file &&
          file.status === 'uploading' &&
          css`
            &:hover {
              background: ${theme.colors.spec.neutral10.normal};
            }
          `}
      `;
    } else if (type === 'card') {
      return css`
        flex-flow: column nowrap;
        justify-content: center;
        width: ${card.size[size].width}px;
        padding: ${theme.spacing.spec.s5}px ${theme.spacing.spec.s6}px;
        &:hover {
          background: ${theme.colors.spec.neutral10.normal};
        }
      `;
    } else if (type === 'picture-card') {
      return css`
        align-items: center;
        width: ${card.size[size].width}px;
        height: ${card.size[size].height}px;
        background: ${theme.colors.spec.light};
        padding: ${theme.spacing.spec.s4}px;
        padding-right: ${theme.spacing.spec.s6}px;
        box-shadow: ${shadow.normal};
        &:hover {
          box-shadow: ${shadow.hover};
        }
      `;
    }
  }}
`;

export const StyledImgWrapper = styled.div<Partial<IUploadResultProps>>`
  ${props => {
    const { theme, size = 'm' } = props;
    const { card } = theme.components.Upload;
    return css`
      width: ${card.size[size].imgWidth}px;
      margin-right: ${theme.spacing.spec.s6}px;
    `;
  }}
`;

export const StyledContentWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  overflow: hidden;
`;

export const StyledFilenameWrapper = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledButton = styled(InlineButton)`
  && {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    opacity: 1;
    cursor: ${props => (props.href ? 'pointer' : 'default')};
    font-weight: ${props => props.theme.typography.spec.fontWeight.regular};
  }
`;

export const StyledCardIconWrapper = styled(IconButton)`
  && {
    margin-left: ${props =>
      props.theme.spacing.spec[props.size === 'xl' || props.size === 'l' ? 's4' : 's3']}px;
  }
`;

export const StyledPictureCardIconWrapper = styled(InlineButton)`
  && {
    position: absolute;
    right: ${props => props.theme.spacing.spec.s3}px;
    top: ${props => props.theme.spacing.spec.s3}px;
    padding: 0;
  }
`;

export const StyledPictureIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -5px;
  top: -5px;
  width: 20px;
  height: 20px;
  font-size: 12px;
  border-radius: 50%;
  z-index: 1;
  color: ${props => props.theme.colors.spec.light};
  background: ${props => props.theme.colors.spec.neutral1.normal};
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.colors.spec.neutral2.normal};
  }
`;

function makeCardStyle(props: IStyledUploadCardProps) {
  const {
    theme: {
      size: {
        spec: { borderRadius },
      },
      colors: {
        pattern: { text, border, background },
      },
      components: { Upload: token },
    },
    $disabled,
    $isDragActive,
    $width,
    $height,
  } = props;

  const disabledStyle = css`
    & > * {
      color: ${text.disabled};
    }

    user-select: none;
    background: ${background.disabled};
    cursor: not-allowed;
  `;

  const hoverStyle = css`
    background: ${token.card.background.hover};
  `;

  const interactiveStyle = css`
    &:hover {
      ${hoverStyle}
    }

    ${$isDragActive && hoverStyle}

    &:active {
      background: ${token.card.background.clicked};
    }
  `;

  const widthStyle =
    $width &&
    css`
      width: ${$width};
    `;

  const heightStyle =
    $height &&
    css`
      height: ${$height};
    `;

  return css`
    display: inline-flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
    border: 1px solid ${border.normal};
    border-radius: ${borderRadius.s2};
    ${$disabled ? disabledStyle : interactiveStyle};
    ${widthStyle}
    ${heightStyle}
  `;
}

export const StyledUploadCard = styled.div<IStyledUploadCardProps>`
  ${makeCardStyle}
`;
