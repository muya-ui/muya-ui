import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import { muyaThemeLight } from '@muya-ui/theme-light';

import { StyledTooltipWrapper } from './styled';
import Tooltip from './Tooltip';

test('should render correctly', () => {
  const wrapper = renderer
    .create(
      <Tooltip id="111" placement="bottom" title="hhh">
        <span>hh</span>
      </Tooltip>,
    )
    .toJSON();
  expect(wrapper).toMatchSnapshot();
});

test('should accept size', () => {
  const s = mount(<StyledTooltipWrapper $size="s" theme={muyaThemeLight}></StyledTooltipWrapper>);
  const m = mount(<StyledTooltipWrapper $size="m" theme={muyaThemeLight}></StyledTooltipWrapper>);
  expect(s).toHaveStyleRule('font-size', '12px');
  expect(m).toHaveStyleRule('font-size', '14px');
});

test('should accept className and style', () => {
  const wrapper = mount(
    <StyledTooltipWrapper
      $size="s"
      className="test"
      theme={muyaThemeLight}
      style={{ width: '100px' }}
    ></StyledTooltipWrapper>,
  );
  expect(wrapper.hasClass('test')).toBe(true);
  expect(getComputedStyle(wrapper.getDOMNode()).width).toBe('100px');
});
