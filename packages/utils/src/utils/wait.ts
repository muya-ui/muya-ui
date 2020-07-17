/**
 * 相当于 sleep 一段时间
 * @param ms 等待的毫秒数
 */
function time(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

/**
 * 等待图片下载完成
 * @param imgSrc 图片地址
 */
function imgLoaded(imgSrc: string, crossOrigin?: string) {
  const { Image } = window as any;
  const img: HTMLImageElement = new Image();
  if (crossOrigin) {
    img.crossOrigin = crossOrigin;
  }
  return new Promise<HTMLImageElement>((resolve, reject) => {
    img.onerror = (e: string | Event) => {
      reject(e);
    };
    img.onload = () => {
      resolve(img);
    };
    img.src = imgSrc;
  });
}

const wait = {
  imgLoaded,
  time,
};

export { wait };
export default wait;
