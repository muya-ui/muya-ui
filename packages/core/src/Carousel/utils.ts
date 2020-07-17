import { ICarouselImg, ICarouselImgItem } from './types';

export function transformImgs(imgs: ICarouselImg[]) {
  if (imgs.length <= 0) {
    return {
      imgs: [],
      imgItems: [],
      isItems: false,
    };
  }

  const firstItem = imgs[0];
  // 暂时只做第一个的判断
  if (typeof firstItem === 'string') {
    return {
      imgs: imgs as string[],
      imgItems: [],
      isItems: false,
    };
  }
  const imgItems = imgs as ICarouselImgItem[];

  return {
    imgs: imgItems.map(i => i.imgSrc),
    imgItems,
    isItems: true,
  };
}
