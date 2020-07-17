import transformStyles from './transformStyles';

test('transformStyles', () => {
  const result = transformStyles('muya-tabs', {
    tabContainer: 'container',
    tab: {
      width: 100,
    },
    test: '',
  });
  expect(result.tabContainer.className).toBe('muya-tabs-tab-container container');
  expect(result.tab.style).toEqual({
    width: 100,
  });
});
