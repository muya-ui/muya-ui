import { Dayjs } from 'dayjs';
import React from 'react';
import styled from 'styled-components';

import { fr_FR, LocaleProvider } from '@muya-ui/core';

import Panel from '../TimePickerPanel';

const Container = styled.div`
  background-color: #ccc;
  padding: 20px;
  display: flex;

  & .panel {
    margin-right: 10px;
  }
`;

const onChange = (date: Dayjs) => {
  console.log(date.format('HH:mm:ss'));
};

const disabledHours = (num: number) => {
  return num > 1 && num < 10;
};
const disabledMinutes = (selectedHour: number) => (num: number) => {
  return selectedHour === 13 && num > 1 && num < 10;
};

const disabledSeconds = (selectedHour: number, selectedMinute: number) => (num: number) => {
  return selectedHour === 14 && selectedMinute === 5 && num > 1 && num < 10;
};

export default function BasicDemo() {
  return (
    <LocaleProvider locale={fr_FR}>
      <Container>
        <Panel
          className="panel"
          onChange={onChange}
          hourStep={2}
          minuteStep={10}
          secondStep={10}
          defaultValue="2020-1-1 20:22:22"
        />

        <Panel className="panel" onChange={onChange} hourStep={2} secondStep={10} />

        <Panel
          className="panel"
          onChange={onChange}
          disabledHours={disabledHours}
          disabledMinutes={disabledMinutes}
          disabledSeconds={disabledSeconds}
        />
      </Container>
    </LocaleProvider>
  );
}

export const meta = {
  title: 'dev1',
  desc: 'dev1',
};
