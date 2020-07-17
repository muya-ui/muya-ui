import styled, { css } from 'styled-components';

import { IFontSizeSpec } from '@muya-ui/theme-light';

import Input from '../Input';
import { ISizeSpecBaseProps, IThemedBaseProps } from '../types';

interface IPaginationPageItemProps extends IThemedBaseProps, ISizeSpecBaseProps {
  isActive?: boolean;
  disabled?: boolean;
  isDarkBackground?: boolean;
  simple?: boolean;
}

export const StyledPaginationWrap = styled.ul`
  list-style: none;
  margin: 0;
  padding: 10px 0;
`;

export const StyledMoreIcon = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  opacity: 1;
  ${props => {
    const {
      theme: {
        components: {
          Pagination: { numberColor },
        },
        transition: {
          pattern: { duration, easing },
        },
      },
    } = props;

    return css`
      color: ${numberColor.normal};
      transition: all ${duration.status}ms ${easing.status};
    `;
  }}
`;

export const StyledJumpIcon = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  opacity: 0;
  ${props => {
    const {
      theme: {
        transition: {
          pattern: { duration, easing },
        },
      },
    } = props;

    return css`
      transition: all ${duration.status}ms ${easing.status};
    `;
  }}
`;

// 公共 item
const paginationItemBaseCss = (props: IPaginationPageItemProps, inputFontSize: number = -1) => {
  const {
    size = 'm',
    simple,
    theme: {
      typography: {
        spec: { fontSize },
      },
      components: {
        Pagination: { numberFontLevel, itemHeight, itemLineHeight, itemMargin },
      },
      transition: {
        pattern: { duration, easing },
      },
    },
  } = props;
  const fontLevel = numberFontLevel[size!] as IFontSizeSpec;
  let mainCSS;

  if (simple) {
    mainCSS = css`
      transition: all ${duration.status}ms ${easing.status};
      height: ${itemHeight[size]}px;
      min-width: ${itemHeight[size]}px;
      line-height: ${itemLineHeight[size]}px;
    `;
  } else {
    mainCSS = css`
      transition: background-color ${duration.status}ms ${easing.status},
        color ${duration.status}ms ${easing.status}, border ${duration.status}ms ${easing.status};
      height: ${itemHeight[size]}px;
      min-width: ${itemHeight[size]}px;
      line-height: ${itemLineHeight[size]}px;
      margin-right: ${itemMargin[size]}px;
      margin-bottom: ${itemMargin[size]}px;
    `;
  }
  let innerFontSize = fontSize[fontLevel];
  if (inputFontSize > -1) {
    innerFontSize = inputFontSize;
  }

  return css`
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: ${innerFontSize}px;
    ${mainCSS}
  `;
};

export const StyledPageNumber = styled.li<IPaginationPageItemProps>`
  ${props => {
    const {
      size,
      isActive,
      isDarkBackground,
      theme: {
        components: {
          Pagination: { border, background, numberColor, itemPadding, itemFontWeight },
        },
        transition: {
          pattern: { duration, easing },
        },
      },
    } = props;

    const bgColor = isDarkBackground ? background.darkBg : background.whiteBg;
    return css`
      ${paginationItemBaseCss(props)}
      background-color: ${isActive ? background.current : bgColor};
      border: ${isActive ? border.current : border.normal};
      font-weight: ${isActive ? itemFontWeight.selected : itemFontWeight.normal};
      ${StyledPaginationText} {
        padding: 0 ${itemPadding[size!]}px;
        transition: background-color ${duration.status}ms ${easing.status},
          color ${duration.status}ms ${easing.status};
        color: ${isActive ? numberColor.current : numberColor.normal};
      }
      &:hover {
        background-color: ${background.hover};
        border: ${border.hover};
        ${StyledPaginationText} {
          color: ${numberColor.hover};
        }
      }
      &:active {
        background-color: ${background.clicked};
        border: ${border.clicked};
      }
    `;
  }}
`;

// 两侧箭头
export const StyledPageArrow = styled.li<IPaginationPageItemProps>`
  ${props => paginationItemBaseCss(props, 0)}
  ${props => {
    const {
      disabled,
      simple,
      isDarkBackground,
      theme: {
        typography,
        components: {
          Pagination: { arrowColor, border, background },
        },
      },
    } = props;

    const bgColor = isDarkBackground ? background.darkBg : background.whiteBg;

    if (simple) {
      return css`
        color: ${disabled ? arrowColor.disabled : arrowColor.normal};
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        font-weight: ${typography.spec.fontWeight.semibold};
        &:hover {
          color: ${disabled ? arrowColor.disabled : arrowColor.simpleHover};
        }
      `;
    }

    return css`
      background-color: ${bgColor};
      border: ${border.normal};
      color: ${disabled ? arrowColor.disabled : arrowColor.normal};
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
      font-weight: ${typography.spec.fontWeight.semibold};
      &:hover {
        background-color: ${disabled ? bgColor : background.hover};
        color: ${disabled ? arrowColor.disabled : arrowColor.hover};
        border: ${disabled ? border.disabled : border.hover};
      }
      &:active {
        background-color: ${disabled ? bgColor : background.clicked};
        border: ${disabled ? border.disabled : border.hover};
      }
    `;
  }}
`;

export const StyledPaginationEllipsis = styled.li<IPaginationPageItemProps>`
  ${paginationItemBaseCss}
  ${props => {
    const {
      theme: {
        components: {
          Pagination: { moreColor },
        },
      },
    } = props;

    return css`
      position: relative;

      &:hover {
        ${StyledMoreIcon} {
          opacity: 0;
        }
        ${StyledJumpIcon} {
          color: ${moreColor.hover};
          opacity: 1;
        }
      }
      &:active {
        ${StyledJumpIcon} {
          color: ${moreColor.clicked};
        }
      }
    `;
  }}
`;

export const StyledPaginationText = styled.a`
  display: block;
`;

export const StyledPaginationJump = styled.li`
  display: inline-block;
  vertical-align: middle;
  ${(props: IPaginationPageItemProps) => {
    const {
      size,
      theme: {
        components: {
          Pagination: { itemHeight, itemMargin },
        },
      },
    } = props;

    return css`
      height: ${itemHeight[size!]}px;
      margin-right: ${itemMargin[size!]}px;
      margin-bottom: ${itemMargin[size!]}px;
    `;
  }}
`;

export const StyledPaginationJumpText = styled.span`
  padding: 0 12px;
  user-select: none;
  ${(props: IPaginationPageItemProps) => {
    const {
      size,
      theme: {
        typography: {
          spec: { fontSize },
        },
        components: {
          Pagination: { jumpFontLevel, numberColor },
        },
      },
    } = props;
    const fontLevel = jumpFontLevel[size!] as IFontSizeSpec;

    return css`
      font-size: ${fontSize[fontLevel]}px;
      color: ${numberColor.normal};
    `;
  }}
`;

export const PaginationInput = styled(Input)`
  ${(props: IPaginationPageItemProps) => {
    const {
      size,
      theme: {
        typography: {
          spec: { fontSize },
        },
        components: {
          Pagination: { numberFontLevel, inputFontWeight },
        },
      },
    } = props;
    const fontLevel = numberFontLevel[size!] as IFontSizeSpec;

    return css`
      && {
        padding: 0;
      }
      & input {
        font-weight: ${inputFontWeight};
        text-align: center;
        font-size: ${fontSize[fontLevel]}px;
      }
    `;
  }}
`;

export const StyledSimplePageSplit = styled.span`
  margin: 0 10px;
  vertical-align: middle;
`;

export const StyledSimplePageText = styled.span`
  vertical-align: middle;
`;

export const StyledSimplePageNum = styled.li`
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  ${(props: IPaginationPageItemProps) => {
    const {
      size,
      theme: {
        typography: {
          spec: { fontSize },
        },
        components: {
          Pagination: { numberFontLevel, numberColor },
        },
      },
    } = props;
    const fontLevel = numberFontLevel[size!] as IFontSizeSpec;

    return css`
      font-size: ${fontSize[fontLevel]}px;
      color: ${numberColor.normal};
    `;
  }};
`;

export const StyledSimpleActivePage = styled(StyledSimplePageText)`
  ${(props: IPaginationPageItemProps) => {
    const {
      theme: {
        typography: {
          spec: { fontWeight },
        },
      },
    } = props;

    return css`
      font-weight: ${fontWeight.semibold};
    `;
  }};
`;
