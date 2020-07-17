import { ICascaderOptionType } from '../types';
import { diffValue, findOption } from './utils';

test('diffValue', () => {
  expect(diffValue([1, 2, 3], [1, 2, 3])).toBe(true);
  expect(diffValue([1, 2], [1, 2, 3])).toBe(false);
  // @ts-ignore
  expect(diffValue([undefined], [null])).toBe(false);
  // @ts-ignore
  expect(diffValue([undefined], [undefined])).toBe(true);
  expect(diffValue([[1, 2, 3], [1, 2]], [[1, 2, 3], [1, 2]])).toBe(true);
  expect(diffValue([[1, 2, 3], [1, 2]], [[1, 2, 3], [1, 2, 3]])).toBe(false);
});

const options: ICascaderOptionType[] = [
  {
    label: '福建',
    value: 'fj',
    children: [
      {
        label: '福州',
        value: 'fuzhou',
        children: [
          {
            label: '马尾',
            value: 'mawei',
          },
        ],
      },
      {
        label: '泉州',
        value: 'quanzhou',
        isLeaf: false,
      },
    ],
  },
  {
    label: '浙江',
    value: 'zj',
    children: [
      {
        label: '杭州',
        value: 'hangzhou',
        children: [
          {
            label: '余杭',
            value: 'yuhang',
          },
          {
            label: '江干',
            value: 'jianggan',
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    label: '北京',
    value: 'bj',
    children: [
      {
        label: '朝阳区',
        value: 'chaoyang',
      },
      {
        label: '海淀区',
        value: 'haidian',
      },
    ],
  },
];

test('findOption', () => {
  expect(
    findOption(options, 'zj', {
      label: 'label',
      value: 'value',
      children: 'children',
      isLeaf: 'isLeaf',
    }),
  ).toBe(options[1]);
  expect(
    findOption(options, 'quanzhou', {
      label: 'label',
      value: 'value',
      children: 'children',
      isLeaf: 'isLeaf',
    }),
  ).toBe(options[0].children[1]);
  expect(
    findOption(options, 'mawei', {
      label: 'label',
      value: 'value',
      children: 'children',
      isLeaf: 'isLeaf',
    }),
  ).toBe(options[0].children[0].children[0]);
  expect(
    findOption(options, 'mawei1', {
      label: 'label',
      value: 'value',
      children: 'children',
      isLeaf: 'isLeaf',
    }),
  ).toBe(undefined);
});
