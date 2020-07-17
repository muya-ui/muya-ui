import React from 'react';
import renderer from 'react-test-renderer';

import RangeCalendar from './RangeCalendar';

test('测试普通渲染', () => {
  const tree = renderer
    .create(
      <>
        <RangeCalendar todayDate="2019-09-08" defaultRange={['2018', '2019']} />
        <RangeCalendar todayDate="2019-09-08" defaultRange={['2018', '2019']} selectType="month" />
        <RangeCalendar todayDate="2019-09-08" defaultRange={['2018', '2019']} selectType="year" />
        <RangeCalendar
          todayDate="2019-09-08"
          defaultRange={['2018', '2019']}
          options={[{ label: 'ss', range: ['2022', '2019'] }]}
        />

        <RangeCalendar todayDate="2019-09-08" viewDate={['2019-09-11', '2019-09-11']} />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
