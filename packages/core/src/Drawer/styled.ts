import styled, { css } from 'styled-components';
import { ISlideAnimationDirection } from '../Animation';

interface ICustomDialogContainerPorps {
  $width: string | number;
  $height: string | number;
  $direction: ISlideAnimationDirection;
}

export const StyledCustomDialogContainer = styled.div<ICustomDialogContainerPorps>`
  ${props => {
    const { $direction, $width, $height, theme } = props;
    const width = typeof $width === 'number' ? `${$width}px` : $width;
    const height = typeof $height === 'number' ? `${$height}px` : $height;
    const widthStyle = `calc(100% - ${width})`;
    const heightStyle = `calc(100% - ${height})`;
    let positionStyle;
    if ($direction === 'up') {
      positionStyle = css`
        top: 0;
        bottom: ${heightStyle};
        left: 0;
        right: 0;
      `;
    } else if ($direction === 'down') {
      positionStyle = css`
        bottom: 0;
        top: ${heightStyle};
        left: 0;
        right: 0;
      `;
    } else if ($direction === 'right') {
      positionStyle = css`
        top: 0;
        bottom: 0;
        left: ${widthStyle};
        right: 0;
      `;
    } else {
      positionStyle = css`
        left: 0;
        right: ${widthStyle};
        top: 0;
        bottom: 0;
      `;
    }
    return css`
      display: flex;
      flex-flow: column nowrap;
      position: absolute;
      box-sizing: border-box;
      background: ${theme.colors.pattern.background.higher};
      z-index: ${theme.zIndex.pattern.dialog};
      overflow: auto;
      pointer-events: auto;
      box-shadow: ${theme.shadows.spec.s1.normal};
      ${positionStyle};
    `;
  }}
`;
