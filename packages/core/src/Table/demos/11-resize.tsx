import React, { useState } from 'react';
import { Table, ITableColumn } from '@muya-ui/core';
import { Resizable } from 'react-resizable';
import { createGlobalStyle } from 'styled-components';
// import 'react-resizable/css/styles.css';

const ResizeStyle = createGlobalStyle`
  .react-resizable {
    position: relative;
    background-clip: padding-box;
  }

  .react-resizable-handle {
    position: absolute;
    width: 10px;
    height: 100%;
    bottom: 0;
    right: -5px;
    cursor: col-resize;
    z-index: 1;
  }
`;
const ResizeableTitle = (props: any) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

interface D {
  key?: number;
  date: string;
  amount: number;
  type: string;
  note: string;
}

export default function Resize() {
  const [data] = useState<D[]>([
    {
      key: 0,
      date: '2018-02-11',
      amount: 120,
      type: 'income',
      note: 'transfer',
    },
    {
      key: 1,
      date: '2018-03-11',
      amount: 243,
      type: 'income',
      note: 'transfer',
    },
    {
      key: 2,
      date: '2018-04-11',
      amount: 98,
      type: 'income',
      note: 'transfer',
    },
  ]);

  const [columns, setColumns] = useState<ITableColumn<D>[]>([
    {
      key: 'date',
      title: 'Date',
      dataIndex: 'date',
      width: 200,
    },
    {
      key: 'amount',
      title: 'Amount',
      dataIndex: 'amount',
      width: 100,
    },
    {
      key: 'type',
      title: 'Type',
      dataIndex: 'type',
      width: 100,
    },
    {
      key: 'note',
      title: 'Note',
      dataIndex: 'note',
      width: 100,
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <a>Delete</a>,
    },
  ]);

  const handleResize = (index: number) => (e, { size }) => {
    setColumns(columns => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return nextColumns;
    });
  };

  return (
    <>
      <Table
        bordered
        onHeaderCell={(c, columnIndex) => ({
          width: c.width,
          onResize: handleResize(columnIndex),
        })}
        components={{ HeaderCell: ResizeableTitle }}
        columns={columns}
        dataSource={data}
      />
      <ResizeStyle />
    </>
  );
}

export const meta = {
  title: '可伸缩列',
  desc: '集成 [react-resizable](https://github.com/STRML/react-resizable) 来实现可伸缩列。',
};
