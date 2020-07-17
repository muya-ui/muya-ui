import React from 'react';
import renderer from 'react-test-renderer';

import DateTimeCalendar from './DateTimeCalendar';

test('测试普通渲染', () => {
  const tree = renderer
    .create(<DateTimeCalendar todayDate="2020-06-08" styles={{ head: 'test' }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
