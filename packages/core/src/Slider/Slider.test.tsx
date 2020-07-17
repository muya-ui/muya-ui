import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import Slider, { RangeSlider, useSlider } from './Slider';

test('测试 Slider', () => {
  const tree = renderer
    .create(
      <>
        <Slider />
        <Slider defaultValue={10} />
        <Slider value={10} />
        <Slider step={10} />
        <Slider step={10} markLabelDisabled />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('useSlider', () => {
  const onChange = sinon.spy();
  const onAfterChange = sinon.spy();
  const { result } = renderHook(() =>
    useSlider({
      onChange,
      onAfterChange,
    }),
  );
  result.current.handleChange([0, 10]);
  result.current.handleAfterChange([0, 10]);

  expect(() => {
    sinon.assert.calledWith(onChange, 10);
    sinon.assert.calledWith(onAfterChange, 10);
  }).not.toThrow();
});

test('测试 RangeSlider', () => {
  const tree = renderer
    .create(
      <>
        <RangeSlider />
        <RangeSlider defaultValue={[10, 12]} />
        <RangeSlider defaultValue={[18, 12]} />
        <RangeSlider value={[10, 20]} />
        <RangeSlider step={10} />
        <RangeSlider step={10} markLabelDisabled />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
