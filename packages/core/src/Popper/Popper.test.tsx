import { flipPlacement } from './Popper';

test('测试 prop placement', () => {
  document.body.setAttribute('dir', 'rtl');
  expect(flipPlacement('bottom-end')).toBe('bottom-start');
  expect(flipPlacement('bottom-start')).toBe('bottom-end');
  expect(flipPlacement('top-end')).toBe('top-start');
  expect(flipPlacement('top-start')).toBe('top-end');
  expect(flipPlacement('bottom')).toBe('bottom');
  document.body.removeAttribute('dir');
  expect(flipPlacement('top-start')).toBe('top-start');
});
