import React from 'react';
import renderer from 'react-test-renderer';
import mockConsole from 'test/utils/mockConsole';

import { wait } from '@muya-ui/utils';
import { Dropdown, DropdownButton, Menu, MenuItem } from '@muya-ui/core';
import { cleanup, fireEvent, render } from '@testing-library/react';

describe('Dropdown', () => {
  beforeAll(() => {
    mockConsole.restoreError();
    mockConsole.mockError();
  });

  afterAll(() => {
    mockConsole.restoreError();
  });
  const onClick = jest.fn(() => {});
  const menu = (
    <Menu onClick={onClick}>
      <MenuItem data-testid="menuitem" key="1">
        1st menu item
      </MenuItem>
      <MenuItem key="2">2nd menu item</MenuItem>
      <MenuItem key="3">3rd item</MenuItem>
    </Menu>
  );

  test('DropdownButton', () => {
    const plain = renderer
      .create(
        <DropdownButton id="1" triggerId="trigger1" overlay={menu}>
          <span>Dropdown</span>
        </DropdownButton>,
      )
      .toJSON();
    expect(plain).toMatchSnapshot();
    const group = renderer
      .create(
        <DropdownButton id="2" triggerId="trigger2" visible group overlay={menu}>
          <span>Dropdown</span>
        </DropdownButton>,
      )
      .toJSON();
    expect(group).toMatchSnapshot();
  });

  test('Dropdown onClick', async () => {
    const dropdownRef = React.createRef();
    const onVisibleChange = jest.fn(() => {});
    const { getByTestId } = render(
      <Dropdown ref={dropdownRef} overlay={() => menu} onVisibleChange={onVisibleChange}>
        <span data-testid="trigger">Dropdown</span>
      </Dropdown>,
    );
    const triggerEl = getByTestId('trigger');
    fireEvent.mouseEnter(triggerEl);
    await wait.time(100);
    expect(onVisibleChange).toBeCalledTimes(1);
    const menuitemEl = getByTestId('menuitem');
    fireEvent.click(menuitemEl);
    expect(onClick).toBeCalledTimes(1);
    cleanup();
  });
});
