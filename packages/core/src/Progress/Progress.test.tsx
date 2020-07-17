import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Progress from './Progress';

test('should render correctly', () => {
  const tree = renderer
    .create(
      <>
        <Progress />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('should accept status', () => {
  const tree = renderer
    .create(
      <>
        <Progress status="success" progress={10} />
        <Progress status="error" progress={10} />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('should disable animate', () => {
  const tree = renderer.create(<Progress progress={10} animate={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('should be circle Progress', () => {
  const wrapper = mount(<Progress progress={10} type="circle" />);
  expect(wrapper.find('svg')).toHaveLength(1);
});

test('should hide text', () => {
  const wrapper = mount(
    <Progress progress={10} roundedStroke={false} type="circle" showPercentage={false} />,
  );
  expect(wrapper.find('text')).toHaveLength(0);
});
