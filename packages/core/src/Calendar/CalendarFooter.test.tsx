import React from 'react';
import renderer from 'react-test-renderer';

import CalendarFooter from './CalendarFooter';

test('一般情况', () => {
  const tree = renderer
    .create(<CalendarFooter options={[{ label: 'test' }, { label: 'test', disabled: true }]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('options 不合法渲染', () => {
  const tree = renderer
    .create(
      <>
        <CalendarFooter />
        <CalendarFooter options={[]} />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('styles', () => {
  const tree = renderer.create(<CalendarFooter styles={{ footerOption: 'opt' }} />).toJSON();
  expect(tree).toMatchSnapshot();
});
