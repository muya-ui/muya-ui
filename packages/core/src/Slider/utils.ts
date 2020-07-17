import React from 'react';

export function findClosest(value: number, nums: number[], snapSize: number, marksOnly: boolean) {
  if (marksOnly) {
    nums.sort((a: number, b: number) => Math.abs(a - value) - Math.abs(b - value));
    return nums[0];
  }
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i];
    if (Math.abs(value - item) < snapSize) {
      return item;
    }
  }
  return value;
}

export function validNum(num: number, max: number, min: number) {
  if (num > max) {
    return max;
  }
  if (num < min) {
    return min;
  }
  return num;
}

/**
 * 计算偏移量
 * @param vertical
 * @param offset
 * @param numRange
 * @param start
 * @param size
 */
export function offsetCss(
  vertical: boolean,
  offset: number,
  numRange: number,
  start: number,
  size?: number,
): React.CSSProperties {
  const offsetPercent = toPercent(offset - start, numRange);
  const css: React.CSSProperties = {};

  if (vertical) {
    css.top = `${offsetPercent}%`;
  } else {
    css.left = `${offsetPercent}%`;
  }

  if (!size) {
    return css;
  }
  const sizePercent = toPercent(size, numRange);

  if (vertical) {
    css.height = `${sizePercent}%`;
  } else {
    css.width = `${sizePercent}%`;
  }

  return css;
}

export function formatValue(value: number, fractionDigits: number) {
  // 解决 js 0.2 + 0.1 !== 0.3 的问题
  return Number(value.toFixed(fractionDigits));
}

export function toPercent(num: number, total: number) {
  return formatValue((num / total) * 100, 3);
}
