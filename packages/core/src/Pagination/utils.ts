export function getValidPageValue(value: number, pageAmount: number) {
  if (value > pageAmount) {
    return pageAmount;
  }
  if (value < 1) {
    return 1;
  }
  return value;
}

interface IPaginationPiece {
  type: 'page-number' | 'ellipsis';
  pageNumber?: number;
  goto?: 'prev' | 'next';
}

/**
 * 计算分页大小
 * @param totalRecords 总记录数
 * @param pageSize 分页大小
 */
export function calculatePage(totalRecords: number, pageSize: number) {
  if (totalRecords === 0) return 1;
  return Math.floor((totalRecords - 1) / pageSize) + 1;
}

/**
 * 计算分页的分段
 * @param activePage 当前页面
 * @param totalRecords 总记录数
 * @param pageSize 页面梳理
 * @param midSideWidth 分段的宽度
 * @param minNumberWidth 最少显示几个
 */
export function computeVisiblePieces(
  currentPage: number,
  pageAmount: number,
  midSideWidth: number,
  minNumberWidth: number,
): IPaginationPiece[] {
  const visiblePieces: IPaginationPiece[] = [];

  // 计算需要显示在 currentPage 左右侧的数字

  // 最左边显示的除了 1 之外的数字
  const minLeftNumber = Math.min(pageAmount - minNumberWidth + 1, currentPage - midSideWidth);
  // 最右边显示的除了 pageAmount 之外的数字
  const minRightNumber = Math.max(currentPage + midSideWidth, Math.min(minNumberWidth, pageAmount));
  // 计算需要显示的数字
  for (let i = Math.max(2, minLeftNumber); i <= Math.min(pageAmount - 1, minRightNumber); i += 1) {
    visiblePieces.push({ type: 'page-number', pageNumber: i });
  }

  // 总数7个及以上，展示 ... 省略号
  if (pageAmount >= minNumberWidth + midSideWidth) {
    if (currentPage - midSideWidth > 2) {
      visiblePieces.unshift({ type: 'ellipsis', goto: 'prev' });
    }
    if (currentPage + midSideWidth < pageAmount - 1) {
      visiblePieces.push({ type: 'ellipsis', goto: 'next' });
    }
  }

  // 首位数字
  visiblePieces.unshift({ type: 'page-number', pageNumber: 1 });
  if (pageAmount !== 1) {
    visiblePieces.push({ type: 'page-number', pageNumber: pageAmount });
  }

  return visiblePieces;
}
