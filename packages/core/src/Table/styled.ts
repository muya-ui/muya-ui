import styled, { css } from 'styled-components';

import Button from '../Button';
import { scrollBarStyle } from '../ScrollView/styled';
import { IThemedBaseProps, Omit } from '../types';
import addPx from '../utils/addPx';
import { ITableProps, ITableSortOrder } from './types';

interface StyledTableProps
  extends Omit<ITableProps<any>, 'dataSource' | 'columns'>,
    IThemedBaseProps {
  $columns: ITableProps<any>['columns'];
}

interface IExpandProps {
  $expanded: boolean;
  $expandable?: boolean;
}

interface StyledTableWrapperProps extends StyledTableProps {
  $showLeftColumnsShadow: boolean;
  $showRightColumnsShadow: boolean;
}

interface IHeaderProps {
  $sortOrder?: ITableSortOrder;
  $isSortColumn?: boolean;
}

// 内容区域容器，包含图标和文字
export const StyledHeaderContent = styled.div``;
// 内容右侧，图标的容器
export const StyledHeaderIconWrapper = styled.div``;

// 排序功能的上下箭头图标
export const StyledSortUpArrow = styled.i``;
export const StyledSortBottomArrow = styled.i``;

// 排序面板内容
export const StyledFilterItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.spec.s6}px;
  &:last-child {
    margin-bottom: 0;
  }
`;

// 筛选功能的图标
export const StyledFilter = styled.i``;

// 筛选功能最外层容器
export const StyledFilterWrapper = styled.div``;

// 空状态tr容器
export const StyledEmptyTr = styled.tr``;
// 行展开的tr
export const StyledExpandedTr = styled.tr<IExpandProps>`
  ${props => {
    if (!props.$expanded) {
      return css`
        display: none;
      `;
    }
  }}
`;
// 行展开的按钮
export const StyledExpandButton = styled(Button)<IExpandProps>`
  ${props => {
    const { $expanded, $expandable = true } = props;
    const expandStyle =
      !$expanded &&
      css`
        &::before {
          transform: translateY(-50%) rotate(-180deg);
        }
        &::after {
          transform: translateX(-50%) rotate(0deg);
        }
      `;
    const expandableStyle =
      !$expandable &&
      css`
        opacity: 0;
      `;
    return css`
      width: 1em;
      height: 1em;
      padding: 0;
      outline: none;
      transition: all 0.3s;
      user-select: none;
      &::before,
      &::after {
        position: absolute;
        background: currentColor;
        transition: transform 0.3s ease-out;
        content: '';
      }

      &::before {
        top: 50%;
        right: 3px;
        left: 3px;
        height: 1px;
        transform: translateY(-50%);
      }

      &::after {
        top: 3px;
        bottom: 3px;
        left: 50%;
        width: 1px;
        transform: translateX(-50%) rotate(90deg);
      }
      ${expandStyle}
      ${expandableStyle}
    `;
  }}
`;

// 带样式的表头th
export const StyledHeader = styled.th<IHeaderProps>`
  position: relative;
  ${props => {
    const { $isSortColumn, $sortOrder, theme } = props;
    const {
      components: { Table: token },
      colors,
      typography,
      spacing,
      zIndex,
      transition: {
        pattern: { easing, duration },
      },
    } = theme;
    return css`
      /* 容器通用样式 */
      &:hover {
        ${StyledHeaderContent}, ${StyledFilterWrapper} {
          background: ${colors.spec.neutral8.normal};
        }
      }
    ${StyledHeaderContent}, ${StyledFilterWrapper} {
      user-select: none;
      cursor: pointer;
      transition: background-color ${easing.status}
        ${duration.status}ms;
      background: ${token.headOrFooterBackground};
      ${StyledHeaderIconWrapper}, ${StyledFilter} {
        font-size: ${typography.spec.fontSize.s1}px;
        color: ${colors.pattern.icon.normal};
      }

      &:hover {
        background: ${token.headOrFooterHoverBackground};
        ${StyledHeaderIconWrapper},${StyledFilter} {
          color: ${colors.pattern.text.assistant};
        }
      }
    }

    ${StyledHeaderContent} {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      box-sizing: border-box;

      ${StyledHeaderIconWrapper} {
        display: flex;
        flex-flow: column nowrap;
        margin-left: ${spacing.spec.s1}px;
      }

      /* 内容区下的排序热区扩大 */
      ${StyledFilter} {
        &:after {
          content: ' ';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          cursor: pointer;
        }
      }
      /* 排序箭头样式 */
      ${StyledSortUpArrow}, ${StyledSortBottomArrow} {
        &,svg {
          display: block;
          width: ${token.arrowSize}px;
          height: ${token.arrowSize}px;
        }

        ${!!$sortOrder &&
          $isSortColumn &&
          css`
            color: ${colors.pattern.text.assistant};
          `}
      }

      ${StyledSortUpArrow} {
        margin-bottom: -1px;
        ${$sortOrder === 'ascend' &&
          $isSortColumn &&
          css`
            color: ${colors.spec.brand};
          `}
      }

      ${StyledSortBottomArrow} {
        margin-top: -1px;
        ${props =>
          $sortOrder === 'descend' &&
          $isSortColumn &&
          css`
            color: ${colors.spec.brand};
          `}
      }
    }


    ${StyledFilterWrapper} {
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 0 ${spacing.spec.s4}px;
      margin-left: ${spacing.spec.s4}px;
      z-index: ${zIndex.spec.s1};
    }
      `;
  }}
`;

// 单元格样式
function makeCellStyle(props: StyledTableProps) {
  const { size, theme } = props;
  const { headerPaddingLevels, cellPaddingLevels, fontLevel } = theme.components.Table.sizeData[
    size!
  ];

  const headerPadding = headerPaddingLevels.map(l => `${theme.spacing.spec[l]}px `);
  const cellPadding = cellPaddingLevels.map(l => `${theme.spacing.spec[l]}px `);

  return css`
    th,
    td {
      margin: 0;
      box-sizing: border-box;
    }

    line-height: ${theme.typography.spec.lineHeight[fontLevel]}px;
    font-size: ${theme.typography.spec.fontSize[fontLevel]}px;
    thead {
      th {
        padding: ${headerPadding};
      }

      ${StyledHeader} {
        padding: 0;
      }

      ${StyledHeaderContent} {
        padding: ${headerPadding};
      }
    }

    tfoot td {
      padding: ${headerPadding};
    }

    tbody td {
      padding: ${cellPadding};
    }
  `;
}

export const StyledTableWrapper = styled.div<StyledTableWrapperProps>`
  position: relative;
  overflow: auto;

  /*
    bordered情况下，使用wrapper的上下边框，去掉head和foot中单元格的上/下边框
    这样做是为了完美实现固定表头/尾部的功能
  */
  ${props => {
    const {
      colors: {
        pattern: { border },
      },
      components: { Table: token },
    } = props.theme;
    const fixedColumns = props.$columns
      .map((c, index) => ({
        ...c,
        index,
      }))
      .filter(c => !!c.fixed && 'width' in c);
    const leftFixedColumns = fixedColumns.filter(c => c.fixed === 'left');
    const rightFixedColumns = fixedColumns.filter(c => c.fixed === 'right');
    const getFixedColumnStyles = (columns: typeof fixedColumns, direction: 'left' | 'right') => {
      const styleList: any[] = [];
      columns.reduce<number>((acc, c, i) => {
        const childIndex = c.index + 1;
        const width = acc;
        let boxShadowStyle;
        let hideBorderStyle;
        if (
          (direction === 'left' && props.$showLeftColumnsShadow) ||
          (direction === 'right' && props.$showRightColumnsShadow)
        ) {
          hideBorderStyle = css`
            border-left: 0;
            border-right: 0;
          `;
        }
        if (direction === 'left' && props.$showLeftColumnsShadow && i === columns.length - 1) {
          boxShadowStyle = css`
            &:before {
              content: '';
              right: 0;
              top: 0;
              bottom: 0;
              position: absolute;
              width: 6px;
              z-index: -1;
              box-shadow: ${token.leftFixedColumnBoxShadow};
            }
          `;
        }
        if (direction === 'right' && props.$showRightColumnsShadow && i === columns.length - 1) {
          boxShadowStyle = css`
            &:before {
              content: '';
              left: 0;
              top: 0;
              bottom: 0;
              position: absolute;
              width: 6px;
              box-shadow: ${token.rightFixedColumnBoxShadow};
            }
          `;
        }
        styleList.push(css`
          & thead tr th:nth-child(${childIndex}),
          & tfoot tr td:nth-child(${childIndex}) {
            position: sticky;
            ${direction}: ${addPx(width)};
            z-index: ${token.fixedZIndex + 1};
            ${boxShadowStyle};
            ${hideBorderStyle}
          }

          & tbody tr td:nth-child(${childIndex}) {
            position: sticky;
            ${direction}: ${addPx(width)};
            z-index: ${token.fixedZIndex};
            ${boxShadowStyle}
            ${hideBorderStyle}
          }
        `);
        return acc + (typeof c.width === 'number' ? c.width : parseInt(c.width!, 10));
      }, 0);

      return styleList;
    };
    return css`
      ${scrollBarStyle({ size: 'l', theme: props.theme })}
      ${getFixedColumnStyles(leftFixedColumns, 'left')}
      ${getFixedColumnStyles(rightFixedColumns.reverse(), 'right')}
      ${props.bordered &&
        css`
          border-style: solid;
          border-color: ${border.normal};
          border-width: 1px 0;
          & th,
          td {
            border: 1px solid ${border.normal};
          }
          & thead tr:first-child th {
            border-top: 0;
          }
          & tfoot tr:last-child td {
            border-bottom: 0;
          }
        `}}

      ${props.fixedHeader &&
        css`
          & thead th {
            position: sticky;
            top: 0;
            z-index: ${token.fixedZIndex};
          }
        `}}

      ${props.fixedFooter &&
        css`
          & tfoot td {
            position: sticky;
            bottom: 0;
            z-index: ${token.fixedZIndex};
          }
        `}}
    `;
  }}
`;

export const StyledTable = styled.table<StyledTableProps>`
  ${props => {
    const {
      colors: {
        pattern: { border },
      },
      components: { Table: token },
    } = props.theme;
    return css`
      text-align: left;
      width: 100%;
      background-color: ${token.tableBackground};
      color: ${token.color};
      border-radius: ${token.borderRadius} ${token.borderRadius} 0 0;
      border-collapse: collapse;
      border-spacing: 0;
      table-layout: ${props.tableLayout};
      ${makeCellStyle}

      /* 表头样式 */
      thead {
        /* 表头第一行需要有圆角 */
        tr:first-child {
          & th:first-child {
            border-top-left-radius: ${token.borderRadius};
          }
          & th:last-child {
            border-top-right-radius: ${token.borderRadius};
          }
        }

        /* 多级表头情况下，上层表头文字居中 */
        tr:not(:last-child) {
          text-align: center;
        }

        /* 表头的内单元格的样式 */
        tr th {
          background: ${token.headOrFooterBackground};
          font-weight: ${token.headOrFooterFontWeight};
          color: ${token.headOrFooterColor};
        }
      }

      /* 表格主体 */
      tbody {
        tr {
          td {
            position: relative;
            z-index: 1;
            background: ${token.trBackground.normal};
            &:after {
              content: ' ';
              position: absolute;
              z-index: -1;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
            }
          }
          &:hover td:after {
            background: ${token.trBackground.hover};
          }
          /* 斑马纹表格 */
          ${props.stripe
            ? css`
                &:nth-child(2n) td:after {
                  background: ${token.trBackground.stripe};
                }
              `
            : css`
                border-bottom: 1px solid ${border.normal};
              `}
        }

        ${StyledEmptyTr} {
          background: ${token.trBackground.normal};
          &:hover {
            background: ${token.trBackground.normal};
          }
        }

        ${StyledExpandedTr} {
          td {
            background: ${token.trBackground.stripe};
            &:hover {
              background: ${token.trBackground.stripe};
            }
            &:hover:after {
              background: ${token.trBackground.stripe};
            }
          }
        }
      }

      /* 表尾 */
      tfoot {
        tr td {
          background: ${token.headOrFooterBackground};
          font-weight: ${token.headOrFooterFontWeight};
        }
      }
    `;
  }}
`;
