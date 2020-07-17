import { mount } from 'enzyme';
import React, { useState } from 'react';

import useEventCallback from './useEventCallback';

describe('useEventCallback', () => {
  function createFixture(runInRendering: boolean) {
    return function() {
      const [text, updateText] = useState('');
      const callback = useEventCallback(() => {
        const currentText = text;
        return currentText;
      }, [text]);
      if (runInRendering) {
        callback();
      }
      return (
        <>
          <input value={text} onChange={e => updateText(e.target.value)} />
          <span>{text}</span>
          <button onClick={callback}>click me</button>
        </>
      );
    };
  }

  test('should trigger handle callback', () => {
    const Fixture = createFixture(false);
    const fixtureNode = <Fixture />;
    const wrapper = mount(fixtureNode);
    const input = wrapper.find('input');
    const button = wrapper.find('button');
    const span = wrapper.find('span');
    const callback = button.props().onClick;
    input.simulate('change', { target: { value: 'Hello' } });
    expect(button.props().onClick).toBe(callback);
    button.simulate('click', {});
    expect(span.text()).toEqual('Hello');
  });

  test('trigger handle callback when rendering', () => {
    const Fixture = createFixture(true);
    const fixtureNode = <Fixture />;
    mount(fixtureNode);
  });
});
