import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import * as scrollIntoViewMod from '../utils/scrollIntoView';
import useTimePicker, { transformStr2Date } from './useTimePicker';

test('测试 useTimePicker 默认空状态', () => {
  const scrollIntoView = sinon.stub(scrollIntoViewMod, 'default');
  scrollIntoView.returns();
  const inputRef = React.createRef<HTMLInputElement>();
  const blurFn = sinon.spy();
  const onUIChange = sinon.spy();
  (inputRef as any).current = {
    blur: blurFn,
  };
  const { result } = renderHook(() =>
    useTimePicker(
      {
        onUIChange,
      },
      inputRef,
    ),
  );

  act(() => {
    result.current.handleFocus();
  });
  expect(result.current.finalPopupOpen).toBe(true);

  act(() => {
    result.current.handlePanelChange(dayjs('2020-02-11 11:11:11'));
  });
  expect(result.current.finalValue).toBe('11:11:11');

  act(() => {
    result.current.handlePressEnter();
  });

  expect(result.current.finalPopupOpen).toBe(false);
  expect(() => {
    sinon.assert.calledOnce(blurFn);
  }).not.toThrow();

  act(() => {
    result.current.handleClear();
  });
  expect(result.current.finalValue).toBe('');

  result.current.handleClickAway();

  scrollIntoView.restore();
});

test('测试 useTimePicker 模拟输入', async () => {
  const scrollIntoView = sinon.stub(scrollIntoViewMod, 'default');
  scrollIntoView.returns();
  const inputRef = React.createRef<HTMLInputElement>();
  const onChange = sinon.spy();
  const { result, waitForNextUpdate } = renderHook(() =>
    useTimePicker(
      {
        popupOpen: true,
        inputDelay: 10,
        onChange,
      },
      inputRef,
    ),
  );
  act(() => {
    const e = {
      target: {
        value: '11:11:11',
      },
    };
    result.current.handleInputChange(e as any);
  });
  await waitForNextUpdate();
  expect(result.current.stateDate.format('HH:mm:ss')).toBe('11:11:11');

  act(() => {
    const e = {
      target: {
        value: '',
      },
    };
    result.current.handleInputChange(e as any);
  });
  await waitForNextUpdate();
  expect(result.current.stateDate.isValid()).toBe(false);
  act(() => {
    const e = {
      target: {
        value: 'sadfasdfasd',
      },
    };
    result.current.handleInputChange(e as any);
  });
  await waitForNextUpdate();
  expect(result.current.stateDate.format('HH:mm:ss')).toBe('11:11:11');

  scrollIntoView.restore();
});

test('测试 useTimePicker 受控', async () => {
  const scrollIntoView = sinon.stub(scrollIntoViewMod, 'default');
  scrollIntoView.returns();
  const inputRef = React.createRef<HTMLInputElement>();
  const onChange = sinon.spy();
  const { result, rerender } = renderHook(
    ({ value }: { value: string }) =>
      useTimePicker(
        {
          value,
          onChange,
        },
        inputRef,
      ),
    {
      initialProps: {
        value: '2020-02-02 11:11:11',
      },
    },
  );
  rerender({ value: '2020-02-02 11:11:11' });
  rerender({ value: '2020-02-02 11:11:12' });

  expect(result.current.finalValue).toBe('11:11:12');

  scrollIntoView.restore();
});

test('transformStr2Date', () => {
  expect(transformStr2Date('', dayjs('')).isValid()).toBe(false);

  expect(transformStr2Date('sdfsdfsdf', dayjs('')).isValid()).toBe(false);

  expect(transformStr2Date('ss11111ss', dayjs('')).isValid()).toBe(false);

  expect(transformStr2Date('20:20:20', dayjs('')).format('HH:mm:ss')).toBe('20:20:20');

  expect(transformStr2Date('20:20:20', dayjs('2020-2-1')).format('YYYY-MM-DD HH:mm:ss')).toBe(
    '2020-02-01 20:20:20',
  );
});
