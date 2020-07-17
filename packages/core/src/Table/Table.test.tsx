import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import mockConsole from 'test/utils/mockConsole';

import Button, { InlineButton } from '../Button';
import Checkbox, { CheckboxGroup } from '../Checkbox';
import { RadioGroup } from '../Radio';
import Spin from '../Spin';
import Typography from '../Typography';
import Table, { ITableColumn } from './';
import {
  StyledFilterWrapper,
  StyledTableWrapper,
  StyledFilter,
  StyledHeader,
  StyledHeaderContent,
  StyledExpandButton,
} from './styled';

beforeAll(() => {
  mockConsole.restoreError();
  mockConsole.mockError();
});

interface TableData {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  description: string;
}

const data: TableData[] = [
  {
    key: 1,
    name: 'John1',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Joe Black20',
    age: 20,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
  {
    key: 4,
    name: 'Joe Black1',
    age: 42,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
  {
    key: 5,
    name: 'Joe Black',
    age: 11,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];

const columns: ITableColumn<TableData>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    footer: 'Summary',
    // sorter: (a, b) => b.name.length - a.name.length,
    // sortDirections: ['descend', 'ascend'],
    filters: [{ text: 'Black', value: '1' }],
    filterMultiple: false,
    onFilter: (v, d) => d.name.includes(v as string),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    footer: data.reduce((p, c) => p + c.age, 0),
    sorter: (a, b) => b.age - a.age,
    filters: [{ text: 'Age > 20', value: 20 }],
    onFilter: (value, d) => d.age > value,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    filters: [{ text: 'London', value: 'London' }],
  },
  {
    title: 'Action',
    key: 'x',
    render: () => <InlineButton type="danger">Delete</InlineButton>,
  },
];

test('should render correctly', () => {
  const tree = renderer.create(<Table columns={columns} dataSource={data} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('test different type table', () => {
  const stripeTree = renderer.create(<Table stripe columns={columns} dataSource={data} />).toJSON();
  const borderedTree = renderer
    .create(<Table bordered columns={columns} dataSource={data} />)
    .toJSON();
  const fixTree = renderer
    .create(<Table fixedHeader fixedFooter columns={columns} dataSource={data} />)
    .toJSON();
  expect(stripeTree).toMatchSnapshot();
  expect(borderedTree).toMatchSnapshot();
  expect(fixTree).toMatchSnapshot();
});

test('expandable table render', () => {
  const expandableTree = renderer
    .create(
      <Table
        expandable={{
          defaultExpandAllRows: true,
          expandedRowRender(record) {
            return <p>{record.description}</p>;
          },
          rowExpandable(record) {
            return record.key !== 1;
          },
        }}
        columns={columns}
        dataSource={data}
      />,
    )
    .toJSON();
  expect(expandableTree).toMatchSnapshot();
});

test('expandable tree table render', () => {
  const treeData = data.map((d, index) => {
    if (index === 0) {
      return {
        ...d,
        children: [
          {
            key: 99,
            name: 'John99',
            age: 32,
            address: 'New York No. 1 Lake Park',
            description:
              'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
            children: [
              {
                key: 98,
                name: 'John98',
                age: 32,
                address: 'New York No. 1 Lake Park',
                description:
                  'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
              },
            ],
          },
        ],
      };
    }
    return d;
  });
  const expandableTree = renderer
    .create(
      <Table
        expandable={{
          defaultExpandAllRows: true,
          expandedRowRender(record) {
            return <p>{record.description}</p>;
          },
          rowExpandable(record) {
            return record.key !== 1;
          },
        }}
        columns={columns}
        dataSource={treeData}
      />,
    )
    .toJSON();
  expect(expandableTree).toMatchSnapshot();
});

test('expandable interactive', () => {
  const onExpandedRowsChange = sinon.spy();
  const onExpand = sinon.spy();
  const wrapper = mount(
    <Table
      expandable={{
        defaultExpandedRowKeys: [2],
        expandedRowRender(record) {
          return <p>{record.description}</p>;
        },
        onExpand,
        onExpandedRowsChange,
      }}
      columns={columns}
      dataSource={data}
    />,
  );
  wrapper
    .find(StyledExpandButton)
    .at(0)
    .simulate('click');
  expect(onExpand.calledOnce).toBe(true);
  expect(onExpand.calledOnceWith(true)).toBe(true);
  expect(onExpandedRowsChange.calledOnce).toBe(true);

  wrapper
    .find(StyledExpandButton)
    .at(0)
    .simulate('click');
  expect(onExpand.calledTwice).toBe(true);
  expect(onExpandedRowsChange.calledTwice).toBe(true);
});

test('sort table', () => {
  const onChange = sinon.spy();
  const descendTree = renderer
    .create(
      <Table
        defaultTableState={{
          sortOrder: 'descend',
          sortColumnKey: 'age',
        }}
        columns={columns}
        dataSource={data}
      />,
    )
    .toJSON();
  const ascendTree = renderer
    .create(
      <Table
        defaultTableState={{
          sortOrder: 'ascend',
          sortColumnKey: 'age',
        }}
        columns={columns}
        dataSource={data}
      />,
    )
    .toJSON();
  const wrapper = mount(
    <Table
      defaultTableState={{
        sortOrder: 'descend',
        sortColumnKey: 'age',
      }}
      columns={columns}
      dataSource={data}
      onChange={onChange}
    />,
  );
  wrapper
    .find(StyledHeaderContent)
    .at(1)
    .simulate('click');
  wrapper
    .find(StyledHeaderContent)
    .at(1)
    .simulate('click');
  wrapper
    .find(StyledHeaderContent)
    .at(1)
    .simulate('click');
  expect(descendTree).toMatchSnapshot();
  expect(ascendTree).toMatchSnapshot();
});

test('filter table', () => {
  const handleChange = sinon.spy();
  const wrapper = mount(
    <Table
      defaultTableState={{
        filterColumnKey: 'age',
        filterColumnList: [
          {
            key: 'age',
            filterValues: [],
            selectedFilterValues: [],
          },
          {
            key: 'address',
            filterValues: [],
            selectedFilterValues: [],
          },
        ],
      }}
      onChange={handleChange}
      columns={columns}
      dataSource={data}
    />,
  );
  wrapper
    .find(StyledFilter)
    .at(0)
    .simulate('click');
  expect(handleChange.calledOnce).toBe(true);
  const onRadioChange = wrapper.find(RadioGroup).prop('onChange') as any;
  onRadioChange('John1');
  wrapper
    .find(StyledFilter)
    .at(1)
    .simulate('click');
  expect(handleChange.calledTwice).toBe(true);

  const onChange = wrapper.find(CheckboxGroup).prop('onChange') as any;
  onChange([20] as any);
  wrapper
    .find(Button)
    .at(0)
    .simulate('click'); // reset
  wrapper
    .find(StyledHeaderContent)
    .at(0)
    .simulate('click');
  wrapper
    .find(Button)
    .at(1)
    .simulate('click'); // confirm

  // 切换到另一行
  wrapper
    .find(StyledHeader)
    .at(1)
    .find(StyledFilterWrapper)
    .simulate('click');
  wrapper
    .find(StyledHeader)
    .at(1)
    .find(StyledFilterWrapper)
    .simulate('click');
});

test('empty table', () => {
  const tree = renderer.create(<Table columns={columns} dataSource={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
  const treeWithText = renderer
    .create(<Table columns={columns} dataSource={[]} emptyText="暂无数据" />)
    .toJSON();
  expect(treeWithText).toMatchSnapshot();
});

test('no footer table', () => {
  const wrapper = mount(
    <Table<TableData>
      dataSource={data}
      columns={columns.map(c => {
        delete c.footer;
        return c;
      })}
    />,
  );
  expect(wrapper.find('tfoot')).toHaveLength(0);
});

test('loading table', () => {
  const wrapper = mount(<Table<TableData> loading dataSource={data} columns={columns} />);
  const wrapper1 = mount(
    <Table<TableData> loading={{ spinning: true, desc: '' }} dataSource={data} columns={columns} />,
  );
  expect(wrapper.find(Spin)).toHaveLength(1);
  expect(wrapper1.find(Spin).prop('desc')).toBe('');
});

test('function row key', () => {
  const wrapper = mount(
    <Table<TableData> rowKey={d => d.name} dataSource={data} columns={columns} />,
  );
  expect(wrapper.find(Spin)).toHaveLength(1);
});

test('onDataSourceChange event', () => {
  const spy = sinon.spy();
  mount(<Table<TableData> onDataSourceChange={spy} dataSource={data} columns={columns} />);
  expect(spy.called).toBe(true);
});

test('ellipsis table', () => {
  const wrapper = mount(<Table<TableData> ellipsis dataSource={data} columns={columns} />);
  expect(wrapper.find('table')).toHaveStyleRule('table-layout', 'fixed');
});

test('ellipsis column', () => {
  const ellipsisColumns: ITableColumn<TableData>[] = [
    ...columns,
    {
      title: 'desc',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
  ];
  const nameColumn = ellipsisColumns.find(c => c.key === 'name');
  if (nameColumn) {
    nameColumn.ellipsis = true;
    nameColumn.ellipsisTooltip = false;
  }
  const wrapper = mount(<Table<TableData> dataSource={data} columns={ellipsisColumns} />);
  expect(wrapper.find(Typography.Paragraph)).toHaveLength(data.length * 2);
});

test('select table render', () => {
  const tree = renderer
    .create(
      <Table<TableData>
        rowSelection={{
          selectedRowKeys: [1],
        }}
        dataSource={data}
        columns={columns}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('select table', () => {
  const selectHandle = sinon.spy();
  const selectAllHandle = sinon.spy();
  const changeHandle = sinon.spy();

  const wrapper = mount(
    <Table<TableData>
      rowSelection={{
        getCheckboxProps(d) {
          return {
            disabled: d.name.includes('John'),
          };
        },
        onSelect: selectHandle,
        onSelectAll: selectAllHandle,
        onChange: changeHandle,
      }}
      dataSource={data}
      columns={columns}
    />,
  );
  const allCheckboxOnChange: any = wrapper
    .find(Checkbox)
    .at(0)
    .prop('onChange');

  const onChange: any = wrapper
    .find(Checkbox)
    .at(1)
    .prop('onChange');

  allCheckboxOnChange && allCheckboxOnChange({ target: { checked: true } });
  expect(selectAllHandle.calledOnce).toBe(true);

  allCheckboxOnChange && allCheckboxOnChange({ target: { checked: false } });
  expect(selectAllHandle.calledTwice).toBe(true);

  onChange && onChange({ target: { checked: true } });
  expect(selectHandle.calledOnce).toBe(true);

  onChange && onChange({ target: { checked: false } });
  expect(selectHandle.calledTwice).toBe(true);
});

test('scroll table', () => {
  const onScroll = sinon.spy();
  const fixedColumns = columns.map(c => {
    if (c.key === 'age') {
      return {
        ...c,
        fixed: 'left',
      };
    }
    if (c.key === 'name') {
      return {
        ...c,
        fixed: 'right',
      };
    }
    return { ...c };
  });
  const wrapper = mount(
    <Table<TableData>
      onScroll={onScroll}
      rowSelection={{}}
      dataSource={data}
      columns={fixedColumns as any}
    />,
  );
  const tableWrapper = wrapper.find(StyledTableWrapper);
  tableWrapper.simulate('scroll', {
    target: {
      scrollLeft: 10,
      clientWidth: 600,
      scrollWidth: 1000,
    },
  });

  expect(onScroll.calledOnce).toBe(true);

  tableWrapper.simulate('scroll', {
    target: {
      scrollLeft: 0,
      clientWidth: 600,
      scrollWidth: 1000,
    },
  });

  tableWrapper.simulate('scroll', {
    target: {
      scrollLeft: 400,
      clientWidth: 600,
      scrollWidth: 1000,
    },
  });
});

test('table onRow、onCell', () => {
  const wrapper = mount(
    <Table<TableData>
      onRow={(...args) => {
        return {
          className: 'onRow-test',
        };
      }}
      onCell={(...args) => {
        return {
          className: 'onCell-test',
        };
      }}
      onHeaderRow={(...args) => {
        return {
          className: 'onHeaderRow-test',
        };
      }}
      onHeaderCell={(...args) => {
        return {
          className: 'onHeaderCell-test',
        };
      }}
      ellipsis
      dataSource={data}
      columns={columns}
    />,
  );
  expect(wrapper.find('table thead tr').prop('className')).toMatch('onHeaderRow-test');
  expect(
    wrapper
      .find('table thead th')
      .at(0)
      .prop('className'),
  ).toMatch('onHeaderCell-test');
  expect(
    wrapper
      .find('table tbody tr')
      .at(0)
      .prop('className'),
  ).toMatch('onRow-test');
  expect(
    wrapper
      .find('table tbody tr td')
      .at(0)
      .prop('className'),
  ).toMatch('onCell-test');
});

test('table custom components', () => {
  const wrapper = mount(
    <Table<TableData>
      components={{
        BodyRow: ({ rowKey, rowProps, children }) => {
          return (
            <tr id="components-body-row" key={rowKey} {...rowProps}>
              {children}
            </tr>
          );
        },
        BodyCell: ({ columnKey, cellProps, children }) => {
          return (
            <td id="components-body-cell" key={columnKey} {...cellProps}>
              {children}
            </td>
          );
        },
        HeaderCell: ({ children, ...other }) => {
          return (
            <th id="components-header" {...other}>
              {children}
            </th>
          );
        },
      }}
      onRow={(...args) => {
        return {
          className: 'onRow-test',
          move: 1,
        };
      }}
      onCell={(...args) => {
        return {
          className: 'onCell-test',
        };
      }}
      ellipsis
      dataSource={data}
      columns={columns}
    />,
  );
  const tr = wrapper.find('table tbody tr').at(0);
  const cell = wrapper.find('table tbody tr td').at(0);
  expect(tr.prop('className')).toMatch('onRow-test');
  expect(tr.prop('id')).toMatch('components-body-row');
  expect(tr.prop('move')).toBe(1);

  expect(cell.prop('className')).toMatch('onCell-test');
  expect(cell.prop('id')).toMatch('components-body-cell');
});
