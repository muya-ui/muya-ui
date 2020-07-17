import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import mockConsole from 'test/utils/mockConsole';
import { CheckboxGroup } from '../Checkbox';

import Button from '../Button';
import { ITableColumn } from './types';
import FilterPopoverCard from './FilterPopoverCard';
import { StyledFilter } from './styled';

beforeAll(() => {
  mockConsole.restoreError();
  mockConsole.mockError();
});

test('should render correctly', () => {
  const column: ITableColumn<any> = {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => b.age - a.age,
    filters: [{ text: 'Age > 20', value: 20 }],
    onFilter: (value, d) => d.age > value,
  };
  const setSelectedFilterValues = sinon.spy();
  const setFilterColumnKey = sinon.spy();
  const syncFilterColumnsList = sinon.spy();
  const tree = renderer
    .create(
      <FilterPopoverCard
        column={column}
        activeColumnKey="Age"
        selectedFilterValues={[]}
        syncFilterColumnsList={syncFilterColumnsList}
        setSelectedFilterValues={setSelectedFilterValues}
        setFilterColumnKey={setFilterColumnKey}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('filter reactive logic', async () => {
  const onFilterVisibleChange = sinon.spy();
  const onVisibleChange = sinon.spy();
  const onEntered = sinon.spy();
  const onExited = sinon.spy();
  const setSelectedFilterValues = sinon.spy();
  const onClickAway = sinon.spy();
  const setFilterColumnKey = sinon.spy();
  const syncFilterColumnsList = sinon.spy();
  const column: ITableColumn<any> = {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => b.age - a.age,
    filters: [{ text: 'Age > 20', value: 20 }],
    onFilter: (value, d) => d.age > value,
    onFilterVisibleChange,
    onFilterExited: onExited,
    onFilterEntered: onEntered,
  };
  const wrapper = mount(
    <FilterPopoverCard
      column={column}
      activeColumnKey="age"
      selectedFilterValues={[]}
      syncFilterColumnsList={syncFilterColumnsList}
      setSelectedFilterValues={setSelectedFilterValues}
      setFilterColumnKey={setFilterColumnKey}
      onClickAway={onClickAway}
      onVisibleChange={onVisibleChange}
    />,
  );

  wrapper
    .find(StyledFilter)
    .at(0)
    .simulate('click');
  expect(onFilterVisibleChange.callCount).toBe(1);
  expect(onVisibleChange.callCount).toBe(1);
  expect(onClickAway.callCount).toBe(0);

  document.documentElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  expect(onFilterVisibleChange.callCount).toBe(2);
  expect(onVisibleChange.callCount).toBe(2);
  expect(onClickAway.callCount).toBe(1);

  document.documentElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  expect(onFilterVisibleChange.callCount).toBe(2);
  expect(onVisibleChange.callCount).toBe(2);
  expect(onClickAway.callCount).toBe(2);

  wrapper
    .find(StyledFilter)
    .at(0)
    .simulate('click');
  expect(onFilterVisibleChange.callCount).toBe(3);
  wrapper
    .find(Button)
    .at(0)
    .simulate('click');
  expect(onFilterVisibleChange.callCount).toBe(4);

  wrapper
    .find(StyledFilter)
    .at(0)
    .simulate('click');
  expect(onFilterVisibleChange.callCount).toBe(5);
  wrapper
    .find(Button)
    .at(1)
    .simulate('click');
  expect(onFilterVisibleChange.callCount).toBe(6);
});

test('empty filters', async () => {
  const onVisibleChange = sinon.spy();
  const setSelectedFilterValues = sinon.spy();
  const onClickAway = sinon.spy();
  const setFilterColumnKey = sinon.spy();
  const syncFilterColumnsList = sinon.spy();
  const column: ITableColumn<any> = {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => b.age - a.age,
  };
  const wrapper = mount(
    <FilterPopoverCard
      column={column}
      activeColumnKey="age"
      selectedFilterValues={[]}
      syncFilterColumnsList={syncFilterColumnsList}
      setSelectedFilterValues={setSelectedFilterValues}
      setFilterColumnKey={setFilterColumnKey}
      onClickAway={onClickAway}
      onVisibleChange={onVisibleChange}
    />,
  );
  wrapper
    .find(StyledFilter)
    .at(0)
    .simulate('click');

  expect(wrapper.find(CheckboxGroup)).toHaveLength(0);
});

test('empty filters array', async () => {
  const onVisibleChange = sinon.spy();
  const setSelectedFilterValues = sinon.spy();
  const onClickAway = sinon.spy();
  const setFilterColumnKey = sinon.spy();
  const syncFilterColumnsList = sinon.spy();
  const column: ITableColumn<any> = {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => b.age - a.age,
    filters: [],
  };
  const wrapper = mount(
    <FilterPopoverCard
      column={column}
      activeColumnKey="age"
      selectedFilterValues={[]}
      syncFilterColumnsList={syncFilterColumnsList}
      setSelectedFilterValues={setSelectedFilterValues}
      setFilterColumnKey={setFilterColumnKey}
      onClickAway={onClickAway}
      onVisibleChange={onVisibleChange}
    />,
  );
  wrapper
    .find(StyledFilter)
    .at(0)
    .simulate('click');

  expect(wrapper.find(CheckboxGroup)).toHaveLength(0);
});

test('controlled filterVisible', async () => {
  const onVisibleChange = sinon.spy();
  const setSelectedFilterValues = sinon.spy();
  const onClickAway = sinon.spy();
  const setFilterColumnKey = sinon.spy();
  const syncFilterColumnsList = sinon.spy();
  const column: ITableColumn<any> = {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => b.age - a.age,
    filters: [{ text: 'Age > 20', value: 20 }],
    onFilter: (value, d) => d.age > value,
    filterVisible: true,
  };
  const wrapper = mount(
    <FilterPopoverCard
      column={column}
      activeColumnKey="age"
      selectedFilterValues={[]}
      syncFilterColumnsList={syncFilterColumnsList}
      setSelectedFilterValues={setSelectedFilterValues}
      setFilterColumnKey={setFilterColumnKey}
      onClickAway={onClickAway}
      onVisibleChange={onVisibleChange}
    />,
  );
  wrapper
    .find(StyledFilter)
    .at(0)
    .simulate('click');

  expect(wrapper.find(CheckboxGroup)).toHaveLength(1);
});

test('custom render', async () => {
  const onVisibleChange = sinon.spy();
  const setSelectedFilterValues = sinon.spy();
  const onClickAway = sinon.spy();
  const setFilterColumnKey = sinon.spy();
  const syncFilterColumnsList = sinon.spy();
  const column: ITableColumn<any> = {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    renderFilterActions: () => <button id="actions">confirm</button>,
    renderFilterContent: () => <div id="content"></div>,
    sorter: (a, b) => b.age - a.age,
    onFilter: (value, d) => d.age > value,
    filterVisible: true,
  };
  const wrapper = mount(
    <FilterPopoverCard
      column={column}
      activeColumnKey="age"
      selectedFilterValues={[]}
      syncFilterColumnsList={syncFilterColumnsList}
      setSelectedFilterValues={setSelectedFilterValues}
      setFilterColumnKey={setFilterColumnKey}
      onClickAway={onClickAway}
      onVisibleChange={onVisibleChange}
    />,
  );
  wrapper
    .find(StyledFilter)
    .at(0)
    .simulate('click');

  expect(wrapper.find('#content')).toHaveLength(1);
  expect(wrapper.find('#actions')).toHaveLength(1);
});
