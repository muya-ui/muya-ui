import { css, keyframes } from 'styled-components';

import { IThemedBaseProps } from '../../types';

const skeletonKeyframe = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`;

export function skeletonActiveCss(props: IThemedBaseProps) {
  const { Skeleton } = props.theme.components;
  const { easing } = props.theme.transition.spec;
  return css`
    background-image: linear-gradient(
      90deg,
      ${Skeleton.backgroundColor} 25%,
      ${Skeleton.activeBackgroundColor} 37%,
      ${Skeleton.backgroundColor} 63%
    );
    background-size: 400% 100%;
    animation: ${skeletonKeyframe} 1.4s ${easing.sharp} infinite;
  `;
}

export function skeletonNormalCss(props: IThemedBaseProps) {
  const { Skeleton } = props.theme.components;
  return css`
    background-color: ${Skeleton.backgroundColor};
  `;
}
