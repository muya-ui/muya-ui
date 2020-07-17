import React from 'react';
import renderer from 'react-test-renderer';
import mockConsole from 'test/utils/mockConsole';

import { cleanup, fireEvent, render } from '@testing-library/react';

import RangeInput from './RangeInput';
import { IRangeInputElement } from './types';

describe('RangeInput', () => {
  beforeAll(() => {
    mockConsole.restoreError();
    mockConsole.mockError();
  });

  afterAll(() => {
    mockConsole.restoreError();
  });

  afterEach(() => {
    cleanup();
  });

  test('should render correctly', () => {
    const tree = renderer
      .create(
        <>
          <RangeInput />
          <RangeInput disabled />
          <RangeInput value={['ss', 'sss']} />
          <RangeInput defaultValue={['ss', 'ss']} />
          <RangeInput middleNode="to" prefixNode="s" suffixNode="ss" />
          <RangeInput
            middleNode={['ss', '', 'ss']}
            prefixNode={['ss', '', 'ss']}
            suffixNode={['ss', '', 'ss']}
          />
        </>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('ref correctly', () => {
    const inputRef = React.createRef<IRangeInputElement>();
    const { container } = render(<RangeInput ref={inputRef} />);
    inputRef.current!.focus(0);
    const [leftInput, rightInput] = container.querySelectorAll('input');
    expect(document.activeElement).toBe(leftInput);
    inputRef.current!.blur(0);
    expect(document.activeElement).toBe(document.body);
    inputRef.current!.focus(1);
    expect(document.activeElement).toBe(rightInput);
    inputRef.current!.blur(1);
    expect(document.activeElement).toBe(document.body);
  });

  test('allowClear', () => {
    const { container } = render(<RangeInput defaultValue={['left', 'right']} allowClear />);
    const inputWrapper = container.firstElementChild;
    fireEvent.mouseEnter(inputWrapper!);
    const clearIconWrapper = container.querySelector(`[class*='ClearIconWrapper']`);
    fireEvent.click(clearIconWrapper!);
    const [leftInput, rightInput] = container.querySelectorAll('input');
    expect(leftInput.getAttribute('value')).toBe('');
    expect(rightInput.getAttribute('value')).toBe('');
  });
});
