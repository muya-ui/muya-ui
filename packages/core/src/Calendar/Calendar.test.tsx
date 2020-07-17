import React from 'react';
import renderer from 'react-test-renderer';

import Calendar from './Calendar';

test('测试普通渲染', () => {
  const tree = renderer
    .create(
      <>
        <Calendar todayDate="2019-09-08" defaultDate="2019" />
        <Calendar todayDate="2019-09-08" defaultDate="2019" selectType="month" />
        <Calendar todayDate="2019-09-08" defaultDate="2019" selectType="year" />

        <Calendar todayDate="2019-09-08" defaultDate="2019" options={[{ label: 'sss' }]} />

        <Calendar
          todayDate="2019-09-08"
          selectedDate="2019-09-11"
          viewType="month"
          viewDate="2019-09-11"
        />
        <Calendar
          todayDate="2019-09-08"
          defaultDate="2019"
          viewType="month"
          viewDate="2019-09-11"
        />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
