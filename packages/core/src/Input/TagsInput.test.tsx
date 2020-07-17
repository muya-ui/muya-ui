import React from 'react';
import renderer from 'react-test-renderer';

import { fireEvent, render } from '@testing-library/react';

import TagsInput from './TagsInput';

describe('TagsInput', () => {
  test('should render correctly', () => {
    const tree = renderer
      .create(
        <>
          <TagsInput />
          <TagsInput disabled />
          <TagsInput inputValue="" value={['ss', 'sss']} />
          <TagsInput defaultInputValue="" defaultValue={['ss', 'sss']} />
          <TagsInput
            getTagText={value => `label: ${value}`}
            defaultInputValue=""
            defaultValue={['ss', 'sss']}
          />
          <TagsInput suffixNode="ss" />
        </>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('allowClear', () => {
    const { container } = render(
      <TagsInput
        defaultValue={[
          {
            label: 'tag1',
            value: 1,
          },
          {
            label: 'tag2',
            value: 2,
          },
        ]}
        allowClear
      />,
    );
    const inputWrapper = container.firstElementChild;
    fireEvent.mouseEnter(inputWrapper!);
    const input = container.querySelector('input');
    fireEvent.input(input!, { target: { value: '123' } });
    expect(input!.getAttribute('value')).toBe('123');
    const clearIconWrapper = container.querySelector(`[class*='ClearIconWrapper']`);
    fireEvent.click(clearIconWrapper!);
    expect(input!.getAttribute('value')).toBe('');
  });
});
