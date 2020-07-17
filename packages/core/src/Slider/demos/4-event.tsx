import React from 'react';
import styled from 'styled-components';

import { RangeSlider, Slider } from '@muya-ui/core';

const Row = styled.div`
  margin-bottom: 30px;
`;

export default function BasicDemo() {
  const onSliderChange = React.useCallback((v: number) => {
    console.log('slider change', v);
  }, []);
  const onSliderAfterChange = React.useCallback((v: number) => {
    console.log('slider after change', v);
  }, []);
  const onRangeSliderChange = React.useCallback((v: [number, number]) => {
    console.log('range slider change', v);
  }, []);
  const onRangeSliderAfterChange = React.useCallback((v: [number, number]) => {
    console.log('range slider after change', v);
  }, []);
  return (
    <div>
      <Row>
        <Slider defaultValue={30} onChange={onSliderChange} onAfterChange={onSliderAfterChange} />
      </Row>
      <Row>
        <RangeSlider
          defaultValue={[20, 40]}
          onChange={onRangeSliderChange}
          onAfterChange={onRangeSliderAfterChange}
        />
      </Row>
    </div>
  );
}

export const meta = {
  title: '事件',
  desc:
    '当 `Slider` 的值发生改变时，会触发 `onChange` 事件，并把改变后的值作为参数传入。在 `onmouseup` 时，会触发 `onAfterChange` 事件，并把当前值作为参数传入。',
};
