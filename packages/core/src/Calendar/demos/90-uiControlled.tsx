import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import styled from 'styled-components';

import {
  Button,
  Calendar,
  ICalendarUIChangeEvent,
  IRangeCalendarChangeEvent,
  IRangeCalendarUIChangeEvent,
  RangeCalendar,
} from '@muya-ui/core';

const Container = styled.div`
  display: flex;
  & .calendar {
    box-shadow: 0 0 12px 0 rgba(56, 60, 66, 0.12);
    margin: 0 10px 10px 0;
  }
`;

const Col = styled.div``;

export default function UIControlledDemo() {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | undefined>();
  const [selectedRange, setSelectedRange] = React.useState<Partial<IRangeCalendarChangeEvent>>({});
  const [dateUIState, setDateUI] = React.useState<Partial<ICalendarUIChangeEvent>>({});
  const [rangeUIState, setRangeDateUI] = React.useState<Partial<IRangeCalendarUIChangeEvent>>({});
  // 受控使用，注意取消选择时，onChange 传的是 undefined
  const onDateChange = React.useCallback((date?: Dayjs) => {
    setSelectedDate(date);
  }, []);
  // UI受控使用
  const onDateUIChange = React.useCallback((e: ICalendarUIChangeEvent) => {
    setDateUI(e);
  }, []);
  const onNextMonthClick = React.useCallback(() => {
    const date = dayjs().add(1, 'M');
    setSelectedDate(date);
    setDateUI({
      viewDate: date,
    });
  }, []);

  const onRangeChange = React.useCallback((newState: IRangeCalendarChangeEvent) => {
    // 需要注意的是：
    // newState.start 表示选中的开始时间
    // newState.end 表示选中的结束时间
    // newState.range 表示选中的范围
    // 当 newState.start 和 newState.end 同时存在的时候，则表示选中
    // 注意 newState.start 不表示你第一次选中的日期，因为你第一次点击选中，可能是起点，也可能是终点
    setSelectedRange(newState);
  }, []);
  // UI受控使用
  const onRangeUIChange = React.useCallback((e: IRangeCalendarUIChangeEvent) => {
    setRangeDateUI(e);
  }, []);
  const onNextTwoMonthClick = React.useCallback(() => {
    const start = dayjs().add(2, 'M');
    const end = start.add(7, 'd');

    setSelectedRange({
      start,
      end,
      range: [start, end],
    });
    setRangeDateUI({
      viewDate: [start, dayjs().add(3, 'M')],
    });
  }, []);

  return (
    <Container>
      <Col>
        <Calendar
          className="calendar"
          onChange={onDateChange}
          onUIChange={onDateUIChange}
          selectedDate={selectedDate}
          {...dateUIState}
        />
        <Button onClick={onNextMonthClick}>下个月的今天</Button>
      </Col>
      <Col>
        <RangeCalendar
          className="calendar"
          start={selectedRange.start}
          end={selectedRange.end}
          range={selectedRange.range}
          onChange={onRangeChange}
          onUIChange={onRangeUIChange}
          {...rangeUIState}
        />
        <Button onClick={onNextTwoMonthClick}>往后两个月，并选7天</Button>
      </Col>
    </Container>
  );
}

export const meta = {
  title: 'UI受控',
  desc: '在一些特殊情况下，如需要UI受控，可以参考当前案例',
};
