import getSlideDirection from './getSlideDirection';

test('get Slide Direction By placement', () => {
  expect(getSlideDirection('auto')).toBe('up');
  expect(getSlideDirection('left-start')).toBe('right');
  expect(getSlideDirection('right-end')).toBe('left');
  expect(getSlideDirection('top')).toBe('down');
  expect(getSlideDirection('bottom')).toBe('up');
});
