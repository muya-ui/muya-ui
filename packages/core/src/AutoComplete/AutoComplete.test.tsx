import React from 'react';
import renderer from 'react-test-renderer';
import mockConsole from 'test/utils/mockConsole';

import { render } from '@testing-library/react';

import MenuItem from '../BaseMenu/MenuItem';
import Input from '../Input';
import { Option } from '../Select';
import { AutoComplete, AutoCompleteItem } from './index';

describe('AutoComplete', () => {
  beforeAll(() => {
    mockConsole.restoreError();
    mockConsole.mockError();
  });

  afterAll(() => {
    mockConsole.restoreError();
  });

  test('测试正常 render', () => {
    const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
    const wrapper = renderer
      .create(
        <>
          <AutoComplete
            id="1"
            triggerId="trigger1"
            width={200}
            popupVisible
            dataSource={dataSource}
            placeholder="try to type `b`"
          />
          <AutoComplete
            id="2"
            triggerId="trigger2"
            width={200}
            popupVisible
            dataSource={dataSource}
            placeholder="try to type `b`"
          >
            <Input multiline />
          </AutoComplete>
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  test('测试 item 渲染', () => {
    const dataSource = [
      {
        primary: 'Burns Bay Road',
        secondary: '共 2 个结果',
      },
      {
        primary: 'Downing Street',
        secondary: '共 2 个结果',
      },
      {
        primary: 'Wall Street',
        secondary: '共 2 个结果',
      },
    ];
    const wrapper = renderer
      .create(
        <>
          {dataSource.map(item => (
            <MenuItem key={item.primary} size="m">
              <AutoCompleteItem primary={item.primary} secondary={item.secondary} />
            </MenuItem>
          ))}
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  test('测试 ref', () => {
    const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
    const nodeRef = React.createRef<HTMLInputElement>();
    render(
      <AutoComplete
        ref={nodeRef}
        width={200}
        dataSource={dataSource}
        placeholder="try to type `b`"
        filterOption={(inputValue, option) =>
          `${option.value}`.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      >
        <Input />
      </AutoComplete>,
    );
    nodeRef.current!.focus();
  });

  test('测试 renderOptions', () => {
    const { rerender } = render(
      <AutoComplete width={200}>
        <Option value="1">1</Option>
      </AutoComplete>,
    );
    rerender(<AutoComplete width={200} dataSource={[{ value: '1', label: '1' }]} />);
  });
});
