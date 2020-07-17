import styled, { css, keyframes, Keyframes } from 'styled-components';
import { IThemedBaseProps } from '../../types';

export interface IExpandWrapperProps extends IThemedBaseProps {
  expanded: boolean;
  expandedKeyframes?: Keyframes;
  notExpandedKeyframes?: Keyframes;
}

const expandedRotateKeyframes = keyframes`
  to {
    transform: rotate(180deg);
  }
`;

const notExpandedRotateKeyframes = keyframes`
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const expandStyle = (props: IExpandWrapperProps) => {
  const {
    expanded,
    expandedKeyframes = expandedRotateKeyframes,
    notExpandedKeyframes = notExpandedRotateKeyframes,
    theme,
  } = props;
  return css`
    line-height: 0;
    animation: ${expanded ? expandedKeyframes : notExpandedKeyframes}
      ${theme.transition.pattern.duration.status}ms linear;
    animation-fill-mode: forwards;
    cursor: pointer;
  `;
};

const ExpandWrapper = styled.div`
  ${expandStyle}
`;

export default ExpandWrapper;
