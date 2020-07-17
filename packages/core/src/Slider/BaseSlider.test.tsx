import React from 'react';
import renderer from 'react-test-renderer';

import BaseSlider from './BaseSlider';

test('测试普通渲染', () => {
  const tree = renderer
    .create(
      <>
        <BaseSlider />
        <BaseSlider step={10} />
        <BaseSlider tooltipVisible />
        <BaseSlider
          marks={{
            10: 'sss',
          }}
        />
        <BaseSlider
          marks={{
            10: {
              style: {
                color: 'red',
              },
              label: '1100',
            },
          }}
        />
        <BaseSlider
          value={[0, 20]}
          styles={{
            markLabel: {
              color: 'blue',
            },
            startCircle: {
              color: 'blue',
            },
            endCircle: {
              color: 'blue',
            },
            markPointInclude: {
              color: 'blue',
            },
            markPoint: {
              color: 'blue',
            },
          }}
          marks={{
            10: {
              style: {
                color: 'red',
              },
              label: '1100',
            },
            30: {
              style: {
                color: 'red',
              },
              label: '1100',
            },
          }}
        />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 disabled', () => {
  const tree = renderer.create(<BaseSlider disabled />).toJSON();
  expect(tree).toMatchSnapshot();
});
