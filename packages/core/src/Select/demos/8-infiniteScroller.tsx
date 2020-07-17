import React, { useState, useCallback, useMemo } from 'react';

import { useDebounce, useThrottle, useEventCallback } from '@muya-ui/utils';
import { ISelectValueType, Option, Select } from '@muya-ui/core';

interface IData {
  value: string;
  label: string;
}

interface IDataSource<T> {
  data: T[];
  current: number;
  total: number;
}

interface IResultData {
  results: Array<{
    name: {
      title: string;
      first: string;
      last: string;
    };
  }>;
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

const threshold = 100;
const debounceTime = 200;
const throttleTime = 50;
const pageSize = 10;
const mockTotalPage = 10;

const defaultDataSource = {
  data: [],
  current: 0,
  total: 1,
};

function useInfiniteLoad<T>(
  fetch: (page: number, ...args: any) => Promise<IDataSource<T>>,
  defaultValue: IDataSource<T> = defaultDataSource,
) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<IDataSource<T>>({ ...defaultValue });
  const hasMore = dataSource.total > dataSource.current;
  const loadMore = useEventCallback(
    async (...args: any) => {
      if (loading) return;
      setLoading(true);
      try {
        const page = dataSource.current + 1;
        const res = await fetch(page, ...args);
        const data = res.data || [];
        setDataSource({
          ...res,
          data: page === 1 ? data : [...dataSource.data, ...data],
        });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    },
    [dataSource, fetch],
  );
  const loadMoreWithRefresh = useCallback(
    (...args) => {
      setDataSource({ ...defaultValue });
      loadMore(...args);
    },
    [defaultValue, loadMore],
  );
  return {
    loading,
    dataSource,
    hasMore,
    loadMore,
    loadMoreWithRefresh,
  };
}

const fetchData = async (page: number, inputValue: string) => {
  const response = await fetch(
    `https://randomuser.me/api/?page=${page}&results=${pageSize}&seed=${inputValue}&inc=name`,
  );
  const result: IResultData = await response.json();
  const data: IData[] = [];
  result.results.forEach(r => {
    const str = `${r.name.title} ${r.name.first} ${r.name.last}`;
    data.push({
      value: str,
      label: `label: ${str}`,
    });
  });
  return {
    data,
    current: page,
    total: mockTotalPage,
  };
};

const getOffset = (container: HTMLElement) => {
  return container.scrollHeight - container.scrollTop - container.clientHeight;
};

export default function InfiniteScrollerDemo() {
  const { dataSource, loading, hasMore, loadMore, loadMoreWithRefresh } = useInfiniteLoad<IData>(
    fetchData,
  );
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState<ISelectValueType>();

  const onPopupScroll = useThrottle(e => {
    if (getOffset(e.target) < threshold && hasMore) {
      loadMore(inputValue);
    }
  }, throttleTime);

  const [onSearch] = useDebounce((value: string) => {
    setInputValue(value);
    loadMoreWithRefresh(value);
  }, debounceTime);

  const onChange = useCallback((value: ISelectValueType) => {
    setValue(value);
  }, []);

  const options = useMemo(
    () =>
      dataSource.data.map(d => (
        <Option key={d.value} value={d.value}>
          {d.label}
        </Option>
      )),
    [dataSource],
  );

  return (
    <Select
      showSearch
      value={value}
      onSearch={onSearch}
      onChange={onChange}
      onPopupScroll={onPopupScroll}
      loading={loading}
      loadingAll={false}
      filterOption={false}
    >
      {options}
    </Select>
  );
}

export const meta = {
  title: '远程搜索滚动加载',
  desc: '远程搜索配合滚动加载的案例。',
};
