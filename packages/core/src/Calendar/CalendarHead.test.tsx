import dayjs from 'dayjs';
import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import { LocaleProvider } from '@muya-ui/core';

import CalendarHead from './CalendarHead';

test('测试普通渲染', () => {
  const tree = renderer
    .create(
      <>
        <LocaleProvider
          locale={{
            'Calendar.yearFormat': 'YYYY',
          }}
        >
          <CalendarHead viewDate={dayjs('2019')} viewType="month" />
          <CalendarHead viewDate={dayjs('2019')} viewType="year" />
          <CalendarHead viewDate={dayjs('2019')} viewType="decade" />
        </LocaleProvider>
        <LocaleProvider
          locale={{
            'Calendar.headOrder': 'month',
            'Calendar.yearFormat': 'YYYY',
          }}
        >
          <CalendarHead viewDate={dayjs('2019')} viewType="month" />
        </LocaleProvider>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('onSwitch', () => {
  const onSwitch = sinon.spy();
  const wrapper = mount(
    <CalendarHead viewType="month" viewDate={dayjs('2019')} onSwitch={onSwitch} />,
  );
  wrapper
    .find('SwitchButton')
    .first()
    .simulate('click');
  expect(() => {
    sinon.assert.calledWith(onSwitch, 'decade');
  }).not.toThrow();
});
