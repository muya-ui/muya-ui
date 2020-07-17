/**
 * 限制异步函数不能同时执行
 * @param fn asnyc function
 */
export function once(fn: (...args: any[]) => Promise<any>) {
  let isCalling = false;
  return async function callOnceWrap(...args: any[]) {
    if (isCalling) return false;
    isCalling = true;
    await fn(...args);
    isCalling = false;
    return true;
  };
}

export default once;
