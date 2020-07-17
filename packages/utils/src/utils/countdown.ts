export type ICountdownKey = 'Y' | 'M' | 'D' | 'H' | 'm' | 's' | 'S';

// Countdown
const timeUnits: [ICountdownKey, number][] = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];

/**
 * 计算倒计时
 * @param remain 剩余毫秒数
 * @param startOf 从什么单位开始算
 */
export function countdown(remain: number, startOf: ICountdownKey = 'Y') {
  const result = {
    Y: 0,
    M: 0,
    D: 0,
    H: 0,
    m: 0,
    s: 0,
    S: 0,
  };
  let remainNum = remain;
  let begin = false;
  timeUnits.forEach(([key, unit]) => {
    if (key === startOf) {
      begin = true;
    }
    if (!begin) {
      return;
    }
    const value = Math.floor(remainNum / unit);
    remainNum -= value * unit;
    result[key] = value;
  });

  return result;
}

export default countdown;
