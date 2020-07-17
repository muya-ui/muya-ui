const win = (typeof window !== 'undefined' ? window : global) as any;
let canUseWebp = !!win.g_doNotSetCanUseWebp;
let hasCheckWebp = !!win.g_doNotSetHasCheckWebp;

export function setCanWebp(webp: boolean) {
  canUseWebp = webp;
  win.g_doNotSetCanUseWebp = canUseWebp;
}

export function setHasCheck(checked: boolean) {
  hasCheckWebp = checked;
  win.g_doNotSetHasCheckWebp = hasCheckWebp;
}

/**
 *
 * @param isForce 是否强制执行，默认是 false
 * @param uaStr 要检查的 UA 字符串，默认是 win.navigator.userAgent
 */
export function checkWebp(isForce?: boolean, uaStr?: string): Promise<boolean> {
  if (hasCheckWebp && !isForce) {
    return Promise.resolve(canUseWebp);
  }
  setHasCheck(true);
  let checkUAStr = uaStr || win.navigator.userAgent;
  checkUAStr = checkUAStr.toLowerCase();
  if (checkUAStr.indexOf('chrome') !== -1 && checkUAStr.indexOf('edge') === -1) {
    setCanWebp(true);
    return Promise.resolve(canUseWebp);
  }
  return new Promise(resolve => {
    const { Image } = win;
    const img = new Image(); // eslint-disable-line
    img.onload = () => {
      setCanWebp(img.height === 1);
      resolve(canUseWebp);
    };
    img.onerror = () => {
      setCanWebp(false);
      resolve(canUseWebp);
    };
    img.src =
      'data:image/webp;base64,UklGRiYAAABXRUJQVlA4IBoAAAAwAQCdASoBAAEAAAAMJaQAA3AA/v89WAAAAA==';
  });
}

export default checkWebp;
