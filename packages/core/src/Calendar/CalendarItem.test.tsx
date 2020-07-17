import dayjs from 'dayjs';
import React from 'react';
import renderer from 'react-test-renderer';

import CalendarItem from './CalendarItem';

test('测试 item 不同的 viewType', () => {
  const tree = renderer
    .create(
      <>
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" rowType="normal" />
        <CalendarItem date={dayjs('2020-01-01')} viewType="year" rowType="normal" />
        <CalendarItem date={dayjs('2020-01-01')} viewType="decade" rowType="normal" />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 item is label', () => {
  const tree = renderer
    .create(
      <>
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" rowType="head" isLabel />
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" rowType="normal" isLabel />
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" rowType="tail" isLabel />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 item 各种状态', () => {
  const tree = renderer
    .create(
      <>
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" status="normal" />
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" status="hovered" />
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" status="selected" />
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" status="range" />
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" status="range-hovered" />
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" status="range-start" />
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" status="range-end" />
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" status="outside" />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 item 各种状态的 disabled 情况', () => {
  const tree = renderer
    .create(
      <>
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" disabled status="normal" />
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" disabled status="selected" />
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" disabled status="range" />
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" disabled status="range-start" />
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" disabled status="range-end" />
        <CalendarItem date={dayjs('2020-01-01')} viewType="month" disabled status="outside" />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 item 各种状态的 viewType = month hide outside', () => {
  const tree = renderer
    .create(
      <CalendarItem
        date={dayjs('2020-01-01')}
        viewType="month"
        hideItemOutside="month"
        status="outside"
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
