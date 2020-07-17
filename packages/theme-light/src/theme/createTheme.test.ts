import createTheme, { createThemeColors } from './createTheme';

test('should use outerTheme data', () => {
  const theme = createTheme(
    {
      colors: {
        spec: {
          brand: '#00C93C',
          brand2: '#00C93C',
        },
      },
    },
    () => ({
      Button: {
        hoverZIndex: 100,
      },
    }),
  );
  expect(theme.colors.spec.brand).toEqual('#00C93C');
  expect(theme.components.Button.typeColor.primary.normal).toBe('#00C93C');
  expect(theme.components.Button.hoverZIndex).toBe(100);
});

test('只定制组件的样式', () => {
  const theme = createTheme(() => ({
    Button: {
      hoverZIndex: 100,
    },
  }));
  expect(theme.components.Button.hoverZIndex).toBe(100);
});

test('createThemeColors', () => {
  const colors = createThemeColors(
    {
      light: 'rgba(0,0,0,1)',
    },
    {
      background: {
        global: '#232529',
      },
    },
  );
  expect(colors.spec.light).toBe('rgba(0,0,0,1)');
  expect(colors.pattern.background.global).toBe('#232529');
});

test('createThemeColors no pattern', () => {
  const colors = createThemeColors({
    light: 'rgba(0,0,0,1)',
  });
  expect(colors.spec.light).toBe('rgba(0,0,0,1)');
});
