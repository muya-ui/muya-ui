import dayjs, { ConfigType, Dayjs } from 'dayjs';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useEventCallback } from '@muya-ui/utils';
import {
  Button,
  DatePicker,
  ICalendarSelectType,
  ISelectValueType,
  Option,
  RangeDatePicker,
  Select,
  Typography,
} from '@muya-ui/core';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
`;

const PlaceholderMap: Record<ICalendarSelectType, string> = {
  date: '选择日期',
  month: '选择月份',
  year: '选择年',
};

const RangePlaceholderMap: Record<ICalendarSelectType, [string, string]> = {
  date: ['开始时间', '结束时间'],
  month: ['开始月份', '结束月份'],
  year: ['开始年份', '结束年份'],
};

export default function BasicDemo() {
  const [disabled, setDisabled] = useState(false);
  const [date, setDate] = useState<ConfigType>('');
  const [selectedRange, setSelectedRange] = useState<[Dayjs, Dayjs]>([dayjs(''), dayjs('')]);
  const [selectType, setType] = useState<ICalendarSelectType>('date');
  const onTypeChange = useEventCallback((value: ISelectValueType) => {
    setType(value as ICalendarSelectType);
  });

  const onChange = useEventCallback((date: Dayjs) => {
    setDate(date);
  });

  const onRangeChange = useEventCallback((range: [Dayjs, Dayjs]) => {
    setSelectedRange(range);
  });
  return (
    <div>
      <Container>
        <Typography.Text>切换日历类型：</Typography.Text>
        <Select width={100} defaultValue="date" onChange={onTypeChange}>
          <Option value="date">日期选择</Option>
          <Option value="month">月份选择</Option>
          <Option value="year">年选择</Option>
        </Select>
      </Container>
      <Container>
        <DatePicker
          selectType={selectType}
          disabled={disabled}
          placeholder={PlaceholderMap[selectType]}
          value={date}
          onChange={onChange}
        />
      </Container>
      <Container>
        <RangeDatePicker
          disabled={disabled}
          placeholder={RangePlaceholderMap[selectType]}
          selectType={selectType}
          value={selectedRange}
          onChange={onRangeChange}
        />
      </Container>
      <Container>
        <Button onClick={() => setDisabled(!disabled)}>{disabled ? '取消禁用' : '禁用日期'}</Button>
      </Container>

      <div>
        {selectedRange[0].isValid() && (
          <Typography.Text>
            选择的开始时间为：{selectedRange[0].format('YYYY-MM-DD HH:mm:ss SSS')}
          </Typography.Text>
        )}
      </div>
      <div>
        {selectedRange[1].isValid() && (
          <Typography.Text>
            选择的结束时间为：{selectedRange[1].format('YYYY-MM-DD HH:mm:ss SSS')}
          </Typography.Text>
        )}
      </div>
    </div>
  );
}

export const meta = {
  title: '日历基础用法',
  desc: '日历基础用法',
};
