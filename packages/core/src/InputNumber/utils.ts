export const isValidProps = (value: any) => value !== undefined && value !== null;

export const isNotCompleteNumber = (num: any) => {
  return (
    isNaN(num) ||
    num === '' ||
    num === null ||
    (num && num.toString().indexOf('.') === num.toString().length - 1)
  );
};

export const handleSymbol = (str?: string | number) => {
  return str === '-' || str === '.' || str === '-.';
};

export const addNum = (num1: number, num2: number) => {
  let sq1;
  let sq2;
  let m;
  try {
    sq1 = num1.toString().split('.')[1].length;
  } catch (e) {
    sq1 = 0;
  }
  try {
    sq2 = num2.toString().split('.')[1].length;
  } catch (e) {
    sq2 = 0;
  }
  m = Math.pow(10, Math.max(sq1, sq2));
  return (Math.round(num1 * m) + Math.round(num2 * m)) / m;
};
