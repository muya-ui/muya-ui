import React, { Ref } from 'react';

import getFunctionName from './getFunctionName';

describe('测试 getFunctionName', () => {
  test('gets the name of a function', () => {
    function SomeFunction() {
      return <div />;
    }
    const SomeOtherFunction = () => <div />;
    expect(getFunctionName(SomeFunction)).toBe('SomeFunction');
    expect(getFunctionName(SomeOtherFunction)).toBe('SomeOtherFunction');
  });
});
