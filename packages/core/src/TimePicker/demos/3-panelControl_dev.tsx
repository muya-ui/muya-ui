import dayjs, { ConfigType, Dayjs } from 'dayjs';
import React from 'react';
import styled from 'styled-components';

import { Button } from '@muya-ui/core';

import Panel from '../TimePickerPanel';

const Container = styled.div`
  background-color: #ccc;
  padding: 20px;
  display: flex;

  & .panel {
    margin-right: 10px;
  }
`;

export default function BasicDemo() {
  const [value, setValue] = React.useState<ConfigType>(dayjs(''));
  const onChange = React.useCallback((v: Dayjs) => {
    setValue(v);
  }, []);
  const onClear = React.useCallback(() => {
    setValue('');
  }, []);
  return (
    <Container>
      <Panel className="panel" value={value} onChange={onChange} />
      <div>
        <Button type="primary" onClick={onClear}>
          清空
        </Button>
      </div>
    </Container>
  );
}

export const meta = {
  title: 'dev3',
  desc: 'dev3',
};
