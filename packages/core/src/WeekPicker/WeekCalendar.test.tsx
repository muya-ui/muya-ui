import React from 'react';
import renderer from 'react-test-renderer';

import WeekCalendar from './WeekCalendar';

test('测试普通渲染', () => {
  const tree = renderer
    .create(<WeekCalendar todayDate="2020-06-08" styles={{ head: 'test' }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('disabled', () => {
  const tree = renderer
    .create(<WeekCalendar todayDate="2020-06-08" disableWeek={week => week[0].day() === 3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('footer options', () => {
  const tree = renderer
    .create(
      <WeekCalendar todayDate="2020-06-08" options={[{ label: 'test', week: '2020-06-22' }]} />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
