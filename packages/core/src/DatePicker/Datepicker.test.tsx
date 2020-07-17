import React from 'react';
import renderer from 'react-test-renderer';

import DatePicker from './DatePicker';

test('测试普通渲染', () => {
  const tree = renderer
    .create(
      <>
        <DatePicker />
        <DatePicker disabled />
        <DatePicker selectType="month" />
        <DatePicker selectType="year" />

        <DatePicker options={[{ label: 'sss' }]} />

        <DatePicker value="2019-09-11" viewType="month" viewDate="2019-09-11" />
        <DatePicker viewType="month" viewDate="2019-09-11" />
        <DatePicker defaultViewDate="2019-09-11" defaultValue="2019-09-11" />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
