import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
import React, { useState, useCallback, useMemo } from 'react';

import { useDebounce } from '@muya-ui/utils';
import { ISelectValueType, Option, Row, Select, Switch, Typography } from '@muya-ui/core';

interface IData {
  value: string;
  label: string;
}

export default function RemoteSearchDemo() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IData[]>([]);
  const [value, setValue] = useState<ISelectValueType>();
  const [multiple, setMultiple] = useState(false);

  const [fetch] = useDebounce(async (inputValue: string) => {
    setLoading(true);
    try {
      const str = querystring.encode({
        code: 'utf-8',
        q: inputValue,
      });
      const response = await jsonp(`https://suggest.taobao.com/sug?${str}`);
      const { result } = await response.json();
      const data: IData[] = [];
      result.forEach((r: string[]) => {
        data.push({
          value: r[0],
          label: 'label:' + r[0],
        });
      });
      setData(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, 300);

  const onSearch = useCallback(
    (value: string) => {
      if (value) {
        fetch(value);
      } else {
        setData([]);
      }
    },
    [fetch],
  );

  const onChange = useCallback((value: ISelectValueType) => {
    setValue(value);
  }, []);

  const onModeChange = useCallback((checked: boolean) => {
    setMultiple(checked);
    setValue(undefined);
    setData([]);
    setLoading(false);
  }, []);

  const options = useMemo(
    () =>
      data.map(d => (
        <Option key={d.value} value={d.value}>
          {d.label}
        </Option>
      )),
    [data],
  );

  return (
    <>
      <Row>
        <Typography.Title level={5}>{multiple ? '多选：' : '单选：'}</Typography.Title>
        <Switch onChange={onModeChange} />
      </Row>
      <Row>
        <Select
          mode={multiple ? 'multiple' : 'default'}
          showSearch
          value={value}
          onSearch={onSearch}
          onChange={onChange}
          loading={loading}
        >
          {options}
        </Select>
      </Row>
    </>
  );
}

export const meta = {
  title: '远程搜索',
  desc: '搜索和远程数据结合。',
};
