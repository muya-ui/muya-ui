import React from 'react';
import styled, { css } from 'styled-components';

import useTheme from '../utils/useTheme';
import { withThemeForStyled } from '../utils/withTheme';
import { siblingCss } from './mixins';
import { IButtonGroupProps, IButtonProps, IButtonType } from './types';

const BaseNode = styled.div``;
export interface IChildConfig extends Pick<IButtonProps, 'groupType' | 'offBorder'> {
  zIndex?: number;
}
export type IChildConfigMap = Record<string | number, IChildConfig>;

/* eslint-disable complexity */
/**
 * 在 Group 中需要根据 z-index 来决定谁的 border 在上面
 * @param childIndex
 * @param configMap
 * @param disabled
 */
export function getOffBorder(childIndex: number, configMap: IChildConfigMap, disabled?: boolean) {
  const { groupType, zIndex } = configMap[childIndex];
  let offBorder: IButtonProps['offBorder'];
  const prevItem = configMap[childIndex - 1];
  const nextItem = configMap[childIndex + 1];
  if (disabled && (groupType === 'head' || groupType === 'group')) {
    offBorder = 'right';
  } else if (disabled && groupType === 'tail') {
    offBorder = 'no';
  }
  // 是第一个的时候，有两种情况
  else if (groupType === 'head' && nextItem && nextItem.zIndex! < zIndex!) {
    offBorder = 'no';
  } else if (groupType === 'head') {
    offBorder = 'right';
  }
  // 是最后的一个的时候，也有两种情况
  else if (groupType === 'tail' && prevItem && prevItem.zIndex! > zIndex!) {
    offBorder = 'left';
  } else if (groupType === 'tail') {
    offBorder = 'no';
  }
  // 在中间的时候，有四种情况
  else if (groupType === 'group' && nextItem.zIndex! > zIndex! && prevItem.zIndex! > zIndex!) {
    offBorder = 'both';
  } else if (groupType === 'group' && nextItem.zIndex! < zIndex! && prevItem.zIndex! < zIndex!) {
    offBorder = 'no';
  } else if (groupType === 'group' && nextItem.zIndex! < zIndex! && prevItem.zIndex! > zIndex!) {
    offBorder = 'left';
  } else {
    offBorder = 'right';
  }
  return offBorder;
}
/* eslint-enable complexity */

const ButtonGroupWithoutStyle = React.memo(
  React.forwardRef<HTMLDivElement, IButtonGroupProps>((props, ref) => {
    const {
      type,
      size = 'm',
      htmlType,
      disabled,
      busy,
      shape,
      block,
      children,
      plain,
      ...otherProps
    } = props;
    const theme = useTheme();
    const childrenLen = React.Children.count(children);
    const notOnlyOne = childrenLen > 1;
    let resultChildren;
    const { zIndexOrder } = theme.components.Button;
    if (children) {
      const configMap: IChildConfigMap = {};
      React.Children.forEach(children, (child, childIndex) => {
        if (!React.isValidElement(child)) {
          return;
        }
        const currentType = (child.props.type as IButtonType) || type;
        let groupType: IButtonProps['groupType'];
        if (notOnlyOne && !childIndex) {
          groupType = 'head';
        } else if (notOnlyOne && childIndex === childrenLen - 1) {
          groupType = 'tail';
        } else if (notOnlyOne) {
          groupType = 'group';
        }

        configMap[childIndex] = {
          groupType,
          zIndex: zIndexOrder[currentType] || 0,
        };
      });
      resultChildren = React.Children.map(children, (child, childIndex) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        const {
          disabled: childDisabled,
          busy: childBusy,
          shape: childShape,
          size: childSize,
          block: childBlock,
          type: childType,
          plain: childPlain,
          offBorder: childOffBorder,
          ...otherChildProps
        } = child.props;
        // 布尔值需要注意一下
        const currentDisabled = childDisabled !== undefined ? childDisabled : disabled;
        const offBorder: IButtonProps['offBorder'] =
          childOffBorder || getOffBorder(childIndex, configMap, currentDisabled);
        const currentType = childType || type;
        const { groupType } = configMap[childIndex];

        return React.cloneElement(child, {
          ...otherChildProps,
          disabled: currentDisabled,
          busy: childBusy !== undefined ? childBusy : busy,
          shape: childShape || shape,
          plain: childPlain !== undefined ? childPlain : plain,
          type: currentType,
          offBorder,
          groupType,
          size,
          block,
        });
      });
    }
    return (
      <BaseNode ref={ref} {...otherProps}>
        {resultChildren}
      </BaseNode>
    );
  }),
);

const ButtonGroup = styled(ButtonGroupWithoutStyle)`
  ${props => {
    const { size = 'm', block, theme, disableSiblingMargin = false } = props;
    return css`
      /* 相对定位 */
      position: relative;

      /* flex + inline */
      display: inline-flex;
      ${block && 'width: 100%;'}
      ${siblingCss(size, theme, false, disableSiblingMargin)}
    `;
  }}
`;

export default withThemeForStyled(ButtonGroup);
