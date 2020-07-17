import React from 'react';
import renderer from 'react-test-renderer';
import mockConsole from 'test/utils/mockConsole';

import { cleanup, fireEvent, render } from '@testing-library/react';

import { Option, OptionDivider, OptionGroup, Select } from './index';

describe('Select', () => {
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

  test('测试正常 render', () => {
    const wrapper = renderer
      .create(
        <>
          <Select
            id="test"
            styles={{ menu: { color: 'red' } }}
            defaultValue="one"
            autoFocus
            allowClear={false}
            width={120}
          >
            <OptionGroup label="分组">
              <Option value="one">选项一</Option>
              <Option value="two">选项二</Option>
            </OptionGroup>
            <OptionDivider></OptionDivider>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Select defaultValue="lucy" prefixNode="前缀：" suffixNode="后缀：">
            <Option value="lucy">Lucy</Option>
          </Select>
          <Select defaultValue="lucy" mode="multiple" disabled>
            <Option value="lucy">Lucy</Option>
          </Select>
          <Select defaultValue="lucy" mode="tags" readOnly>
            <Option value="lucy">Lucy</Option>
          </Select>
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  test('测试 ref', () => {
    const onFocus = jest.fn(() => {});
    const onBlur = jest.fn(() => {});
    const nodeRef = React.createRef<HTMLDivElement>();
    const inputRef = React.createRef<HTMLInputElement>();
    render(
      <Select ref={nodeRef} inputRef={inputRef} onFocus={onFocus} onBlur={onBlur}>
        <Option value="lucy">Lucy</Option>
      </Select>,
    );
    inputRef.current!.focus();
    expect(document.activeElement).toBe(inputRef.current);
    nodeRef.current!.blur();
    expect(document.activeElement).toBe(inputRef.current);
    inputRef.current!.blur();
    expect(document.activeElement).toBe(document.body);
  });

  test('渲染 notFoundContent', () => {
    const { rerender, container } = render(
      <Select defaultValue="one" notFoundContent={<div>无结果</div>} showSearch loading>
        <Option value="one">选项一</Option>
        <Option value="two">选项二</Option>
      </Select>,
    );
    rerender(
      <Select defaultValue="one" notFoundContent={<div>无结果</div>} showSearch>
        <Option value="one">选项一</Option>
        <Option value="two">选项二</Option>
      </Select>,
    );
    const inputEl = container.querySelector('input') as HTMLInputElement;
    fireEvent.input(inputEl, { target: { value: 'muya' } });
    rerender(
      <Select defaultValue="one" showSearch>
        <Option value="one">选项一</Option>
        <Option value="two">选项二</Option>
      </Select>,
    );
    fireEvent.input(inputEl, { target: { value: 'muya' } });
  });

  test('渲染 options', () => {
    const onPopupVisibleChange = jest.fn();
    const onSelect = jest.fn();
    const onDeselect = jest.fn();
    const { getByTestId, rerender } = render(
      <Select
        popupVisible={true}
        onSelect={onSelect}
        onDeselect={onDeselect}
        onPopupVisibleChange={onPopupVisibleChange}
      >
        <Option data-testid="one" value="one">
          选项一
        </Option>
        <Option data-testid="two" value="two">
          选项二
        </Option>
        <>
          <Option data-testid="three" value="three">
            选项三
          </Option>
          <Option data-testid="four" value="four">
            选项四
          </Option>
        </>
      </Select>,
    );
    // 单选选中
    fireEvent.click(getByTestId('one'));
    expect(onSelect).toBeCalledTimes(1);
    expect(onPopupVisibleChange).toBeCalledTimes(1);
    // 单选关闭
    fireEvent.click(getByTestId('one'));
    expect(onPopupVisibleChange).toBeCalledTimes(2);
    expect(onDeselect).toBeCalledTimes(0);
    rerender(
      <Select
        mode="tags"
        popupVisible={true}
        onSelect={onSelect}
        onDeselect={onDeselect}
        onPopupVisibleChange={onPopupVisibleChange}
      >
        <Option data-testid="one" value="one">
          选项一
        </Option>
        <Option data-testid="two" value="two">
          选项二
        </Option>
        <>
          <Option data-testid="three" value="three">
            选项三
          </Option>
          <Option data-testid="four" value="four">
            选项四
          </Option>
        </>
      </Select>,
    );
    // 多选选中
    fireEvent.click(getByTestId('three'));
    expect(onSelect).toBeCalledTimes(2);
    expect(onPopupVisibleChange).toBeCalledTimes(3);
    // 多选取消选中
    fireEvent.click(getByTestId('three'));
    expect(onPopupVisibleChange).toBeCalledTimes(4);
    expect(onDeselect).toBeCalledTimes(1);
  });
});
