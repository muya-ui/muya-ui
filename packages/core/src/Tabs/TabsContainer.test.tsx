import React from 'react';
import renderer from 'react-test-renderer';
import mockHook from 'test/utils/mockHook';

import TabsContainer from './TabsContainer';
import * as useTabsContainer from './useTabsContainer';

test('测试 TabsContainer', () => {
  mockHook(useTabsContainer).returns({
    hasNext: true,
    hasPrev: true,
    stepIndex: 0,
  });
  const tree = renderer
    .create(
      <>
        <TabsContainer type="line"></TabsContainer>
        <TabsContainer type="card" size="l"></TabsContainer>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 TabsContainer swipe=true', () => {
  mockHook(useTabsContainer).returns({
    hasNext: true,
    hasPrev: true,
    stepIndex: 1,
  });
  const tree = renderer
    .create(
      <>
        <TabsContainer type="line" swipe></TabsContainer>
        <TabsContainer type="card" size="l" swipe></TabsContainer>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
