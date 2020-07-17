import dayjs from 'dayjs';
import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import CalendarPanel from './CalendarPanel';

describe('CalendarPanel 一般情况的snapshot', () => {
  test('月视图', () => {
    const tree = renderer
      .create(
        <CalendarPanel
          todayDate={dayjs('2019-09-08')}
          viewDate={dayjs('2019-09-08')}
          viewType="month"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('年视图', () => {
    const tree = renderer
      .create(
        <CalendarPanel
          todayDate={dayjs('2019-09-08')}
          viewDate={dayjs('2019-09-08')}
          viewType="year"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('10年视图', () => {
    const tree = renderer
      .create(
        <CalendarPanel
          todayDate={dayjs('2019-09-08')}
          viewDate={dayjs('2019-09-08')}
          viewType="decade"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('CalendarPanel 有选中情况的snapshot', () => {
  test('月视图', () => {
    const tree = renderer
      .create(
        <CalendarPanel
          todayDate={dayjs('2019-09-08')}
          viewDate={dayjs('2019-09-08')}
          selected={dayjs('2019-09-11')}
          viewType="month"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('年视图', () => {
    const tree = renderer
      .create(
        <CalendarPanel
          todayDate={dayjs('2019-09-08')}
          viewDate={dayjs('2019-09-08')}
          selected={dayjs('2019-09-11')}
          viewType="year"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('10年视图', () => {
    const tree = renderer
      .create(
        <CalendarPanel
          todayDate={dayjs('2019-09-08')}
          viewDate={dayjs('2019-09-08')}
          selected={dayjs('2019-09-11')}
          viewType="decade"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('RangeCalendarPanel 有选中情况的snapshot', () => {
  test('月视图', () => {
    const tree = renderer
      .create(
        <CalendarPanel
          todayDate={dayjs('2019-09-08')}
          viewDate={dayjs('2019-09-08')}
          start={dayjs('2019-09-10')}
          end={dayjs('2019-09-22')}
          range={[dayjs('2019-09-10'), dayjs('2019-09-22')]}
          viewType="month"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('年视图', () => {
    const tree = renderer
      .create(
        <CalendarPanel
          todayDate={dayjs('2019-09-08')}
          viewDate={dayjs('2019-09-08')}
          start={dayjs('2019-05-11')}
          end={dayjs('2019-09-11')}
          range={[dayjs('2019-05-11'), dayjs('2019-09-11')]}
          viewType="year"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('10年视图', () => {
    const tree = renderer
      .create(
        <CalendarPanel
          todayDate={dayjs('2019-09-08')}
          viewDate={dayjs('2019-09-08')}
          start={dayjs('2012-09-11')}
          end={dayjs('2018-09-11')}
          range={[dayjs('2012-09-11'), dayjs('2018-09-11')]}
          viewType="decade"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('RangeCalendarPanel 设置了 min 或者 max 情况的snapshot', () => {
  test('min = 10', () => {
    const tree = renderer
      .create(
        <CalendarPanel
          todayDate={dayjs('2019-09-08')}
          viewDate={dayjs('2019-09-08')}
          start={dayjs('2012-09-11')}
          min={10}
          end={dayjs('2018-09-11')}
          range={[dayjs('2012-09-11'), dayjs('2018-09-11')]}
          viewType="month"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('max = 10', () => {
    const tree = renderer
      .create(
        <CalendarPanel
          todayDate={dayjs('2019-09-08')}
          viewDate={dayjs('2019-09-08')}
          start={dayjs('2012-09-11')}
          max={10}
          viewType="month"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('RangeCalendarPanel 设置了 fixedStart 或者 fixedEnd 情况的snapshot', () => {
  test('fixedStart = 2012-09-11', () => {
    const tree = renderer
      .create(
        <CalendarPanel
          todayDate={dayjs('2019-09-08')}
          viewDate={dayjs('2019-09-08')}
          fixedStart={dayjs('2012-09-11')}
          viewType="month"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('fixedEnd = 2012-09-20', () => {
    const tree = renderer
      .create(
        <CalendarPanel
          todayDate={dayjs('2019-09-08')}
          viewDate={dayjs('2019-09-08')}
          fixedEnd={dayjs('2012-09-20')}
          viewType="month"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

test('onItemClick & onItemHover', () => {
  const onItemClick = sinon.spy();
  const onItemHover = sinon.spy();
  const wrapper = mount(
    <CalendarPanel
      todayDate={dayjs('2019-09-08')}
      viewDate={dayjs('2019-09-08')}
      viewType="month"
      onItemHover={onItemHover}
      onItemClick={onItemClick}
    />,
  );
  wrapper
    .find({ status: 'normal' })
    .first()
    .simulate('click');
  wrapper
    .find({ status: 'normal' })
    .first()
    .simulate('mouseenter');
  expect(() => {
    sinon.assert.calledOnce(onItemClick);
    sinon.assert.calledOnce(onItemHover);
  }).not.toThrow();
});
