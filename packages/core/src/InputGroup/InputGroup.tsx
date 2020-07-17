import styled, { css } from 'styled-components';
import React, { useState, useCallback, CSSProperties, useMemo } from 'react';
import { IInputGroupProps } from './types';
import { IComponentSizeSpec } from '@muya-ui/theme-light';
import { StyledInputWrapper, StyledTagsInputWrapper } from '../Input/styled';
import useTheme from '../utils/useTheme';

interface ZIndexHocProps {
  children: React.ReactNode;
  size?: IComponentSizeSpec;
}

function ZIndexHoc(props: ZIndexHocProps) {
  const { children, size } = props;
  const childProps = (children as any).props;
  const childType = (children as any).type;
  const [focus, setFocus] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const theme = useTheme();
  const handleFocus = useCallback(
    (e: React.MouseEvent) => {
      if (childProps.onFocus) {
        childProps.onFocus(e);
      }
      setFocus(true);
    },
    [childProps],
  );

  const handleBlur = useCallback(
    (e: React.MouseEvent) => {
      if (childProps.onBlur) {
        childProps.onBlur(e);
      }
      setFocus(false);
    },
    [childProps],
  );

  const handlePopupVisibleChange = useCallback(
    (open: boolean) => {
      if (childProps.onPopupVisibleChange) {
        childProps.onPopupVisibleChange(open);
      }
      setPopupVisible(open);
    },
    [childProps],
  );

  // 组件处于focus或者popupVisible状态，提升zIndex层级
  const shouldAddZIndex = focus || popupVisible;
  const childStyle: CSSProperties = useMemo(
    () => ({
      zIndex: shouldAddZIndex ? 1 : undefined,
    }),
    [shouldAddZIndex],
  );

  const finalChildProps: any = useMemo(
    () => ({
      onFocus: handleFocus,
      onBlur: handleBlur,
      size: childProps.size || size,
    }),
    [childProps.size, handleBlur, handleFocus, size],
  );

  // 只针对Select相关组件添加此事件，否则会出现warning
  // Select相关组件blur后实际上还处于聚焦状态，需要特殊处理保证zIndex正确
  if (
    childType.__MUYA_TREESELECT ||
    childType.__MUYA_SELECT ||
    childType.__MUYA_CASCADER ||
    childType.__MUYA_AUTOCOMPLETE
  ) {
    finalChildProps.onPopupVisibleChange = handlePopupVisibleChange;
  }

  // 设置plain为true，即为线性按钮，带有border
  // type为normal的情况下，默认也是为线性按钮
  const isPlainButton =
    !theme.components.Button.plainIsLight &&
    (childProps.plain || !childProps.type || childProps.type === 'normal');
  // 非线性按钮，不需要向右移动
  if (childType.__MUYA_BUTTON && !isPlainButton) {
    childStyle.marginRight = 0;
  }

  finalChildProps.style = {
    ...childStyle,
    ...childProps.style,
  };

  return React.cloneElement(children as any, finalChildProps);
}

const StyledInputGroup = styled.div<IInputGroupProps>`
  ${props => {
    const compactStyle = props.disabled
      ? undefined
      : css`
          & > * {
            position: relative;
            float: none;
            vertical-align: top;

            &:focus {
              z-index: 1;
            }

            /* 中间节点，统一去除border-radius */
            &:not(:first-child):not(:last-child) {
              &,
              & ${StyledInputWrapper}, & ${StyledTagsInputWrapper} {
                border-radius: 0;
              }
            }

            /* 首节点右侧border-radius处理 */
            &:first-child {
              &,
              & ${StyledInputWrapper}, & ${StyledTagsInputWrapper} {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
              }
            }

            /* 尾节点左侧border-radius处理 */
            &:last-child {
              &,
              & ${StyledInputWrapper}, & ${StyledTagsInputWrapper} {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
              }
            }

            /* 除了尾节点的所有节点，向右移动1px，解决双重border的问题 */
            &:not(:last-child) {
              margin-right: -1px;
              border-right-width: 1px;
            }
          }
        `;

    return css`
      position: relative;
      display: block;
      width: 100%;
      ${compactStyle}
    `;
  }}
`;

const InputGroup = React.memo((props: IInputGroupProps) => {
  const { children, size, disabled = false, ...other } = props;
  return (
    <StyledInputGroup disabled={disabled} {...other}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
          return null;
        }

        return <ZIndexHoc size={size}>{child}</ZIndexHoc>;
      })}
    </StyledInputGroup>
  );
});

export default InputGroup;
