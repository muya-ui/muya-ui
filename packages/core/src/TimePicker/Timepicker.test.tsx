import React from 'react';
import renderer from 'react-test-renderer';

import TimePicker from './TimePicker';
import TimePickerNumberList from './TimePickerNumberList';
import TimePickerPanel from './TimePickerPanel';

test('测试普通渲染', () => {
  const disabledHours = (num: number) => {
    return num > 1 && num < 10;
  };
  const disabledMinutes = (selectedHour: number) => (num: number) => {
    return selectedHour === 13 && num > 1 && num < 10;
  };

  const disabledSeconds = (selectedHour: number, selectedMinute: number) => (num: number) => {
    return selectedHour === 14 && selectedMinute === 5 && num > 1 && num < 10;
  };
  const props = {
    disabledHours,
    disabledMinutes,
    disabledSeconds,
  };
  const tree = renderer
    .create(
      <>
        <TimePicker />
        <TimePicker value="2020-01-11 11:11:11" />
        <TimePicker defaultValue="2020-01-11 11:11:11" />
        <TimePicker disabled />

        <TimePickerPanel {...props} />
        <TimePickerPanel hideDisabledOptions hourStep={2} minuteStep={5} secondStep={10} />

        <TimePickerNumberList label="sss" />
        <TimePickerNumberList label="sss" selected={10} />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
