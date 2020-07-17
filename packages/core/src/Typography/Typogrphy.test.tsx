import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import P from './Paragraph';
import Text from './Text';
import Title from './Title';
import { getFontStyle } from './mixin';
import { muyaThemeLight } from '@muya-ui/theme-light';

test('should render correctly', () => {
  const wrapper = renderer.create(<Text>Test</Text>).toJSON();
  expect(wrapper).toMatchSnapshot();
});

test('should ellipsis', () => {
  const wrapper = mount(
    <Text ellipsis style={{ width: '1px' }}>
      TestTestTestTestTest
    </Text>,
  );
  const wrapperEllipsis = mount(<Text ellipsis={{ rows: 4 }} />);
  const wrapperEllipsis1 = mount(<Text ellipsis={{ rows: 0 }} />);
  expect(wrapper).toHaveStyleRule('text-overflow', 'ellipsis');
  expect(wrapperEllipsis).toHaveStyleRule('-webkit-line-clamp', '4');
  expect(wrapperEllipsis1).toHaveStyleRule('-webkit-line-clamp', '3');
});

test('should be strong', () => {
  const wrapper = mount(<Text strong>TestTestTestTestTest</Text>);
  const wrapperP = mount(<P strong>TestTestTestTestTest</P>);
  const wrapperTitle = mount(<Title strong>TestTestTestTestTest</Title>);
  expect(wrapper).toHaveStyleRule('font-weight', '600');
  expect(wrapperP).toHaveStyleRule('font-weight', '600');
  expect(wrapperTitle).toHaveStyleRule('font-weight', '600');
});

test('should be delete', () => {
  const wrapper = mount(<Text delete>TestTestTestTestTest</Text>);
  expect(wrapper).toHaveStyleRule('text-decoration', 'line-through');
});

test('should be underline', () => {
  const wrapper = mount(
    <Text underline ellipsis>
      TestTestTestTestTest
    </Text>,
  );
  expect(wrapper).toHaveStyleRule('text-decoration', 'underline');
});

test('should accept color and fontSize', () => {
  const wrapper = renderer
    .create(
      <Text strong color="assistant" fontSize="s6">
        TestTestTestTestTest
      </Text>,
    )
    .toJSON();
  const wrapperP = renderer
    .create(
      <P strong color="secondary" fontSize="s3">
        TestTestTestTestTest
      </P>,
    )
    .toJSON();
  expect(wrapper).toMatchSnapshot();
  expect(wrapperP).toMatchSnapshot();
});

test('getFontStyle should return correctly', () => {
  const res1 = getFontStyle(
    {
      lineHeight: '200px',
    },
    muyaThemeLight,
  );
  expect(res1.lineHeight).toBe('200px');
  expect(res1.fontSize).toBe(`${muyaThemeLight.typography.spec.fontSize.s1}px`);

  const res2 = getFontStyle({}, muyaThemeLight);
  expect(res2.lineHeight).toBe(`${muyaThemeLight.typography.spec.lineHeight.s1}px`);
  expect(res2.fontSize).toBe(`${muyaThemeLight.typography.spec.fontSize.s1}px`);

  const res3 = getFontStyle(
    {
      fontSize: 's2',
    },
    muyaThemeLight,
  );
  expect(res3.lineHeight).toBe(`${muyaThemeLight.typography.spec.lineHeight.s2}px`);
  expect(res3.fontSize).toBe(`${muyaThemeLight.typography.spec.fontSize.s2}px`);

  const res4 = getFontStyle(
    {
      fontSize: 's2',
      lineHeight: '200px',
    },
    muyaThemeLight,
  );
  expect(res4.fontSize).toBe(`${muyaThemeLight.typography.spec.fontSize.s2}px`);
  expect(res4.lineHeight).toBe('200px');

  const res5 = getFontStyle(
    {
      fontSize: 's3',
      lineHeight: 1.1,
    },
    muyaThemeLight,
  );
  expect(res5.lineHeight).toBe(1.1);
  expect(res5.fontSize).toBe(`${muyaThemeLight.typography.spec.fontSize.s3}px`);

  const res6 = getFontStyle(
    {
      fontSize: 20,
    },
    muyaThemeLight,
  );
  expect(res6.lineHeight).toBe(muyaThemeLight.typography.spec.global.lineHeight);
  expect(res6.fontSize).toBe('20px');

  const res7 = getFontStyle(
    {
      fontSize: 20,
      lineHeight: '28px',
    },
    muyaThemeLight,
  );
  expect(res7.fontSize).toBe('20px');
  expect(res7.lineHeight).toBe('28px');
});
