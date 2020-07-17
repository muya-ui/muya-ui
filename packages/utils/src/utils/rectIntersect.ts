export type IRectIntersectRect = Pick<ClientRect, 'top' | 'bottom' | 'left' | 'right'>;

/**
 * 检查两个矩形是否相交
 * @param rect 要检查的矩形
 * @param container 容器矩形
 */
export function rectIntersect(rect: IRectIntersectRect, container: IRectIntersectRect) {
  const topBottomIn =
    (rect.top >= container.top && rect.top <= container.bottom) || // 图片的上边在区域内
    (rect.top <= container.top && rect.bottom >= container.bottom) || // 图片大于区域
    (rect.bottom >= container.top && rect.bottom <= container.bottom); // 图片的下边在区域内
  const leftRightIn =
    (rect.left >= container.left && rect.left <= container.right) || // 图片的上边在区域内
    (rect.left <= container.left && rect.right >= container.right) || // 图片大于区域
    (rect.right >= container.left && rect.right <= container.right); // 图片的下边在区域内

  return topBottomIn && leftRightIn;
}

/**
 * 数值转换
 * @param val 输入的值
 * @param base 基础值
 * @param diff 偏移的值
 */
export function getRectValue(val: number, base: number, diff = 0) {
  if (Math.abs(val) < 10) {
    return base * (val + diff);
  }
  return base * diff + val;
}

/**
 * 初始化一个容器
 * @param containerRectConfig 容器配置，默认是 { top: -0.3, bottom: 0.3, left: 0, right: 0 }，意思是距离 top 往上0.3倍的容器高度，bottom 往下0.3倍容器高度，左右边就是容器的边
 * @param containerWidth 容器的基础宽度，默认是 window.innerWidth
 * @param containerHeight 容器的基础高度，默认是 window.innerHeight
 */
export function initRectIntersectContainer(
  containerRectConfig: IRectIntersectRect,
  rect: Pick<ClientRect, 'width' | 'height' | 'top' | 'left'>,
) {
  const rectConfig = containerRectConfig;
  return {
    top: rect.top + getRectValue(rectConfig.top, rect.height),
    bottom: rect.top + getRectValue(rectConfig.bottom, rect.height, 1),
    left: rect.left + getRectValue(rectConfig.left, rect.width),
    right: rect.left + getRectValue(rectConfig.right, rect.width, 1),
  };
}

/**
 * 设置容器并返回一个 rectIntersect 函数
 * @param containerRectConfig 容器配置，默认是 { top: -0.3, bottom: 0.3, left: 0, right: 0 }，意思是距离 top 往上0.3倍的容器高度，bottom 往下0.3倍容器高度，左右边就是容器的边
 * @param containerWidth 容器的基础宽度，默认是 window.innerWidth
 * @param containerHeight 容器的基础高度，默认是 window.innerHeight
 */
export function setRectIntersectContainer(
  containerRectConfig: IRectIntersectRect,
  rect: Pick<ClientRect, 'width' | 'height' | 'top' | 'left'>,
) {
  const container = initRectIntersectContainer(containerRectConfig, rect);
  return (rect: IRectIntersectRect) => rectIntersect(rect, container);
}

export default rectIntersect;
