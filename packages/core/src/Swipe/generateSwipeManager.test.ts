import generateSwipeManager from './generateSwipeManager';

describe('测试 generateSwipeManager 正向反向翻页不一样的情况', () => {
  const defaultItems = [
    { width: 60, height: 10, top: 0, bottom: 10, right: 60, left: 0 },
    { width: 60, height: 10, top: 0, bottom: 10, right: 120, left: 60 },
    { width: 60, height: 10, top: 0, bottom: 10, right: 180, left: 120 },
    { width: 60, height: 10, top: 0, bottom: 10, right: 240, left: 180 },
  ];
  test('manager 初始化', () => {
    const manager = generateSwipeManager({
      items: defaultItems,
      containerSize: 100,
      direction: 'horizontal',
      stepIndex: -1,
      itemIndex: -1,
    });
    expect(manager.index).toBe(0);
    expect(manager.offset).toBe(0);
    expect(manager.getStepOffset(0)).toBe(0);
    expect(manager.direction).toBe('horizontal');
    expect(manager.hasPrev).toBe(false);
    expect(manager.hasNext).toBe(true);
    expect(manager.maxOffset).toBe(140);
    expect(manager.size).toBe(4);
  });
  test('nextItem()', () => {
    const manager = generateSwipeManager({
      items: defaultItems,
      containerSize: 100,
      direction: 'horizontal',
      stepIndex: -1,
      itemIndex: -1,
    });
    manager.nextItem();
    expect(manager.itemIndex).toBe(1);
    manager.goToItem(manager.itemSize - 1);
    expect(manager.hasNextItem).toBe(false);
    manager.nextItem();
  });
  test('next()', () => {
    const manager = generateSwipeManager({
      items: defaultItems,
      containerSize: 100,
      direction: 'horizontal',
      stepIndex: -1,
      itemIndex: -1,
    });
    manager.next();
    expect(manager.index).toBe(1);
    manager.goTo(manager.size - 1);
    expect(manager.hasNext).toBe(false);
    manager.next();
  });
  test('prevItem()', () => {
    const manager = generateSwipeManager({
      items: defaultItems,
      containerSize: 100,
      direction: 'horizontal',
      stepIndex: -1,
      itemIndex: 0,
    });
    manager.nextItem();
    manager.prevItem();
    expect(manager.itemIndex).toBe(0);
    expect(manager.hasPrevItem).toBe(false);
    expect(manager.getItemOffset(0)).toBe(0);
    manager.prevItem();
  });
  test('prev()', () => {
    const manager = generateSwipeManager({
      items: defaultItems,
      containerSize: 100,
      direction: 'horizontal',
      stepIndex: -1,
      itemIndex: -1,
    });
    manager.next();
    manager.prev();
    expect(manager.index).toBe(0);
    expect(manager.hasPrev).toBe(false);
    manager.prev();
  });
  test('manager goTo()', () => {
    const manager = generateSwipeManager({
      items: defaultItems,
      containerSize: 100,
      direction: 'horizontal',
      stepIndex: -1,
      itemIndex: -1,
    });
    manager.goTo(3);
    expect(manager.index).toBe(3);
    manager.goTo(10);
  });

  test('测试由鼠标滚轮引起的滚动 < 0 || > maxOffset', () => {
    const manager = generateSwipeManager({
      items: defaultItems,
      containerSize: 100,
      direction: 'horizontal',
      stepIndex: -1,
      itemIndex: -1,
    });
    manager.updateOffset(-1);
    expect(manager.index).toBe(0);
    manager.updateOffset(160);
    expect(manager.index).toBe(0);

    const managerItem = generateSwipeManager({
      items: defaultItems,
      containerSize: 100,
      direction: 'horizontal',
      stepIndex: -1,
      itemIndex: -1,
    });
    managerItem.updateOffset(-1);
    expect(managerItem.itemIndex).toBe(0);
    managerItem.updateOffset(160);
    expect(managerItem.itemIndex).toBe(0);
  });

  test('测试设置默认值', () => {
    const manager1 = generateSwipeManager({
      items: defaultItems,
      containerSize: 100,
      direction: 'horizontal',
      stepIndex: -1,
      itemIndex: -1,
      defaultIndex: 1,
    });
    expect(manager1.index).toBe(1);
    const manager2 = generateSwipeManager({
      items: defaultItems,
      containerSize: 100,
      direction: 'horizontal',
      stepIndex: 0,
      itemIndex: -1,
      defaultIndex: 2,
    });
    expect(manager2.index).toBe(0);
  });

  test('测试由鼠标滚轮引起的滚动 >= 0 && <= maxOffset', () => {
    const manager = generateSwipeManager({
      items: defaultItems,
      containerSize: 100,
      direction: 'horizontal',
      stepIndex: -1,
      itemIndex: -1,
    });
    // 当更新两个 index 之间的时候
    manager.updateOffset(130);
    manager.next();
    expect(manager.index).toBe(3);

    manager.updateOffset(130);
    manager.prev();
    expect(manager.index).toBe(2);

    // 当刚好是某一个index的时候
    manager.goTo(0);
    manager.updateOffset(60);
    expect(manager.index).toBe(1);

    const managerItem = generateSwipeManager({
      items: defaultItems,
      containerSize: 100,
      direction: 'horizontal',
      stepIndex: -1,
      itemIndex: 0,
    });

    // 当更新两个 index 之间的时候
    managerItem.updateOffset(110);
    expect(managerItem.itemIndex).toBe(2);
    managerItem.nextItem();
    expect(managerItem.itemIndex).toBe(2);

    managerItem.updateOffset(110);
    managerItem.prevItem();
    expect(managerItem.itemIndex).toBe(1);

    // 当刚好是某一个index的时候
    managerItem.goToItem(0);
    managerItem.updateOffset(60);
    expect(managerItem.itemIndex).toBe(1);
  });
});

test('测试 generateSwipeManager 正向反向翻页一样的情况', () => {
  const items = [
    { width: 60, height: 10, right: 0, left: 10, bottom: 60, top: 0 },
    { width: 60, height: 10, right: 0, left: 10, bottom: 120, top: 60 },
    { width: 60, height: 10, right: 0, left: 10, bottom: 180, top: 120 },
    { width: 60, height: 10, right: 0, left: 10, bottom: 240, top: 180 },
  ];
  const manager = generateSwipeManager({
    items,
    containerSize: 60,
    direction: 'vertical',
    stepIndex: 0,
    itemIndex: -1,
    defaultIndex: -1,
  });

  expect(manager.size).toBe(4);
});
