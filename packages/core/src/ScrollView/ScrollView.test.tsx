import React from 'react';
import renderer from 'react-test-renderer';

import ScrollView from './ScrollView';

test('测试设置按钮 width', () => {
  const tree = renderer
    .create(
      <>
        <ScrollView width={200} height={200}>
          Test
        </ScrollView>
        <ScrollView width="80%" scrollX>
          Test
        </ScrollView>
        <ScrollView size="l" scrollX>
          Test
        </ScrollView>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
