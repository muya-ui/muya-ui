import React from 'react';
import renderer from 'react-test-renderer';

import RangeDatePicker from './RangeDatePicker';

test('测试普通渲染', () => {
  const tree = renderer
    .create(
      <>
        <RangeDatePicker />
        <RangeDatePicker disabled />
        <RangeDatePicker selectType="month" />
        <RangeDatePicker selectType="year" />

        <RangeDatePicker options={[{ label: 'sss', range: ['2', '20'] }]} />

        <RangeDatePicker value={['2019-11-11', '2019-11-11']} />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
