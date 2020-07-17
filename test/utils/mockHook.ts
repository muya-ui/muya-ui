export default function mockHook<T extends { default: any }>(
  obj: T,
  propName: keyof T = 'default',
) {
  const fn = obj[propName];
  let mockResult: any = {};
  if (typeof fn === 'function') {
    Object.defineProperty(obj, propName, {
      value: (...args: any[]) => {
        const result = fn.apply(obj, args);
        return {
          ...result,
          ...mockResult,
        };
      },
    });
  }
  return {
    returns(args: any) {
      mockResult = args;
    },
    restore() {
      obj[propName] = fn;
      mockResult = {};
    },
  };
}
