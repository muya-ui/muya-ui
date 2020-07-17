/**
 * 按数组并行执行某一个函数
 * @param arr 传入的数组
 * @param fn 每一项执行的函数
 * @param num 并行数量
 */
export function multiRun<T = any, P = any>(
  arr: T[],
  fn: (item: T, ...args: any[]) => Promise<P>,
  num: number,
): Promise<P[]> {
  let i = num;
  let running = 0;
  const result: P[] = [];
  return new Promise((resolve, reject) => {
    const done = (res: P) => {
      running -= 1;
      result.push(res);
      if (arr.length) {
        running += 1;
        fn(arr.shift()!)
          .then(done)
          .catch((e: Error) => reject(e));
      } else if (running === 0) {
        resolve(result);
      }
    };
    while (i > 0 && arr.length) {
      i -= 1;
      running += 1;
      fn(arr.shift()!)
        .then(done)
        .catch((e: Error) => reject(e));
    }
  });
}

export default multiRun;
