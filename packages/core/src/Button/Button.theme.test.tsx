import React from 'react';
import renderer from 'react-test-renderer';

import themeCoohom from '@qunhe/muya-theme-coohom';
import themeDark from '@muya-ui/theme-dark';
import themeUp from '@qunhe/muya-theme-up';

import ThemeProvider from '../ThemeProvider';
import Button from './Button';

function renderToMatchSnapshot(input: React.ReactElement) {
  const treeDefault = renderer.create(input).toJSON();
  expect(treeDefault).toMatchSnapshot();

  const treeThemeUp = renderer
    .create(<ThemeProvider theme={themeUp}>{input}</ThemeProvider>)
    .toJSON();
  expect(treeThemeUp).toMatchSnapshot();

  const treeThemeDark = renderer
    .create(<ThemeProvider theme={themeDark}>{input}</ThemeProvider>)
    .toJSON();
  expect(treeThemeDark).toMatchSnapshot();

  const treeThemeCoohom = renderer
    .create(<ThemeProvider theme={themeCoohom}>{input}</ThemeProvider>)
    .toJSON();
  expect(treeThemeCoohom).toMatchSnapshot();
}

test('不同类型', () => {
  renderToMatchSnapshot(
    <>
      <Button type="primary">Test</Button>
      <Button type="strong">Test</Button>
      <Button>Test</Button>
      <Button type="secondary">Test</Button>
      <Button type="weak">Test</Button>
      <Button type="danger">Test</Button>
      <Button type="warning">Test</Button>
    </>,
  );
});

test('plain=true', () => {
  renderToMatchSnapshot(
    <>
      <Button type="primary" plain>
        Test
      </Button>
      <Button type="strong" plain>
        Test
      </Button>
      <Button plain>Test</Button>
      <Button type="secondary" plain>
        Test
      </Button>
      <Button type="weak" plain>
        Test
      </Button>
      <Button type="danger" plain>
        Test
      </Button>
      <Button type="warning" plain>
        Test
      </Button>
    </>,
  );
});
