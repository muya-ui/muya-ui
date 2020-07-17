import { Dayjs } from 'dayjs';
import React from 'react';
import styled from 'styled-components';

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

export default function BasicDemo() {
  return (
    <Container>
      <Panel className="panel" onChange={onChange} defaultValue="2020-1-1 20:22:22" />

      <Panel
        className="panel"
        onChange={onChange}
        format="HH:mm"
        defaultValue="2020-1-1 20:22:22"
      />

      <Panel className="panel" onChange={onChange} format="HH" defaultValue="2020-1-1 20:22:22" />
    </Container>
  );
}

export const meta = {
  title: 'dev2',
  desc: 'dev2',
};
