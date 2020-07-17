import React from 'react';
import styled from 'styled-components';

import { ISliderProps, Slider, Typography } from '@muya-ui/core';

const Row = styled.div`
  margin: 10px 0 20px;
`;

export default function StepDemo() {
  const marks = React.useMemo(() => {
    const map: ISliderProps['marks'] = {};
    let i = 10;
    while (i <= 40) {
      map[i] = i;
      i += 5;
    }
    return map;
  }, []);
  return (
    <div>
      <Typography.Title level={5}>step=1</Typography.Title>
      <Row>
        <Slider defaultValue={20} step={1} min={10} max={40} tooltipVisible />
      </Row>
      <Typography.Title level={5}>使用刻度，靠近刻度自动吸附</Typography.Title>
      <Row>
        <Slider defaultValue={20} marks={marks} min={10} max={40} tooltipVisible />
      </Row>
      <Typography.Title level={5}>使用刻度，并只能移动到刻度上</Typography.Title>
      <Row>
        <Slider defaultValue={20} marks={marks} marksOnly min={10} max={40} tooltipVisible />
      </Row>
      <Typography.Title level={5}>使用刻度，隐藏刻度Label</Typography.Title>
      <Row>
        <Slider
          defaultValue={20}
          marks={marks}
          markLabelDisabled
          min={10}
          max={40}
          tooltipVisible
        />
      </Row>
    </div>
  );
}

export const meta = {
  title: '设置刻度或者步进',
  desc: '使用刻度，或者步进，需要注意的是：设置了 `step` 的时候，`marks` 将不会生效',
};
