export default function forkHandler<T>(
  fnA?: (event: T) => void,
  fnB?: (event: T) => void,
  beforeFn?: (event: T) => boolean | 'A' | 'B',
) {
  const handle = (event: T) => {
    let canExec: boolean | 'A' | 'B' = true;
    if (beforeFn) {
      canExec = beforeFn(event);
    }
    if (fnA && (canExec === 'A' || canExec === true)) {
      fnA(event);
    }
    if (fnB && (canExec === 'B' || canExec === true)) {
      fnB(event);
    }
  };

  return handle;
}
