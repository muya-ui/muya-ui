import { mount } from 'enzyme';
import React from 'react';

import { IThemedBaseProps } from '../types';
import withTheme from './withTheme';

interface Props extends IThemedBaseProps {
  id?: string;
}

test('should get theme from defaultProps', () => {
  const Comp = React.forwardRef<any, Props>(function Comp(props, ref) {
    return <div id={props.id} className={props.theme && 'withTheme'} ref={ref}></div>;
  });
  Comp.defaultProps = { id: 'TestWithTheme' };
  const CompWithTheme = withTheme(Comp);
  const wrapper = mount(<CompWithTheme />);
  expect(
    wrapper
      .find('div')
      .getDOMNode()
      .getAttribute('id'),
  ).toBe('TestWithTheme');
  expect(
    wrapper
      .find('div')
      .getDOMNode()
      .getAttribute('class'),
  ).toBe('withTheme');
});
