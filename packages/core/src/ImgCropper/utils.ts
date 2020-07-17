import { CSSProperties } from 'react';

// 旋转是 90 的奇数倍
export function rotateIsOdd(rotate: number) {
  return Math.floor(rotate / 90) % 2 !== 0;
}

export function getImgStyle(
  size: [number, number],
  rotate: number,
  img?: HTMLImageElement,
): CSSProperties {
  const style: CSSProperties = {};
  if (!img) {
    return style;
  }
  const switchWidthHeight = rotateIsOdd(rotate);
  const width = switchWidthHeight ? size[1] : size[0];
  const height = switchWidthHeight ? size[0] : size[1];
  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;

  const boxRatio = width / height;
  const imgRatio = imgWidth / imgHeight;
  if (imgRatio > boxRatio) {
    style.height = height;
    const boxWidth = imgRatio * height;
    style.width = boxWidth;
  } else {
    style.width = width;
    const boxHeight = width / imgRatio;
    style.height = boxHeight;
  }

  style.top = (size[1] - style.height) / 2;
  style.left = (size[0] - style.width) / 2;

  return style;
}

/**
 * 判断两个区间是否有重叠，有重叠返回 A -> B 的偏移量
 * @param rangeA
 * @param rangeB
 */
export function getRangeOffset(rangeA: [number, number], rangeB: [number, number]) {
  const [startA, endA] = rangeA;
  const [startB, endB] = rangeB;
  if (startA > startB) {
    return startA - startB;
  }
  if (endA < endB) {
    return endA - endB;
  }
  return 0;
}

type ITranslateRect = Pick<ClientRect, 'top' | 'left' | 'bottom' | 'right'>;

export function getNewTranslate(
  maskRect: ITranslateRect,
  imgRect: ITranslateRect,
  translate: [number, number],
) {
  const topOffset = getRangeOffset([imgRect.top, imgRect.bottom], [maskRect.top, maskRect.bottom]);
  const leftOffset = getRangeOffset([imgRect.left, imgRect.right], [maskRect.left, maskRect.right]);

  if (topOffset === 0 && leftOffset === 0) {
    return;
  }

  const newTranslate: [number, number] = [translate[0] - leftOffset, translate[1] - topOffset];
  return newTranslate;
}

// 临时使用
type ICropRect = Pick<ClientRect, 'top' | 'left' | 'width' | 'height'>;
// 后面有 canvas 的不好再单测里面跑
/* istanbul ignore next */
/**
 * 创建原图旋转后的 canvas
 * @param img 图片实例
 * @param imgRect 图片的位置信息
 * @param rotate 旋转
 * @param ratio 缩放比例
 */
export function createSourceImg(
  img: HTMLImageElement,
  imgRect: ICropRect,
  rotate: number,
  ratio: number = 1,
) {
  const canvas = document.createElement('canvas');
  const canvasWidth = imgRect.width * ratio;
  const canvasHeight = imgRect.height * ratio;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const x = canvasWidth / 2;
  const y = canvasHeight / 2;

  const ctx = canvas.getContext('2d');
  let drawWidth = canvasWidth;
  let drawHeight = canvasHeight;
  if (rotateIsOdd(rotate)) {
    drawWidth = canvasHeight;
    drawHeight = canvasWidth;
  }
  ctx!.translate(x, y);
  ctx!.rotate((rotate * Math.PI) / 180);
  ctx!.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
  return canvas;
}

/**
 * 生成剪裁后的 canvas
 * @param img 图片实例
 * @param imgRect 图片的位置信息
 * @param maskRect 遮罩的位置
 * @param rotate 旋转
 * @param ratio 缩放比例
 */
export function cropImg(
  img: HTMLImageElement,
  imgRect: ICropRect,
  maskRect: ICropRect,
  rotate: number,
  ratio: number = 1,
) {
  // 先把原图的 canvas 画出来

  const canvas = document.createElement('canvas');
  const canvasWidth = maskRect.width * ratio;
  const canvasHeight = maskRect.height * ratio;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const dx = (maskRect.left - imgRect.left) * ratio;
  const dy = (maskRect.top - imgRect.top) * ratio;
  const sourceImg = createSourceImg(img, imgRect, rotate, ratio);

  canvas
    .getContext('2d')!
    .drawImage(sourceImg, dx, dy, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
  return canvas;
}
