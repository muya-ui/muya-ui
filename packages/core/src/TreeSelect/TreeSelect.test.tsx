import React from 'react';
import renderer from 'react-test-renderer';

import muyaThemeLight from '@muya-ui/theme-light';

import { TreeSelect } from './index';
import { StyledTreePopup } from './styled';

const treeData = [
  {
    title: '成组条目#0',
    key: '0-0',
    children: [
      {
        title: '成组条目#0#0',
        key: '0-0-0',
        disabled: true,
        children: [
          { title: '普通条目#0#0#0', key: '0-0-0-0' },
          { title: '普通条目#0#0#1', key: '0-0-0-1' },
          { title: '普通条目#0#0#2', key: '0-0-0-2' },
        ],
      },
      {
        title: '成组条目#0#1',
        key: '0-0-1',
        children: [
          { title: '普通条目#0#1#0', key: '0-0-1-0' },
          { title: '普通条目#0#1#1', key: '0-0-1-1' },
          { title: '普通条目#0#1#2', key: '0-0-1-2' },
        ],
      },
      {
        title: '成组条目#0#2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '成组条目#1',
    key: '0-1',
    children: [
      { title: '普通条目#1#0#0', key: '0-1-0-0' },
      { title: '普通条目#1#0#1', key: '0-1-0-1' },
      { title: '普通条目#1#0#2', key: '0-1-0-2' },
    ],
  },
  {
    title: '成组条目#2',
    key: '0-2',
  },
];

describe('TreeSelect', () => {
  test('测试正常 render', () => {
    const wrapper = renderer
      .create(
        <>
          <TreeSelect id="1" triggerId="1" popupVisible treeData={treeData}></TreeSelect>
          <TreeSelect
            id="2"
            triggerId="2"
            popupVisible
            treeCheckable
            treeData={treeData}
          ></TreeSelect>
          <TreeSelect treeData={[]}></TreeSelect>
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  test('测试 empty render', () => {
    const wrapper = renderer
      .create(<StyledTreePopup theme={muyaThemeLight} $showEmptyView={true} $width={240} />)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
