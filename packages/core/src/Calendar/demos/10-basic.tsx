import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useEventCallback } from '@muya-ui/utils';
import {
  Calendar,
  ICalendarSelectType,
  IRadioGroupOption,
  IRadioGroupValue,
  IRangeCalendarChangeEvent,
  ISelectValueType,
  Option,
  RadioGroup,
  RangeCalendar,
  Select,
  Typography,
} from '@muya-ui/core';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  & .calendar {
    box-shadow: 0 0 12px 0 rgba(56, 60, 66, 0.12);
    margin-right: 10px;
  }

  & .select {
    margin-right: 10px;
  }
`;

export default function BasicDemo() {
  const [selectType, setType] = useState<ICalendarSelectType>('date');
  const onTypeChange = useEventCallback((value: ISelectValueType) => {
    setType(value as ICalendarSelectType);
  });
  const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>();
  const [selectedRange, setSelectedRange] = useState<IRangeCalendarChangeEvent>({});
  // 受控使用，注意取消选择时，onChange 传的是 undefined
  const onDateChange = useEventCallback((date?: Dayjs) => {
    setSelectedDate(date);
  });
  const onRangeChange = useEventCallback((newState: IRangeCalendarChangeEvent) => {
    // 需要注意的是：
    // newState.start 表示选中的开始时间
    // newState.end 表示选中的结束时间
    // newState.range 表示选中的范围
    // 当 newState.start 和 newState.end 同时存在的时候，则表示选中
    // 注意 newState.start 不表示你第一次选中的日期，因为你第一次点击选中，可能是起点，也可能是终点
    setSelectedRange(newState);
  });

  const [hideItemOutside, setHideItemOutside] = useState<'month' | undefined>();
  const showOptions: IRadioGroupOption[] = React.useMemo(
    () => [
      {
        label: '默认',
        value: 1,
      },
      {
        label: '不显示非当前月日期',
        value: 2,
      },
    ],
    [],
  );
  const onRadioChange = (checkedValue: IRadioGroupValue) => {
    if (checkedValue === 2) {
      setHideItemOutside('month');
    } else {
      setHideItemOutside(undefined);
    }
  };

  return (
    <>
      <Container>
        <Typography.Text>切换日历类型：</Typography.Text>
        <Select className="select" width={100} defaultValue="date" onChange={onTypeChange}>
          <Option value="date">日期选择</Option>
          <Option value="month">月份选择</Option>
          <Option value="year">年选择</Option>
        </Select>
        <RadioGroup defaultValue={1} options={showOptions} onChange={onRadioChange} />
      </Container>
      <Container>
        <Calendar
          className="calendar"
          selectType={selectType}
          onChange={onDateChange}
          selectedDate={selectedDate}
          hideItemOutside={hideItemOutside}
          options={[{ label: '今天' }]}
        />
        <RangeCalendar
          className="calendar"
          selectType={selectType}
          disableRange={['2019-12-31', '2020-01-09']}
          options={[{ label: '今后三天', range: () => [dayjs(), dayjs().add(3, 'day')] }]}
          hideItemOutside={hideItemOutside}
          start={selectedRange.start}
          end={selectedRange.end}
          range={selectedRange.range}
          onChange={onRangeChange}
        />
      </Container>
      <div>
        {selectedDate && (
          <Typography.Text>当前选中了：{selectedDate.format('YYYY-MM-DD')}</Typography.Text>
        )}
      </div>
      <div>
        {selectedRange.start && (
          <Typography.Text>
            选择的开始时间为：{selectedRange.start.format('YYYY-MM-DD HH:mm:ss SSS')}
          </Typography.Text>
        )}
      </div>
      <div>
        {selectedRange.end && (
          <Typography.Text>
            选择的结束时间为：{selectedRange.end.format('YYYY-MM-DD HH:mm:ss SSS')}
          </Typography.Text>
        )}
      </div>
    </>
  );
}

export const meta = {
  title: '日历基础用法',
  desc: '日历基础用法',
};
