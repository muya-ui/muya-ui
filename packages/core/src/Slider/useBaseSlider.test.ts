import sinon from 'sinon';

import { wait } from '@muya-ui/utils';
import { act, renderHook } from '@testing-library/react-hooks';

import useBaseSlider from './useBaseSlider';

test('测试 useBaseSlider', async () => {
  const { result } = renderHook(() =>
    useBaseSlider({
      defaultValue: [10, 20],
    }),
  );

  expect(result.current.start).toBe(10);
  expect(result.current.end).toBe(20);
  expect(result.current.numRange).toBe(100);

  // 直接执行状态不变，不会报错
  result.current.handleEnterStart();
  result.current.handleEnterEnd();
});

test('测试 useBaseSlider tooltipVisible', async () => {
  const { result } = renderHook(() =>
    useBaseSlider({
      tooltipVisible: true,
    }),
  );
  act(() => {
    result.current.handleEnterStart();
  });
  expect(result.current.startTooltipOpen).toBe(true);
  act(() => {
    result.current.self.current.movingType = 'start';
    result.current.handleLeaveStart();
  });
  expect(result.current.startTooltipOpen).toBe(true);
  act(() => {
    result.current.self.current.movingType = 'none';
    result.current.handleLeaveStart();
  });
  expect(result.current.startTooltipOpen).toBe(false);

  act(() => {
    result.current.handleEnterEnd();
  });
  expect(result.current.endTooltipOpen).toBe(true);
  act(() => {
    result.current.self.current.movingType = 'end';
    result.current.handleLeaveEnd();
  });
  expect(result.current.endTooltipOpen).toBe(true);
  act(() => {
    result.current.self.current.movingType = 'none';
    result.current.handleLeaveEnd();
  });
  expect(result.current.endTooltipOpen).toBe(false);
});

test('测试 useBaseSlider updateValueByOffset', async () => {
  const onChange = sinon.spy();
  const onAfterChange = sinon.spy();
  const { result } = renderHook(() =>
    useBaseSlider({
      tooltipVisible: true,
      onChange,
      onAfterChange,
      marks: {
        20: '20%',
      },
    }),
  );
  // 应该不报act的错
  result.current.updateValueByOffset(-10);

  act(() => {
    result.current.updateValueByOffset(102);
  });
  expect(result.current.end).toBe(100);
  act(() => {
    result.current.updateValueByOffset(1);
  });
  expect(result.current.start).toBe(1);
  act(() => {
    result.current.updateValueByOffset(8, 'start');
  });
  expect(result.current.start).toBe(8);
  act(() => {
    result.current.updateValueByOffset(9, 'end', true);
  });
  act(() => {
    result.current.updateValueByOffset(9, 'end', true);
  });
  expect(result.current.end).toBe(9);

  expect(() => {
    sinon.assert.callCount(onChange, 4);
    sinon.assert.calledTwice(onAfterChange);
  }).not.toThrow();
});

test('测试 useBaseSlider marks 处理', () => {
  const { result } = renderHook(() =>
    useBaseSlider({
      tooltipVisible: true,
      marks: {
        20: '20%',
      },
    }),
  );
  act(() => {
    result.current.markPropsMap[20]!.onClick!({} as any);
  });
  expect(result.current.end).toBe(20);
});

test('测试 useBaseSlider 滑块拖动', async () => {
  const bodyEl = document.createElement('div');
  const { result } = renderHook(() =>
    useBaseSlider(
      {
        tooltipVisible: true,
        marks: {
          20: '20%',
        },
        mousemoveThrottleDelay: 10,
      },
      bodyEl,
    ),
  );

  result.current.self.current.trackSize = 100;
  act(() => {
    result.current.handleStartMoveStartCircle({
      clientX: 100,
      clientY: 100,
    });
  });
  expect(result.current.movingType).toBe('start');
  await wait.time(20);

  act(() => {
    bodyEl.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: 110,
        clientY: 100,
      }),
    );
  });
  expect(result.current.start).toBe(10);

  act(() => {
    bodyEl.dispatchEvent(
      new MouseEvent('mouseup', {
        clientX: 110,
        clientY: 100,
      }),
    );
  });
  expect(result.current.movingType).toBe('none');
});

test('测试 useBaseSlider 滑块拖动 垂直', async () => {
  const bodyEl = document.createElement('div');
  const { result } = renderHook(() =>
    useBaseSlider(
      {
        tooltipVisible: true,
        marks: {
          20: '20%',
        },
        mousemoveThrottleDelay: 10,
        vertical: true,
      },
      bodyEl,
    ),
  );
  act(() => {
    result.current.handleStartMoveEndCircle({
      clientX: 100,
      clientY: 100,
    });
  });
  result.current.self.current.trackSize = 100;
  act(() => {
    result.current.handleStartMoveEndCircle({
      clientX: 100,
      clientY: 100,
    });
  });
  expect(result.current.movingType).toBe('end');
  await wait.time(20);

  act(() => {
    bodyEl.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: 110,
        clientY: 110,
      }),
    );
  });
  expect(result.current.end).toBe(10);

  act(() => {
    bodyEl.dispatchEvent(
      new MouseEvent('mouseup', {
        clientX: 110,
        clientY: 110,
      }),
    );
  });
  expect(result.current.movingType).toBe('none');
});

test('测试 useBaseSlider 点击轨道', async () => {
  const { result: result1 } = renderHook(() => useBaseSlider({}));
  (result1.current.trackRef as any).current = {
    getBoundingClientRect() {
      return {
        left: 10,
        top: 10,
        width: 100,
        height: 100,
      };
    },
  };
  result1.current.updateTrackSize();
  expect(result1.current.self.current.trackSize).toBe(100);
  act(() => {
    result1.current.handleTrackClick({
      clientX: 100,
      clientY: 100,
    });
  });
  expect(result1.current.end).toBe(90);

  const { result: result2 } = renderHook(() =>
    useBaseSlider({
      vertical: true,
    }),
  );
  (result2.current.trackRef as any).current = {
    getBoundingClientRect() {
      return {
        left: 10,
        top: 10,
        width: 100,
        height: 100,
      };
    },
  };
  result2.current.updateTrackSize();
  expect(result2.current.self.current.trackSize).toBe(100);
  act(() => {
    result2.current.handleTrackClick({
      clientX: 100,
      clientY: 100,
    });
  });
  expect(result2.current.end).toBe(90);

  const { result: result3 } = renderHook(() =>
    useBaseSlider({
      vertical: true,
    }),
  );
  result3.current.updateTrackSize();
  act(() => {
    result3.current.handleTrackClick({
      clientX: 100,
      clientY: 100,
    });
  });
  expect(result3.current.end).toBe(0);
});

test('测试 useBaseSlider 受控', async () => {
  const { result, rerender } = renderHook(() =>
    useBaseSlider({
      value: [0, 10],
    }),
  );

  act(() => {
    result.current.updateValueByOffset(100);
  });
  expect(result.current.end).toBe(10);
  result.current.self.current.startLTEnd = false;
  rerender();
  expect(result.current.start).toBe(10);
});

test('测试 useBaseSlider step', async () => {
  const bodyEl = document.createElement('div');
  const { result } = renderHook(() =>
    useBaseSlider(
      {
        step: 10,
        min: 10,
        max: 50,
        mousemoveThrottleDelay: 10,
      },
      bodyEl,
    ),
  );
  expect(result.current.end).toBe(10);
  result.current.self.current.trackSize = 100;
  act(() => {
    result.current.handleStartMoveEndCircle({
      clientX: 100,
      clientY: 100,
    });
  });
  expect(result.current.self.current.moveBaseOffset).toBe(10);
  expect(result.current.movingType).toBe('end');
  await wait.time(20);

  act(() => {
    bodyEl.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: 150,
        clientY: 150,
      }),
    );
  });
  expect(result.current.end).toBe(30);
});
